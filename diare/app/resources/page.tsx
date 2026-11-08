import Link from "next/link";
import { ResourceCard } from "../../components/resource-card";
import { getCategories, getResources } from "../../lib/api";

type SearchParams = Record<string, string | string[] | undefined>;

const filterNames = [
  "search",
  "subject",
  "level",
  "category",
  "academicTerm",
  "academicYear",
  "format",
  "language",
  "sort",
  "page",
  "limit",
] as const;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const search = await searchParams;
  const query = new URLSearchParams();
  for (const name of filterNames) {
    const value = firstValue(search[name]);
    if (value) query.set(name, value);
  }
  if (!query.has("limit")) query.set("limit", "12");

  const [{ resources, total }, categories] = await Promise.all([
    getResources(query),
    getCategories(),
  ]);
  const currentPage = Number(query.get("page") ?? "1");
  const pageSize = Number(query.get("limit") ?? "12");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[32px] border border-slate-200 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Resource library
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
              Browse teaching resources
            </h1>
          </div>
          <Link
            href="/teacher/upload"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Upload a resource
          </Link>
        </div>

        <form action="/resources" className="mt-6 grid gap-3 md:grid-cols-4">
          <input
            name="search"
            aria-label="Search resources"
            defaultValue={firstValue(search.search)}
            placeholder="Search title, subject, topic..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300 md:col-span-2"
          />
          <select
            name="category"
            defaultValue={firstValue(search.category) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="subject"
            defaultValue={firstValue(search.subject) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">All subjects</option>
            {[
              "Mathematics",
              "English",
              "Science",
              "ICT",
              "Social Studies",
              "Religious Studies",
            ].map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            name="level"
            defaultValue={firstValue(search.level) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">All levels</option>
            {["Primary", "JHS", "Senior High", "Basic School"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <select
            name="academicTerm"
            defaultValue={firstValue(search.academicTerm) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">Any term</option>
            {["Term 1", "Term 2", "Term 3"].map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
          <select
            name="format"
            defaultValue={firstValue(search.format) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">Any file format</option>
            {["PDF", "DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX"].map(
              (format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ),
            )}
          </select>
          <select
            name="sort"
            defaultValue={firstValue(search.sort) ?? ""}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
          >
            <option value="">Newest</option>
            <option value="downloads">Most downloaded</option>
            <option value="rating">Highest rated</option>
          </select>
          <div className="flex gap-3 md:col-span-4">
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Apply filters
            </button>
            <Link
              href="/resources"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              Clear
            </Link>
          </div>
        </form>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {resources.length} of {total} resource(s)
        </p>
      </div>

      {resources.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">No matching resources</h2>
          <p className="mt-2 text-slate-600">
            Try broadening your search or clearing one of the filters.
          </p>
        </div>
      )}

      {total > pageSize ? (
        <nav
          aria-label="Resource pages"
          className="mt-8 flex items-center justify-center gap-3"
        >
          {currentPage > 1 ? (
            <Link
              href={`/resources?${new URLSearchParams({
                ...Object.fromEntries(query.entries()),
                page: String(currentPage - 1),
              })}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Previous
            </Link>
          ) : null}
          <span className="text-sm text-slate-600">
            Page {currentPage} of {Math.max(1, Math.ceil(total / pageSize))}
          </span>
          {currentPage * pageSize < total ? (
            <Link
              href={`/resources?${new URLSearchParams({
                ...Object.fromEntries(query.entries()),
                page: String(currentPage + 1),
              })}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}
