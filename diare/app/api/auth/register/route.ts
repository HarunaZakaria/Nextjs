import { NextResponse } from "next/server";
import {
  getApiBaseUrl,
  getErrorMessage,
  isRecord,
  readResponseBody,
} from "../../../../lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "Invalid registration request." },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${getApiBaseUrl()}/auth/register`, {
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

  return NextResponse.json(
    {
      success: true,
      message:
        isRecord(payload) && typeof payload.message === "string"
          ? payload.message
          : "Account created successfully.",
    },
    { status: upstream.status },
  );
}
