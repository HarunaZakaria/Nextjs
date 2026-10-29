import Link from "next/link";
import { getTickets } from "../lib/tickets";

export default async function TicketsList() {
  const tickets = await getTickets();

  if (!tickets.length) {
    return <p className="empty-state">There are no open tickets.</p>;
  }

  return (
    <section className="ticket-list" aria-label="Ticket list">
      {tickets.map((ticket) => (
        <article key={ticket.id} className="card ticket-card">
          <Link href={`/tickets/${ticket.id}`} className="ticket-link">
            <div className="ticket-header">
              <div>
                <p className="ticket-id">Ticket #{ticket.id}</p>
                <h3>{ticket.title}</h3>
              </div>
              <span className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </span>
            </div>
            <p>{ticket.body.slice(0, 150)}...</p>
            <small>Submitted by {ticket.user_email}</small>
          </Link>
        </article>
      ))}
    </section>
  );
}
