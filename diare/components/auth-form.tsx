"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = { mode: "login" | "register" };

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const registering = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    const formData = new FormData(event.currentTarget);
    if (
      registering &&
      formData.get("password") !== formData.get("confirmPassword")
    ) {
      setMessage("Passwords do not match.");
      setBusy(false);
      return;
    }

    const payload: Record<string, unknown> = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (registering) {
      payload.fullName = formData.get("fullName");
      payload.school = formData.get("school");
      payload.subjects = String(formData.get("subjects") ?? "")
        .split(",")
        .map((subject) => subject.trim())
        .filter(Boolean);
    }

    try {
      const response = await fetch(
        registering ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result: unknown = await response.json();
      if (!response.ok) {
        setMessage(readMessage(result, "The request could not be completed."));
        return;
      }

      if (registering) {
        router.push("/login?registered=1");
        router.refresh();
        return;
      }

      const sessionResponse = await fetch("/api/backend/auth/me", {
        cache: "no-store",
      });
      if (!sessionResponse.ok) {
        setMessage(
          "Your credentials were accepted, but the API could not confirm your account role.",
        );
        return;
      }
      const session: unknown = await sessionResponse.json();
      const role = findRole(session);
      router.push(role === "admin" ? "/admin" : "/teacher");
      router.refresh();
    } catch {
      setMessage("Could not reach TeacherHub. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {registering ? (
        <>
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              minLength={2}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="school" className="mb-2 block text-sm font-medium text-slate-700">
              School
            </label>
            <input id="school" name="school" autoComplete="organization" className={inputClass} />
          </div>
          <div>
            <label htmlFor="subjects" className="mb-2 block text-sm font-medium text-slate-700">
              Subjects
            </label>
            <input
              id="subjects"
              name="subjects"
              placeholder="Mathematics, Science"
              className={inputClass}
            />
          </div>
        </>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={registering ? "new-password" : "current-password"}
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      {registering ? (
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            Remember me
          </label>
          <Link href="/" className="font-medium text-blue-700 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>
      )}

      {message ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      ) : null}

      {registering ? (
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            name="ownershipDeclaration"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          I agree to the terms and conditions.
        </label>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="block w-full rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {busy
          ? "Please wait…"
          : registering
            ? "Create account"
            : "Sign in"}
      </button>
      <p className="text-center text-sm text-slate-600">
        {registering ? "Already have an account? " : "New here? "}
        <Link
          href={registering ? "/login" : "/register"}
          className="font-semibold text-blue-700"
        >
          {registering ? "Sign in" : "Create account"}
        </Link>
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white";

function readMessage(value: unknown, fallback: string): string {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }
  return fallback;
}

function findRole(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  if (!("role" in value)) {
    return "data" in value ? findRole(value.data) : undefined;
  }
  const record = value;
  if (typeof record.role === "string") return record.role.toLowerCase();
  return undefined;
}
