import Link from "next/link";
import { LogoutButton } from "../../components/logout-button";
import {
  getApiList,
  isRecord,
  normalizeResource,
  requireUser,
  type ApiResource,
} from "../../lib/api";

type Activity = { title: string; date: string; status: string };

export default async function TeacherDashboardPage() {
  const user = await requireUser(["teacher"]);
  const [uploadsResponse, downloads, bookmarks] = await Promise.all([
    getApiList("/users/uploads"),
    getApiList("/users/downloads"),
    getApiList("/users/bookmarks"),
  ]);
  const uploads = uploadsResponse.map((item) => ({
    resource: normalizeResource(item),
    status:
      isRecord(item) && typeof item.status === "string"
        ? item.status
        : "submitted",
  }));
  const recentUploads: Activity[] = uploads
    .slice(0, 5)
    .map(({ resource, status }) => ({
      title: resource.title,
      date: resource.uploadedAt
        ? new Date(resource.uploadedAt).toLocaleDateString()
        : "",
      status,
    }));
  const pendingCount = uploads.filter((item) => item.status === "pending").length;
  const recentDownloads: ApiResource[] = downloads
    .map((item) => {
      if (!isRecord(item) || !("resource" in item)) {
        throw new Error(
          "The downloads API returned a history record without its resource.",
        );
      }
      return normalizeResource(item.resource);
    })
    .slice(0, 5);

  const stats = [
    { label: "Uploads", value: uploads.length },
    { label: "Downloads", value: downloads.length },
    { label: "Saved resources", value: bookmarks.length },
    { label: "Pending approvals", value: pendingCount },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Teacher dashboard
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Welcome back, {user.fullName}
          </h1>
          {user.school ? <p className="mt-2 text-slate-600">{user.school}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/upload"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Upload a resource
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-4 text-3xl font-black text-slate-900">
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">My uploads</h2>
            <Link href="/teacher/upload" className="text-sm font-medium text-blue-700">
              Add resource
            </Link>
          </div>
          {recentUploads.length ? (
            <div className="mt-6 space-y-4">
              {recentUploads.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    {item.date ? (
                      <p className="text-sm text-slate-500">{item.date}</p>
                    ) : null}
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-600">
              You haven’t uploaded any resources yet.
            </p>
          )}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Download history</h2>
            <Link href="/resources" className="text-sm font-medium text-blue-700">
              Browse resources
            </Link>
          </div>
          {recentDownloads.length ? (
            <div className="mt-6 space-y-4">
              {recentDownloads.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.id}`}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200"
                >
                  <p className="font-semibold text-slate-900">{resource.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {[resource.subject, resource.category, resource.format]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-600">
              Your downloaded resources will appear here.
            </p>
          )}
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Your account
          </p>
          <h2 className="mt-2 text-2xl font-bold">{user.email}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {user.subjects?.length
              ? `Subjects: ${user.subjects.join(", ")}`
              : "Add your teaching subjects to personalize your experience."}
          </p>
        </section>
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Quick links
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/resources" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              Browse resources
            </Link>
            <Link href="/teacher/upload" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700">
              Upload resource
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
