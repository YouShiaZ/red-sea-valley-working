# Red Sea Valley (RSV)

A modern, minimal real estate web app for Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay. Built with React + Vite + Tailwind on the frontend and Express + Firebase on the backend.

## Features
- Premium UI with turquoise/white palette, smooth Framer Motion animations, and Swiper hero/gallery sliders.
- Browse by type/area, rich filters (type, rent/sale, location, price, bedrooms, sorting) and animated property cards.
- Single property view with gallery + thumbnails, map preview (React Leaflet), favourites (localStorage), and interested modal.
- Contact + About pages, 404 page, SEO meta component.
- Admin dashboard (JWT): login, property CRUD (status available/sold/rented), lead viewer, settings, image upload (Firebase Storage).
- Lead pipeline saves to Firestore, optional WhatsApp/email webhooks, and FCM notification stub.
- Seed data included for quick demos; frontend falls back to seeds if API is offline.

## Tech Stack
- Frontend: React, Vite, React Router v6, TailwindCSS (+forms), Framer Motion, Swiper.js, React Hook Form, Lucide/HeroIcons, Axios, React Leaflet.
- Backend: Node.js, Express, Helmet, CORS, rate limiting, JWT, Bcrypt, Multer (Firebase Storage), Joi validation, Firebase Admin SDK, dotenv.

## Project Structure
```
src/            # Frontend (components, pages, context, hooks, api, assets)
backend/        # Express API
```

## Frontend Setup
```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # production build
```
Environment (root `.env`):
```
VITE_API_URL=http://localhost:5000/api
```

## Backend Setup
```bash
cd backend
npm install
npm run dev    # nodemon on http://localhost:5000
```
Backend env (copy `.env.example` to `.env`):
```
PORT=5000
CORS_WHITELIST=http://localhost:5173
JWT_SECRET=supersecretjwt
ADMIN_EMAIL=owner@redseavalley.com
ADMIN_PASSWORD=change-me
FIREBASE_SERVICE_ACCOUNT=BASE64_JSON       # base64 of service-account.json
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
WHATSAPP_WEBHOOK=https://your-webhook      # optional outbound lead hook
EMAIL_WEBHOOK=https://your-email-webhook   # optional outbound lead hook
```
Service account tip:
```bash
cat service-account.json | base64 -w 0  # mac/linux
Get-Content service-account.json -Raw | [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($_)) # powershell
```

## API Routes (summary)
- `POST /api/auth/login` – returns JWT for admin (seeded from env on first run).
- `GET /api/properties` / `GET /api/properties/:id` – public listings (falls back to seeds if Firebase missing).
- `POST /api/properties` (auth) – create; supports `images` multipart for Firebase Storage.
- `PUT /api/properties/:id` (auth) – update.
- `DELETE /api/properties/:id` (auth) – delete.
- `POST /api/leads` – public interested form; saves to Firestore + optional webhooks + FCM.
- `GET /api/leads` (auth) – list leads.
- `GET /api/settings` / `PUT /api/settings` (auth) – social/email/WhatsApp settings.

## Firebase Notes
- Firestore collections used: `properties`, `leads`, `settings/global`, `admins/owner`.
- Storage path: `properties/*` for uploaded images.
- Add security rules to restrict writes to authenticated admin and read-only public listings.

## Seeding & Demo
- Frontend ships with `src/data/properties.js` for demo cards.
- Backend serves `backend/config/seedData.js` when Firestore is not configured so API stays functional during setup.

## Build/Deploy
- Frontend: `npm run build` outputs to `dist/` (Vite). Serve via static host; set `VITE_API_URL` to backend.
- Backend: `npm start` for production. Set env vars and ensure service account is mounted.

## Quick Start
1) `cp .env.example .env` and fill values (and `backend/.env`).
2) `npm install && npm run dev` (frontend).
3) `cd backend && npm install && npm run dev` (backend).
4) Open http://localhost:5173 and login to /admin with env credentials.
