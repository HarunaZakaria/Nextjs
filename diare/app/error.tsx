"use client";

import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
        TeacherHub connection
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-900">
        We couldn’t load this page
      </h1>
      <p className="mt-3 max-w-xl text-slate-600">
        {error.message ||
          "The request failed. Check that the backend API is available, then try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  );
}
