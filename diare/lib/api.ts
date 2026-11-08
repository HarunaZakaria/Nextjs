import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ApiUser = {
  id: string;
  fullName: string;
  email: string;
  role: "teacher" | "admin";
  school?: string;
  subjects?: string[];
};

export type ApiResource = {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  subject: string;
  topic: string;
  level: string;
  term: string;
  year: string;
  language: string;
  format: string;
  size: string;
  downloads: number;
  rating: number;
  reviews: number;
  featured: boolean;
  uploadedBy: string;
  uploadedAt: string;
  thumbnail?: string;
  previewUrl?: string;
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  resourceCount?: number;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
  total?: number;
  page?: number;
  pages?: number;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getApiBaseUrl() {
  return (process.env.TEACHERHUB_API_URL ?? "http://localhost:5000/api/v1").replace(
    /\/+$/,
    "",
  );
}

export async function serverApi<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("teacherhub_session")?.value;
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "The TeacherHub API could not be reached. Check the backend URL and try again.",
      503,
    );
  }

  const body = await readResponseBody(response);
  if (!response.ok) {
    throw new ApiError(getErrorMessage(body, response.statusText), response.status);
  }

  return body as T;
}

export async function requireUser(
  allowedRoles: ApiUser["role"][] = ["teacher", "admin"],
): Promise<ApiUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get("teacherhub_session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const response = await serverApi<ApiEnvelope<unknown> | unknown>("/auth/me");
    const rawUser = unwrapData(response);
    const user = normalizeUser(rawUser);

    if (!allowedRoles.includes(user.role)) {
      redirect(user.role === "admin" ? "/admin" : "/teacher");
    }

    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/login");
    }
    throw error;
  }
}

export async function getResources(
  params: URLSearchParams = new URLSearchParams(),
): Promise<{ resources: ApiResource[]; total: number }> {
  const query = params.toString();
  return getResourceList(`/resources${query ? `?${query}` : ""}`);
}

export async function getResourceList(
  path: string,
): Promise<{ resources: ApiResource[]; total: number }> {
  const response = await serverApi<unknown>(path);
  const payload = unwrapData(response);
  const list = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.data)
      ? payload.data
      : null;

  if (!list) {
    throw new ApiError("The resources response had an unexpected format.", 502);
  }

  return {
    resources: list.map(normalizeResource),
    total:
      (isRecord(response) && typeof response.total === "number"
        ? response.total
        : isRecord(payload) && typeof payload.total === "number"
          ? payload.total
          : list.length),
  };
}

export async function getResource(id: string): Promise<ApiResource> {
  const response = await serverApi<unknown>(
    `/resources/${encodeURIComponent(id)}`,
  );
  return normalizeResource(unwrapData(response));
}

export async function getCategories(): Promise<ApiCategory[]> {
  const response = await serverApi<unknown>("/categories");
  const payload = unwrapData(response);
  const list = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.data)
      ? payload.data
      : null;

  if (!list) {
    throw new ApiError("The categories response had an unexpected format.", 502);
  }

  return list.map(normalizeCategory);
}

export async function getApiList(path: string): Promise<unknown[]> {
  const response = await serverApi<unknown>(path);
  const payload = unwrapData(response);
  const list = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.data)
      ? payload.data
      : null;

  if (!list) {
    throw new ApiError(`The API response for ${path} had an unexpected format.`, 502);
  }

  return list;
}

export async function getCurrentUser(): Promise<ApiUser> {
  const response = await serverApi<ApiEnvelope<unknown> | unknown>("/auth/me");
  return normalizeUser(unwrapData(response));
}

export function unwrapData(value: unknown): unknown {
  if (isRecord(value) && "data" in value) {
    return value.data;
  }
  return value;
}

export function normalizeUser(value: unknown): ApiUser {
  if (!isRecord(value)) {
    throw new ApiError("The API returned an invalid user profile.", 502);
  }
  const id = readString(value._id) ?? readString(value.id);
  const fullName = readString(value.fullName) ?? readString(value.name);
  const email = readString(value.email);
  const role = readString(value.role)?.toLowerCase();

  if (!id || !fullName || !email || (role !== "teacher" && role !== "admin")) {
    throw new ApiError("The API returned an incomplete user profile.", 502);
  }

  return {
    id,
    fullName,
    email,
    role,
    school: readString(value.school),
    subjects: Array.isArray(value.subjects)
      ? value.subjects.filter((subject): subject is string => typeof subject === "string")
      : [],
  };
}

export function normalizeResource(value: unknown): ApiResource {
  if (!isRecord(value)) {
    throw new ApiError("The API returned an invalid resource.", 502);
  }

  const file = isRecord(value.file) ? value.file : {};
  const category = isRecord(value.category) ? value.category : null;
  const contributor = isRecord(value.uploadedBy) ? value.uploadedBy : null;
  const id = readString(value._id) ?? readString(value.id);

  if (!id) {
    throw new ApiError("A resource from the API is missing its identifier.", 502);
  }

  return {
    id,
    title: readString(value.title) ?? "Untitled resource",
    description: readString(value.description) ?? "",
    category: category
      ? readString(category.name) ?? "Resource"
      : readString(value.category) ?? "Resource",
    categoryId: category
      ? readString(category._id) ?? readString(category.id) ?? ""
      : readString(value.category) ?? "",
    subject: readString(value.subject) ?? "",
    topic: readString(value.topic) ?? "",
    level: readString(value.educationalLevel) ?? readString(value.level) ?? "",
    term: readString(value.academicTerm) ?? "",
    year: readString(value.academicYear) ?? "",
    language: readString(value.language) ?? "",
    format: readString(file.format) ?? readString(value.format) ?? "",
    size: formatFileSize(file.size ?? value.size),
    downloads:
      readNumber(value.downloadCount) ?? readNumber(value.downloads) ?? 0,
    rating:
      readNumber(value.averageRating) ?? readNumber(value.rating) ?? 0,
    reviews: readNumber(value.totalRatings) ?? readNumber(value.reviews) ?? 0,
    featured: value.isFeatured === true || value.featured === true,
    uploadedBy: contributor
      ? readString(contributor.fullName) ?? readString(contributor.name) ?? ""
      : readString(value.uploadedBy) ?? "",
    uploadedAt: readString(value.createdAt) ?? "",
    thumbnail: readString(value.thumbnail),
    previewUrl: readString(value.previewUrl),
  };
}

export function normalizeCategory(value: unknown): ApiCategory {
  if (!isRecord(value)) {
    throw new ApiError("The API returned an invalid category.", 502);
  }
  const id = readString(value._id) ?? readString(value.id);
  const name = readString(value.name);

  if (!id || !name) {
    throw new ApiError("A category from the API is missing required fields.", 502);
  }

  return {
    id,
    name,
    slug: readString(value.slug) ?? id,
    resourceCount: readNumber(value.resourceCount) ?? readNumber(value.count),
  };
}

export async function readResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      throw new ApiError("The API returned invalid JSON.", 502);
    }
  }
  return response.text();
}

export function getErrorMessage(body: unknown, fallback: string): string {
  if (isRecord(body)) {
    if (typeof body.message === "string") return body.message;
    if (isRecord(body.error) && typeof body.error.message === "string") {
      return body.error.message;
    }
  }
  return typeof body === "string" && body ? body : fallback;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function formatFileSize(value: unknown): string {
  const size = readNumber(value);
  if (size === undefined) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
