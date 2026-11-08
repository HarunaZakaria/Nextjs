"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminApprovalActions({ resourceId }: { resourceId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function updateResource(action: "approve" | "reject") {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/backend/admin/resources/${encodeURIComponent(resourceId)}/${action}`,
        { method: "PATCH" },
      );
      if (!response.ok) {
        const body: unknown = await response.json();
        setMessage(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : `Could not ${action} this resource.`,
        );
        return;
      }
      router.refresh();
    } catch {
      setMessage("Could not reach TeacherHub. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => updateResource("approve")}
          className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => updateResource("reject")}
          className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-red-200 hover:text-red-700 disabled:opacity-60"
        >
          Reject
        </button>
      </div>
      {message ? (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {message}
        </p>
      ) : null}
    </div>
  );
}
