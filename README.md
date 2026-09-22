# GrowPlus+

Next.js website with a **Node.js** backend and a custom admin dashboard for editing frontend content.

## Stack

- **Frontend:** Next.js App Router (JavaScript), original black / white / red design
- **Backend:** Express + SQLite (`node:sqlite`)
- **Admin:** `/admin` — login and edit services, blog, FAQs, site settings, and inbox

The public site still falls back to bundled content if the API is not running.

## Run locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

API: [http://127.0.0.1:4000](http://127.0.0.1:4000)

### 2. Website + admin

```bash
cd frontend
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)
- Login: `admin` / `admin123` (change after first run)

`frontend/.env.local` should be `NEXT_PUBLIC_CMS_URL=http://127.0.0.1:4000`.

## What you can edit

- Site settings (phone, email, location, tagline)
- Services, blog, updates, FAQs, team, case studies, testimonials, tools, partners, awards
- Contact leads and newsletter subscribers
