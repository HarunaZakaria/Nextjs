import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white">
              T
            </div>
            <div>
              <p className="text-lg font-bold text-white">TeacherHub</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Education network
              </p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-slate-300">
            A centralized learning and resource-sharing space that helps teachers find, curate, and share high-quality educational materials.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Platform
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/resources" className="hover:text-white">Resource library</Link></li>
            <li><Link href="/teacher" className="hover:text-white">Teacher dashboard</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin dashboard</Link></li>
            <li><Link href="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>Lesson plans</li>
            <li>Worksheets</li>
            <li>Exam questions</li>
            <li>Teaching guides</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>hello@teacherhub.edu</li>
            <li>+233 (0) 20 000 0000</li>
            <li>Accra, Ghana</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        © 2026 TeacherHub. Built for educators.
      </div>
    </footer>
  );
}
