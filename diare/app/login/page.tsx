import { AuthForm } from "../../components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-130px)] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">
            Sign in to your teacher account
          </h1>
          <p className="mt-4 max-w-sm text-base text-blue-50">
            Access your saved content, download history, and classroom resources.
          </p>
        </div>

        <div className="p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Login
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              TeacherHub access
            </h2>
          </div>
          {registered === "1" ? (
            <p className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Your account was created. Sign in to continue.
            </p>
          ) : null}
          <AuthForm mode="login" />
        </div>
      </div>
    </main>
  );
}
