"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { ApiCategory } from "../lib/api";

export function UploadResourceForm({
  categories,
}: {
  categories: ApiCategory[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/backend/resources", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        const body: unknown = contentType.includes("application/json")
          ? await response.json()
          : null;
        setMessage(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : `Upload failed (${response.status}).`,
        );
        return;
      }

      router.push("/teacher?uploaded=1");
      router.refresh();
    } catch {
      setMessage("Could not reach TeacherHub. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      encType="multipart/form-data"
      className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="title" className={labelClass}>Resource title</label>
          <input id="title" name="title" required maxLength={160} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            maxLength={3000}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" name="category" required className={inputClass}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>Subject</label>
          <input id="subject" name="subject" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="topic" className={labelClass}>Topic</label>
          <input id="topic" name="topic" className={inputClass} />
        </div>
        <div>
          <label htmlFor="educationalLevel" className={labelClass}>Educational level</label>
          <input id="educationalLevel" name="educationalLevel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="academicTerm" className={labelClass}>Academic term</label>
          <select id="academicTerm" name="academicTerm" className={inputClass}>
            <option value="">Not term-specific</option>
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="academicYear" className={labelClass}>Academic year</label>
          <input id="academicYear" name="academicYear" placeholder="2025/2026" className={inputClass} />
        </div>
        <div>
          <label htmlFor="language" className={labelClass}>Language</label>
          <input id="language" name="language" defaultValue="English" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="file" className={labelClass}>Resource file</label>
          <input
            id="file"
            name="file"
            type="file"
            required
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.mp4"
            className="block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="thumbnail" className={labelClass}>Thumbnail (optional)</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600"
          />
        </div>
        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              name="copyrightDeclaration"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            I confirm I own the rights to this resource or have permission to share it.
          </label>
        </div>
      </div>

      {message ? (
        <p role="alert" className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      ) : null}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={busy || categories.length === 0}
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Submit for approval"}
        </button>
      </div>
    </form>
  );
}

const labelClass = "mb-2 block text-sm font-medium text-slate-700";
const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white";
