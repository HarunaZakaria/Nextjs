import CreateForm from "./CreateForm";

export default function CreateTickets() {
  return (
    <main className="page-shell create-shell">
      <header className="page-header centered-header">
        <div>
          <p className="eyebrow">New ticket</p>
          <h2>Create a support request</h2>
        </div>
      </header>
      <CreateForm />
    </main>
  );
}
