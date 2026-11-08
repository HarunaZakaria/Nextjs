import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiBaseUrl, getErrorMessage, readResponseBody } from "../../../../lib/api";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("teacherhub_session")?.value;
  let error: { status: number; message: string } | undefined;

  if (token) {
    try {
      const upstream = await fetch(`${getApiBaseUrl()}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!upstream.ok) {
        const payload = await readResponseBody(upstream);
        error = {
          status: upstream.status,
          message: getErrorMessage(payload, upstream.statusText),
        };
      }
    } catch {
      error = {
        status: 503,
        message: "Could not reach the API to end the server session.",
      };
    }
  }

  const response = error
    ? NextResponse.json({ message: error.message }, { status: error.status })
    : NextResponse.json({ success: true });
  response.cookies.delete("teacherhub_session");
  return response;
}
