// Good — nice to see it live. Here's a full honest checklist, organized by how critical each piece is:

// ## 🔴 Must-have before real customers can buy anything
// 1. **Stripe keys** — add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel's project settings, or checkout stays broken (500 error)
// 2. **Real authentication** — current login/signup is a demo stand-in (accepts any email/password, no real account check, no password security). Needs a real auth provider (Auth.js/NextAuth) + database
// 3. **A real database** — for user accounts, orders, and saved data to persist properly and securely (currently just browser localStorage — not shared across devices, not secure, wipeable by clearing browser data)
// 4. **Server-side price validation** — right now the Stripe checkout route trusts whatever price the browser sends it. Before real payments, the server needs to look up real prices itself (from your product data) instead of trusting client input — otherwise someone could tamper with prices before checkout

// ## 🟡 Needed for a "real" ecommerce experience
// 5. **Order history / account page** — currently just shows email + sign out. No past orders, no order tracking
// 6. **Saved addresses & payment methods** — not built yet
// 7. **Order confirmation emails** — the success page says "a confirmation has been sent" but nothing actually sends one yet (needs an email service like Resend or SendGrid)
// 8. **Stripe webhook** — for reliably marking orders as paid server-side (currently relies only on the browser redirect back, which isn't fully reliable)
// 9. **Inventory/stock tracking** — no concept of "out of stock" currently exists

// ## 🟢 Content/polish gaps (frontend, but worth finishing)
// 10. **Social links** — Instagram/TikTok/Facebook in the footer still point to `#` placeholders
// 11. **Real product photography** — some real images are in now, but double-check nothing's still on a placeholder SVG
// 12. **Currency switcher is display-only** — changing it doesn't change what Stripe actually charges (still bills in USD regardless of the dropdown) — fine for now, but worth knowing it's cosmetic
// 13. **Legal pages** — no Privacy Policy, Terms of Service, or Refund/Shipping policy — most payment processors (Stripe included) expect these to exist before going fully live
// 14. **Custom domain** — still on `.vercel.app`, not `gorillasnotcleaners.com` or similar

// supabase project password:Xx6#5xSP9hgws6S


// ## ⚪ Nice-to-haves, not blockers
// 15. Analytics (Vercel Analytics, Google Analytics)
// 16. SEO polish — note that `/shop` lost its page `<title>` metadata when it became a client component (for filtering/sorting) — fixable with a small wrapper if it matters to you

// **My honest priority order:** Stripe keys first (quick win, unblocks testing), then real auth + database (this is the actual "backend" work you already know is coming), then server-side price validation before anyone spends real money, then everything else can follow after your boss has seen it working end-to-end.