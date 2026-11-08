"use client";

import { useState } from "react";

export function BookmarkButton({ resourceId }: { resourceId: string }) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function toggleBookmark() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/backend/bookmarks/${encodeURIComponent(resourceId)}`,
        { method: saved ? "DELETE" : "POST" },
      );
      if (!response.ok) {
        const body: unknown = await response.json();
        setMessage(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : `Could not ${saved ? "remove" : "save"} this resource.`,
        );
        return;
      }
      setSaved(!saved);
    } catch {
      setMessage("Could not reach TeacherHub. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={busy}
        onClick={toggleBookmark}
        aria-pressed={saved}
        className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:opacity-60"
      >
        {busy ? "…" : saved ? "Saved" : "Save"}
      </button>
      {message ? (
        <p role="status" className="mt-2 text-xs text-red-700">{message}</p>
      ) : null}
    </div>
  );
}
