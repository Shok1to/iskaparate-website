# Iskaparate.ph — website

A working multi-page website built from the Iskaparate.ph V1 website prototype and scope of work.
Plain HTML, CSS and JavaScript: no build step and no dependencies.

## Pages

| Page | File |
|---|---|
| Home (categories, products, bundles, wholesale, sell) | `index.html` (search: `?q=ube`, category: `?cat=food`) |
| Shop storefront (Kusina ni Aling Rosa) | `shop.html` |
| Product page (any product) | `product.html?id=ube` |
| Cart | `cart.html` |
| Seller confirms, buyer pays | `checkout.html` |
| Order tracking and pickup QR | `order.html` |
| Seller sign-up (mobile number + OTP) | `sell.html` |
| Seller workspace / dashboard | `dashboard.html` |
| Seller answers an order request (phone view) | `seller-request.html` |
| Help, Academy, partners, affiliates, policies | `info.html` |

Shared code: `assets/css/styles.css` (design tokens and components) and `assets/js/site.js`
(header, footer, English/Filipino toggle, product catalogue, cart).

## Run it locally

```
python3 -m http.server 8000
```
then open http://localhost:8000

## Deploy

Upload the folder as-is to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any web server).

## What is real and what is simulated

- Working in the browser: navigation, search and category filters, size/quantity/delivery choices,
  a cart that persists across pages (localStorage), checkout totals, order tracking, the sign-up form
  with phone and code validation, the language toggle, and the seller dashboard actions.
- Simulated (needs the V1 back end from the scope of work): SMS/OTP sending, the seller's reply
  (use the "Prototype only" buttons), payments (GCash, Maya, QR Ph, cards via Xendit or PayMongo),
  courier rates and tracking, and ID/BIR verification.
- Photos: free Unsplash stand-ins in `assets/img/` (sources in `assets/img/CREDITS.md`). Swap in each
  seller's real photos before launch, keeping the same file names or updating `img:` in `assets/js/site.js`.
- Placeholders still to fill: `[PARTNER COOPERATIVE]`, `[PICKUP ADDRESS]`, `[COMMISSION %]`,
  `[COURIER]`, `[WAYBILL NUMBER]`, `[PARTNERSHIPS EMAIL]`, and the final Privacy Notice and Terms.
