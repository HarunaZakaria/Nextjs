"use client";

import { useState } from "react";

type Props = { resourceId: string; resourceTitle: string };

export function ResourceActions({ resourceId, resourceTitle }: Props) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function downloadResource() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/backend/resources/${encodeURIComponent(resourceId)}/download`,
      );
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok) {
        setMessage(await readError(response, contentType));
        return;
      }

      if (contentType.includes("application/json")) {
        const payload: unknown = await response.json();
        const downloadUrl = findDownloadUrl(payload);
        if (!downloadUrl) {
          setMessage("The API did not return a download link.");
          return;
        }
        window.location.assign(downloadUrl);
      } else {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = resourceTitle;
        anchor.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      setMessage("Could not reach the API. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function saveResource() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/backend/bookmarks/${encodeURIComponent(resourceId)}`,
        { method: "POST" },
      );
      if (!response.ok) {
        setMessage(await readError(response, response.headers.get("content-type") ?? ""));
        return;
      }
      setMessage("Saved to your library.");
    } catch {
      setMessage("Could not reach the API. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={downloadResource}
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? "Working…" : "Download resource"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={saveResource}
          className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:opacity-60"
        >
          Save to library
        </button>
      </div>
      {message ? (
        <p role="status" className="mt-3 text-sm text-slate-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}

async function readError(response: Response, contentType: string) {
  if (contentType.includes("application/json")) {
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      return body.message;
    }
  }
  return `Request failed (${response.status}).`;
}

function findDownloadUrl(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const record = value as Record<string, unknown>;
  if (typeof record.downloadUrl === "string") return record.downloadUrl;
  if (typeof record.url === "string") return record.url;
  if (typeof record.data === "object" && record.data !== null) {
    return findDownloadUrl(record.data);
  }
  return undefined;
}
