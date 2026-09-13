import Link from "next/link";

export default function Navbar() {
  return (
    <main>
      <nav>
        <h1>Next-app</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">Tickets</Link>
      </nav>
    </main>
  );
}
