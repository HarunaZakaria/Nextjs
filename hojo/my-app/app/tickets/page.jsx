import Link from "next/link";
import React, { Suspense } from "react";
import TicketsList from "./TicketList";
import Loading from "../Loading";

function Tickets() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h2>Open tickets</h2>
        </div>
        <Link href="/tickets/create" className="btn-primary">
          Create ticket
        </Link>
      </header>

      <Suspense fallback={<Loading />}>
        <TicketsList />
      </Suspense>
    </main>
  );
}

export default Tickets;
