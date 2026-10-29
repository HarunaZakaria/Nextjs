# Dojo Desk

A modern Next.js support dashboard for managing internal tickets, product updates, and issue tracking.

## Features

- Dashboard overview with key support metrics
- Open ticket listing with priority badges
- Ticket detail page for each issue
- Ticket creation form for new support requests
- Local JSON API powered by `json-server`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the mock ticket API:

```bash
npm run server
```

3. Start the Next.js app:

```bash
npm run dev
```

Open http://localhost:3000 to view the frontend.

## Scripts

```bash
npm run dev
npm run server
npm run build
```

The mock API uses the data file in `_data/db.json` and runs on port 4000.
