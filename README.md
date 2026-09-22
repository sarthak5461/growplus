# GrowPlus+

Next.js (JavaScript) website with a free Python CMS: **Wagtail** on Django. Content from the original static site at [sarthak5461/growplus](https://github.com/sarthak5461/growplus) is rebuilt as routes and can be edited in Wagtail.

## Stack

- **Frontend:** Next.js App Router, JavaScript, original black / white / red design
- **CMS:** Wagtail (open source, no paid plan). Edit copy, services, blog, FAQs, and capture leads
- **API:** Django REST Framework at `http://127.0.0.1:8000/api/`
- The site still renders from bundled fallback content if the CMS is not running

## Run locally

### 1. CMS (Python)

```bash
cd cms
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed_content
python manage.py createsuperuser
python manage.py runserver
# Local default if you used the seeded setup: username `admin` / password `admin123` (change this)
```

Wagtail admin: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### 2. Website (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`frontend/.env.local` points at `NEXT_PUBLIC_CMS_URL=http://127.0.0.1:8000`.

## What editors can change

In Wagtail snippets / settings:

- Phone, email, location, tagline
- Services, blog posts, updates, FAQs, team, case studies, testimonials
- Incoming leads and newsletter subscribers (Inbox)

Contact and landing forms POST to `/api/leads/`. Newsletter forms POST to `/api/newsletter/`.
