import Link from "next/link";
import { ResourceCard } from "../components/resource-card";
import { getCategories, getResourceList } from "../lib/api";

export default async function HomePage() {
  const [categories, featured, recent] = await Promise.all([
    getCategories(),
    getResourceList("/resources/featured?limit=3"),
    getResourceList("/resources/recent?limit=3"),
  ]);

  return (
    <div className="pb-10">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-blue-200/60 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                Teacher resource hub
              </p>
              <h1 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Discover trusted teaching resources for every classroom.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-blue-50">
                Search, download, and share lesson notes, worksheets, exam
                papers, and teacher guides from one collaborative platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Explore library
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Join as a teacher
                </Link>
              </div>
            </div>

            <form
              action="/resources"
              className="rounded-[28px] bg-white/10 p-5 backdrop-blur-sm"
            >
              <div className="rounded-[24px] bg-white p-5 text-slate-900 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Find a resource
                </p>
                <div className="mt-5 space-y-3">
                  <input
                    name="search"
                    aria-label="Search resources"
                    placeholder="Search lesson notes, worksheets..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300"
                  />
                  <button className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                    Search resources
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Browse the library
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Resource categories
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            View library
          </Link>
        </div>
        {categories.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/resources?category=${encodeURIComponent(category.slug)}`}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {category.name}
                </span>
                {category.resourceCount !== undefined ? (
                  <p className="mt-5 text-sm text-slate-500">
                    {category.resourceCount} resources
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            No active resource categories are available yet.
          </p>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Featured resources
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Recommended by educators
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Browse all
          </Link>
        </div>
        {featured.resources.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            There are no featured resources at the moment.
          </p>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Recently uploaded
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Fresh classroom materials
                </h2>
              </div>
              <Link
                href="/teacher/upload"
                className="text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Share yours
              </Link>
            </div>
            {recent.resources.length ? (
              <div className="mt-6 space-y-4">
                {recent.resources.map((resource) => (
                  <Link
                    key={resource.id}
                    href={`/resources/${resource.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {resource.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {[resource.uploadedBy, resource.subject, resource.category]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    {resource.format ? (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-700">
                        {resource.format}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-slate-600">
                No recently uploaded resources are available.
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Share what works
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Help another teacher teach with confidence.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Contribute your classroom-tested resources. Submissions are
              reviewed before they become available in the public library.
            </p>
            <Link
              href="/teacher/upload"
              className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              Upload a resource
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
