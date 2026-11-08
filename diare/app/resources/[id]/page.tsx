import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceActions } from "../../../components/resource-actions";
import { ApiError, getApiList, getResource } from "../../../lib/api";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
};

function normalizeReview(value: unknown): Review | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  const user =
    typeof record.user === "object" && record.user !== null
      ? (record.user as Record<string, unknown>)
      : undefined;
  const id =
    (typeof record._id === "string" && record._id) ||
    (typeof record.id === "string" && record.id) ||
    "";
  const name =
    (user && typeof user.fullName === "string" && user.fullName) ||
    (typeof record.fullName === "string" && record.fullName) ||
    (typeof record.name === "string" && record.name) ||
    "Teacher";
  const rating =
    typeof record.rating === "number" && Number.isFinite(record.rating)
      ? Math.min(5, Math.max(1, record.rating))
      : 0;
  const comment = typeof record.comment === "string" ? record.comment : "";

  return id && rating ? { id, name, rating, comment } : null;
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let resource;
  try {
    resource = await getResource(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const reviews = (await getApiList(
    `/reviews/${encodeURIComponent(id)}`,
  )).flatMap((item) => {
    const review = normalizeReview(item);
    return review ? [review] : [];
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/resources" className="hover:text-blue-700">
          Resources
        </Link>
        <span>/</span>
        <span className="text-slate-700">Resource detail</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <section className="space-y-8">
          <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                {resource.category}
              </span>
              {resource.featured ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Featured
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
              {resource.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              {resource.description}
            </p>
            <div className="mt-8">
              <ResourceActions
                resourceId={resource.id}
                resourceTitle={resource.title}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">Preview</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {resource.format || "Document"}
              </span>
            </div>
            <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-10 text-center">
              {resource.previewUrl ? (
                <iframe
                  src={resource.previewUrl}
                  title={`${resource.title} preview`}
                  className="h-[480px] w-full rounded-xl bg-white"
                />
              ) : (
                <div className="max-w-md rounded-3xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-black text-blue-700">
                    {resource.format || "FILE"}
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {resource.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    A preview is not available for this resource.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
              <span className="text-sm text-slate-500">
                {resource.rating ? `${resource.rating.toFixed(1)} / 5` : "Not rated"}
              </span>
            </div>
            {reviews.length ? (
              <div className="mt-6 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <span
                        aria-label={`${review.rating} out of 5 stars`}
                        className="text-amber-500"
                      >
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-600">
                No reviews have been submitted for this resource.
              </p>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Resource details</h2>
            <dl className="mt-6 space-y-4 text-sm text-slate-600">
              {[
                ["Category", resource.category],
                ["Subject", resource.subject],
                ["Topic", resource.topic],
                ["Level", resource.level],
                ["Academic term", resource.term],
                ["Academic year", resource.year],
                ["Format", resource.format],
                ["File size", resource.size],
                ["Language", resource.language],
                ["Downloads", resource.downloads.toLocaleString()],
                ["Rating", resource.rating ? `${resource.rating} / 5` : "Not rated"],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt>{label}</dt>
                    <dd className="text-right font-semibold text-slate-900">
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Contributor
            </p>
            <h3 className="mt-2 text-xl font-bold">
              {resource.uploadedBy || "TeacherHub contributor"}
            </h3>
            {resource.uploadedAt ? (
              <p className="mt-2 text-sm text-slate-300">
                Uploaded {new Date(resource.uploadedAt).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  );
}
