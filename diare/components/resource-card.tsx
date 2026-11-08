import Link from "next/link";
import { BookmarkButton } from "./bookmark-button";

export type ResourceCardData = {
  id: string;
  title: string;
  category: string;
  subject: string;
  level: string;
  format: string;
  downloads: number;
  rating: number;
  reviews: number;
  featured?: boolean;
};

export function ResourceCard({ resource }: { resource: ResourceCardData }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 bg-gradient-to-br from-blue-50 via-indigo-100 to-cyan-100 p-5">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
            {resource.format || resource.category}
          </span>
          {resource.featured ? (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
              Featured
            </span>
          ) : null}
        </div>
        <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/20">
          {resource.subject.slice(0, 2).toUpperCase()}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{resource.category}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{resource.title}</h3>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          {resource.subject ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1">{resource.subject}</span>
          ) : null}
          {resource.level ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1">{resource.level}</span>
          ) : null}
          {resource.format ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1">{resource.format}</span>
          ) : null}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-slate-900">
              {resource.rating ? resource.rating.toFixed(1) : "New"}
            </span>
            {resource.reviews > 0 ? <span>({resource.reviews})</span> : null}
          </div>
          <span>{resource.downloads.toLocaleString()} downloads</span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <BookmarkButton resourceId={resource.id} />
          <Link
            href={`/resources/${resource.id}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
