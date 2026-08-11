# Gorilla Snot Cleaners — Party Supplies Storefront

A Next.js (App Router) ecommerce site for Gorilla Snot Cleaners: party hats,
plates, napkins, and bundles, organized by occasion, with cart, login-gated
checkout, and Stripe payment.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your Stripe test keys
   (get them free from https://dashboard.stripe.com/test/apikeys):
   ```bash
   cp .env.example .env.local
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## What's included

- **Homepage** — hero, shop-by-occasion tiles, featured products
- **Shop pages** — full catalog (`/shop`) and occasion-filtered views
  (`/shop/birthday`, `/shop/baby-shower`, `/shop/graduation`, `/shop/holiday`)
- **Product detail pages** — `/products/[slug]`
- **Cart** — persisted in the browser (Zustand + localStorage)
- **Login-gated checkout** — visiting `/checkout` without being signed in
  redirects to `/login`, then back to checkout after signing in
- **Stripe Checkout integration** — `/api/checkout` creates a Stripe
  Checkout Session; customers pay on Stripe's hosted page, then land on
  `/order-success`
- **Currency switcher** — display-only conversion (USD/NGN/GBP/EUR); the
  actual Stripe charge is in USD until you wire up true multi-currency
  Stripe sessions

## Important — before this goes live

1. **Real authentication.** `/store/authStore.js` is a DEMO auth store
   (no password checking, no real user database) so the login-before-checkout
   flow works for testing. Replace with real auth — Auth.js (NextAuth) with
   a database, or Supabase Auth, before launch.

2. **Real product photography.** Product images currently point to simple
   placeholder SVGs in `/public/products/`. Swap in real photos.

3. **Your real logo.** Swap the text logo in `components/Header.jsx` for
   your actual logo image once you have the file.

4. **Stripe live keys.** Swap the test keys in `.env.local` for live keys
   when ready to accept real payments, and register a Stripe business
   account (this is a business step your boss needs to complete on
   stripe.com — it can't be done in code).

5. **Stripe webhook** (recommended before launch). Right now, order
   confirmation relies on the browser redirect back to `/order-success`.
   For reliability, add a Stripe webhook endpoint that listens for
   `checkout.session.completed` and marks the order paid server-side.

## Deploying

The easiest path is [Vercel](https://vercel.com) (made by the Next.js team):

1. Push this project to a GitHub repo
2. Import the repo at vercel.com
3. Add your `.env.local` variables in the Vercel project settings
4. Deploy

## Project structure

```
app/                  Next.js App Router pages
  page.jsx            Homepage
  shop/                Full catalog + occasion filters
  products/[slug]/     Product detail
  cart/                Cart page
  checkout/            Login-gated checkout
  login/, signup/      Auth pages
  account/             Signed-in account page
  api/checkout/        Stripe Checkout Session API route
components/           Header, Footer, ProductCard, CurrencySwitcher, etc.
lib/                  Product data, currency helpers
store/                Zustand stores (cart, auth, currency)
```
