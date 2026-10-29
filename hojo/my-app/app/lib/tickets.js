export const fallbackTickets = [
  {
    id: "1",
    title: "Fix the footer links please",
    body: "Lorem ipsum Triforce sit amet, Linkus Hyruleus tempus Ganondorf. Nunc ocarina sagittis quis Majoras Mask. Nulla in metus arcu. Suspendisse potenti. In vel mauris varius, consectetur Zora ipsum eget, Master Sword porttitor urna. Fusce elementum urna elit, eget eleifend velit consectetur eget. Integer vel lobortis ipsum, vitae auctor Ocarina of Time. Donec sed urna dapibus, interdum magna a, eleifend magna. Curabitur tincidunt enim a neque volutpat. Phasellus auctor magna vel nunc pretium, ut volutpat justo tristique. Pellentesque cursus convallis mauris, in tempus enim tincidunt vitae.",
    priority: "low",
    user_email: "mario@netninja.dev",
  },
  {
    id: "2",
    title: "Add in a new stylesheet",
    body: "Lorem ipsum Triforce sit amet, Linkus Hyruleus tempus Ganondorf. Nunc ocarina sagittis quis Majoras Mask. Nulla in metus arcu. Suspendisse potenti. In vel mauris varius, consectetur Zora ipsum eget, Master Sword porttitor urna. Fusce elementum urna elit, eget eleifend velit consectetur eget. Integer vel lobortis ipsum, vitae auctor Ocarina of Time. Donec sed urna dapibus, interdum magna a, eleifend magna. Curabitur tincidunt enim a neque volutpat. Phasellus auctor magna vel nunc pretium, ut volutpat justo tristique. Pellentesque cursus convallis mauris, in tempus enim tincidunt vitae.",
    priority: "medium",
    user_email: "mario@netninja.dev",
  },
  {
    id: "3",
    title: "Fix the footer links",
    body: "Lorem ipsum Triforce sit amet, Linkus Hyruleus tempus Ganondorf. Nunc ocarina sagittis quis Majoras Mask. Nulla in metus arcu. Suspendisse potenti. In vel mauris varius, consectetur Zora ipsum eget, Master Sword porttitor urna. Fusce elementum urna elit, eget eleifend velit consectetur eget. Integer vel lobortis ipsum, vitae auctor Ocarina of Time. Donec sed urna dapibus, interdum magna a, eleifend magna. Curabitur tincidunt enim a neque volutpat. Phasellus auctor magna vel nunc pretium, ut volutpat justo tristique. Pellentesque cursus convallis mauris, in tempus enim tincidunt vitae.",
    priority: "high",
    user_email: "peach@netninja.dev",
  },
  {
    id: "4",
    title: "Create onboarding checklist",
    body: "We need a clear onboarding checklist for new team members so that setup, access, and training steps are documented before they start shipping work.",
    priority: "medium",
    user_email: "harunzy@tech.dev",
  },
];

export async function getTickets() {
  try {
    const response = await fetch("http://localhost:4000/tickets", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Tickets API unavailable");
    }

    return await response.json();
  } catch (error) {
    return fallbackTickets;
  }
}

export async function getTicketById(id) {
  if (!id) {
    return null;
  }

  try {
    const response = await fetch(`http://localhost:4000/tickets/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Ticket not found");
    }

    return await response.json();
  } catch (error) {
    return fallbackTickets.find((ticket) => String(ticket.id) === String(id)) || null;
  }
}

export async function getTicketIds() {
  const tickets = await getTickets();
  return tickets.map((ticket) => ({ id: String(ticket.id) }));
}
