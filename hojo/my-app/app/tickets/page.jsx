import React, { Suspense } from "react";
import TicketsList from "./TicketList";
import Loading from "../Loading";

function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets</small>
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketsList />
      </Suspense>
    </main>
  );
}

export default Tickets;
