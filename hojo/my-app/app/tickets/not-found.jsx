import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem</h2>
      <p>We couldn't find the ticket you were looking for!</p>
      <p>
        Go back to all<Link href="/tickets">Tickets</Link>
      </p>
    </main>
  );
}
