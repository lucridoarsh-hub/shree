# Sree Sivani Jewellers website

Next.js + MongoDB storefront with an admin panel at `/admin`. Customers enquire on WhatsApp (no cart).

## Setup

1. Copy `.env.example` to `.env.local` and fill it in (`MONGODB_URL`, `MONGODB_DB`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `SITE_URL`).
2. `npm install`
3. `npm run seed` – fills an empty database with starter categories, products, stores, pages, FAQs and gold rates (`-- --reset` wipes and refills them).
4. `npm run dev` (development) or `npm run build && npm start` (production).

## Admin panel (`/admin`)

Products, categories, offers, stores, info pages, FAQs, gold rates, site settings (logo, WhatsApp number, header bar, home banner, About page, footer), customer messages and newsletter subscribers. Changes are live immediately.

## Images

Uploads are saved to `public/uploads` (or `UPLOAD_DIR` if set) and served from `/uploads/<file>`. On the VPS set `UPLOAD_DIR` to a folder outside the release directory so deployments never delete images, and back it up.

## VPS notes

- Run with `npm run build && npm start` under pm2/systemd, behind nginx with HTTPS.
- nginx: set `client_max_body_size 64m;` (video/image uploads) and forward `X-Forwarded-Proto` / `X-Forwarded-For`.
- nginx must overwrite the client IP header (`proxy_set_header X-Forwarded-For $remote_addr;`) so the login rate limit cannot be bypassed by spoofing.
- In MongoDB Atlas, allow the VPS IP under Network Access.
- Change `ADMIN_PASSWORD` and `SESSION_SECRET` to your own long values.
