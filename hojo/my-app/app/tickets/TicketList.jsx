import Link from "next/link";
import { resolve } from "path";
async function GetTickets() {
  //initiate a delay
  await new Promise((resolve) => setInterval(resolve, 3000));
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      validate: 0,
    },
  });
  return res.json();
}

export default async function TicketsList() {
  const tickets = await GetTickets();
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}....</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} Priority
            </div>
          </Link>
        </div>
      ))}
      {tickets === 0 && (
        <p className="text-center">There are no open tickets</p>
      )}
    </>
  );
}
