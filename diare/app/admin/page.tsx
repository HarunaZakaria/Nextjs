import { AdminApprovalActions } from "../../components/admin-approval-actions";
import { LogoutButton } from "../../components/logout-button";
import {
  getApiList,
  normalizeResource,
  requireUser,
  serverApi,
  unwrapData,
} from "../../lib/api";

type PendingResource = {
  id: string;
  title: string;
  submittedBy: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readMetric(
  stats: Record<string, unknown>,
  keys: string[],
): number | undefined {
  for (const key of keys) {
    const value = stats[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return undefined;
}

export default async function AdminDashboardPage() {
  const user = await requireUser(["admin"]);
  const [dashboardResponse, pendingResponse] = await Promise.all([
    serverApi<unknown>("/admin/dashboard"),
    getApiList("/admin/resources/pending"),
  ]);
  const dashboard = unwrapData(dashboardResponse);
  const metrics = isRecord(dashboard) ? dashboard : {};
  const pending: PendingResource[] = pendingResponse.map((item) => {
    const resource = normalizeResource(item);
    const contributor =
      isRecord(item) && isRecord(item.uploadedBy) ? item.uploadedBy : undefined;
    return {
      id: resource.id,
      title: resource.title,
      submittedBy:
        (contributor && typeof contributor.fullName === "string"
          ? contributor.fullName
          : "") || resource.uploadedBy || "Teacher",
    };
  });
  const stats = [
    { label: "Teachers", keys: ["totalTeachers", "totalUsers", "users"] },
    { label: "Resources", keys: ["totalResources", "resources"] },
    { label: "Pending resources", keys: ["pendingResources", "pending"] },
    { label: "Downloads", keys: ["totalDownloads", "downloads"] },
    { label: "Categories", keys: ["totalCategories", "categories"] },
    { label: "Reports", keys: ["totalReports", "reports"] },
  ]
    .map((item) => ({
      label: item.label,
      value: readMetric(metrics, item.keys),
    }))
    .filter((item) => item.value !== undefined);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Admin dashboard
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Platform overview
          </h1>
          <p className="mt-2 text-slate-600">Signed in as {user.fullName}</p>
        </div>
        <LogoutButton />
      </div>

      {stats.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-4 text-3xl font-black text-slate-900">
                {stat.value?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          The dashboard API returned no recognized statistics.
        </p>
      )}

      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Pending approvals
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review teacher-submitted resources before publication.
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {pending.length} pending
          </span>
        </div>

        {pending.length ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {pending.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Submitted by {item.submittedBy}
                </p>
                <AdminApprovalActions resourceId={item.id} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-600">
            There are no resources awaiting review.
          </p>
        )}
      </section>
    </main>
  );
}
