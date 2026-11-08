import { AuthForm } from "../../components/auth-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-130px)] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 lg:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Join TeacherHub
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
            Create your educator profile
          </h1>
        </div>
        <div className="mx-auto max-w-2xl">
          <AuthForm mode="register" />
        </div>
      </div>
    </main>
  );
}
