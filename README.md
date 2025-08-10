# PosterBiz MVP

A minimal Next.js app to manage your poster illustration catalog, export listings, and simulate subscriptions/analytics. Uses **localStorage** (no backend) so you can run it instantly.

## Quick Start

```bash
npm install
npm run dev
# then open http://localhost:3000
```

## What You Can Do

- **Create posters** with title, description, price, tags, sizes, license, and optional preview image.
- **Manage catalog**: search, sort, feature items, delete, and **export CSV/JSON** for Etsy/Shopify imports.
- **Subscriptions (mock)**: shows how MRR would look with Stripe; replace with real Stripe Checkout.
- **Analytics (mock)**: simple KPIs and sparklines.

## Next Steps (to reach $10k/mo)

- Hook up **Stripe** (Checkout + webhooks) for subscriptions and paid downloads.
- Integrate **Printful** (or Gelato) to auto-publish products.
- Add **SEO fields** per product and auto-post to social platforms via APIs.
- Add a **server & database** (Supabase/Firestore) when you're ready for multi-device sync.

## Notes

- This MVP stores data in your browser only.
- To reset data, clear your site's local storage in the browser.
