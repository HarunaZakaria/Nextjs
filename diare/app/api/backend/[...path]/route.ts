import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiBaseUrl } from "../../../../lib/api";

type RouteContext = { params: Promise<{ path: string[] }> };

async function forward(request: Request, context: RouteContext) {
  const { path } = await context.params;
  if (path[0] === "auth" && ["login", "register"].includes(path[1] ?? "")) {
    return NextResponse.json(
      { message: "Use the secure authentication endpoint." },
      { status: 404 },
    );
  }

  const upstreamUrl = new URL(
    `${getApiBaseUrl()}/${path.map(encodeURIComponent).join("/")}`,
  );
  const incomingUrl = new URL(request.url);
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers();
  for (const name of ["accept", "content-type", "content-disposition"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("teacherhub_session")?.value;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const method = request.method;
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "The TeacherHub API could not be reached. Check the backend URL and try again." },
      { status: 503 },
    );
  }

  const responseHeaders = new Headers();
  for (const name of [
    "content-type",
    "content-disposition",
    "cache-control",
    "content-length",
  ]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;

export function OPTIONS() {
  return new Response(null, { status: 204 });
}

export function HEAD() {
  return new Response(null, { status: 405 });
}
