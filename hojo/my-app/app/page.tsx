import Link from "next/link";

const stats = [
  { label: "Open tickets", value: "24", accent: "primary" },
  { label: "Resolved this week", value: "18", accent: "success" },
  { label: "Avg. response time", value: "1.8h", accent: "warning" },
];

const updates = [
  {
    title: "New member of the web dev team",
    description:
      "We welcomed a senior frontend engineer to the squad to help accelerate our dashboard refresh and accessibility work.",
  },
  {
    title: "New website live!",
    description:
      "Our updated product site is live and includes faster content loads, streamlined ticket flows, and a cleaner support experience.",
  },
  {
    title: "Design QA pass complete",
    description:
      "The latest dashboard revisions have passed QA for mobile, tablet, and desktop breakpoints before rollout.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Support dashboard</p>
          <h1>Keep your team moving with clear, fast ticket visibility.</h1>
          <p className="lede">
            Review issues, manage new requests, and track delivery without losing
            context across the product and support teams.
          </p>
          <div className="action-row">
            <Link href="/tickets" className="btn-primary">
              View tickets
            </Link>
            <Link href="/tickets/create" className="btn-secondary">
              Create ticket
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-card">
            <span>Team health</span>
            <strong>92%</strong>
            <small>Customer satisfaction score</small>
          </div>
          <div className="mini-card muted">
            <span>Next action</span>
            <strong>Review 3 escalations</strong>
            <small>Due before 4:00 PM</small>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Dashboard stats">
        {stats.map((stat) => (
          <article key={stat.label} className={`metric-card ${stat.accent}`}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="updates-block">
        <div className="section-heading">
          <h2>Company updates</h2>
          <Link href="/tickets" className="text-link">
            View all tickets
          </Link>
        </div>

        <div className="updates-grid">
          {updates.map((update) => (
            <article key={update.title} className="card update-card">
              <h3>{update.title}</h3>
              <p>{update.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
