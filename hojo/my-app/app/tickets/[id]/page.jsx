export default async function TicketDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      validate: 60,
    },
  });
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
