"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function logout() {
    setMessage("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        const body: unknown = await response.json();
        setMessage(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : "Could not end the API session.",
        );
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setMessage("Could not reach TeacherHub to end the API session.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={logout}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
      >
        Log out
      </button>
      {message ? (
        <p role="status" className="mt-2 text-sm text-red-700">
          {message}
        </p>
      ) : null}
    </div>
  );
}
