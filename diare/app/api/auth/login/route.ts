import { NextResponse } from "next/server";
import {
  getApiBaseUrl,
  getErrorMessage,
  readResponseBody,
  isRecord,
} from "../../../../lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return NextResponse.json({ message: "Invalid login request." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "The TeacherHub API could not be reached. Check the backend URL and try again." },
      { status: 503 },
    );
  }

  const payload = await readResponseBody(upstream);
  if (!upstream.ok) {
    return NextResponse.json(
      { message: getErrorMessage(payload, upstream.statusText) },
      { status: upstream.status },
    );
  }

  const token = findToken(payload);
  if (!token) {
    return NextResponse.json(
      { message: "The login response did not include an access token." },
      { status: 502 },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful.",
  });
  response.cookies.set("teacherhub_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}

function findToken(payload: unknown): string | undefined {
  if (!isRecord(payload)) return undefined;
  const data = isRecord(payload.data) ? payload.data : payload;
  const token =
    (typeof data.accessToken === "string" && data.accessToken) ||
    (typeof data.token === "string" && data.token);
  return token || undefined;
}
