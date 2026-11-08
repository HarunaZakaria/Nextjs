import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "./logout-button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Library" },
  { href: "/teacher", label: "Teacher Dashboard" },
  { href: "/admin", label: "Admin" },
];

export async function SiteHeader() {
  const cookieStore = await cookies();
  const hasSession = Boolean(cookieStore.get("teacherhub_session")?.value);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white shadow-lg shadow-blue-600/20">
            T
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-slate-900">TeacherHub</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
              Resource sharing
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/resources"
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 sm:inline-flex"
          >
            Browse resources
          </Link>
          {hasSession ? (
            <>
              <Link
                href="/teacher"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <div className="hidden sm:block">
                <LogoutButton />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
