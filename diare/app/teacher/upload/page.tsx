import { UploadResourceForm } from "../../../components/upload-resource-form";
import { getCategories, requireUser } from "../../../lib/api";

export default async function UploadResourcePage() {
  await requireUser(["teacher"]);
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          Teacher uploads
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
          Upload a new teaching resource
        </h1>
      </div>
      {categories.length ? (
        <UploadResourceForm categories={categories} />
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          Resource upload is unavailable until an administrator creates a
          category.
        </p>
      )}
    </main>
  );
}
