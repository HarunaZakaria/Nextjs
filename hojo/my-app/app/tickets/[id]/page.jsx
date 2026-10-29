import Link from "next/link";
import { notFound } from "next/navigation";
import { getTicketById, getTicketIds } from "../../lib/tickets";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getTicketIds();
}

export default async function TicketDetails({ params }) {
  const { id } = await params;
  const ticket = await getTicketById(id);

  if (!ticket) {
    notFound();
  }

  return (
    <main className="page-shell details-shell">
      <header className="page-header details-header">
        <div>
          <p className="eyebrow">Ticket details</p>
          <h2>{ticket.title}</h2>
        </div>
        <Link href="/tickets" className="btn-secondary">
          Back to tickets
        </Link>
      </header>

      <article className="card detail-card">
        <div className="detail-meta">
          <span className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </span>
          <small>Created by {ticket.user_email}</small>
        </div>

        <p className="detail-body">{ticket.body}</p>
      </article>
    </main>
  );
}
