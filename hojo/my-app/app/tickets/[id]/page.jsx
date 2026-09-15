import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  // initiate a delay
  await new Promise((resolve) => setInterval(resolve, 3000));
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();
  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}
export default async function TicketDetails({ params }) {
  const { id } = await params;
  //initiate a delay
  await new Promise((resolve) => setInterval(resolve, 3000));
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      validate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }
  const ticket = await res.json();

  return (
    <>
      <main>
        <nav>
          <h2>Tickets Details</h2>
        </nav>
        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} Priority
          </div>
        </div>
      </main>
    </>
  );
}
