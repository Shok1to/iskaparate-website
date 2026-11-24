# Iskaparate.ph — website

A working multi-page website built from the Iskaparate.ph V1 website prototype and scope of work.
Plain HTML, CSS and JavaScript: no build step and no dependencies.

## Pages

| Page | File |
|---|---|
| Home (categories, products, bundles, wholesale, become a vendor) | `index.html` (search: `?q=ube`, category: `?cat=food`) |
| Shop storefront (Kusina ni Aling Rosa) | `shop.html` |
| Product page (any product) | `product.html?id=ube` |
| Cart (every order goes to the vendor to confirm first) | `cart.html` |
| Vendor confirms, then buyer pays (GCash, Maya, InstaPay) | `checkout.html` |
| Order tracking (delivered by the vendor or a courier) | `order.html` |
| "Can't find it?" helper chat | `find.html` |
| Vendor application (no vendor log-in; Iskaparate runs the shop) | `sell.html` |
| What a vendor sees from the order text | `seller-request.html` |
| Iskaparate staff operations console | `dashboard.html` |
| Help, delivery, resellers, policies | `info.html` |

Shared code: `assets/css/styles.css` (design tokens and components) and `assets/js/site.js`
(header, footer, English/Filipino toggle, product catalogue, vendors' delivery rules, cart).

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
- Simulated (needs a back end): SMS/OTP sending, the vendor's reply (use the "Prototype only" buttons),
  GCash/Maya/InstaPay payments, courier booking and tracking, the staff console data, and the find-it
  helper (it searches Iskaparate's own catalogue; checking other shops is done by staff).
- Photos: free Unsplash stand-ins in `assets/img/` (sources in `assets/img/CREDITS.md`). Swap in each
  seller's real photos before launch, keeping the same file names or updating `img:` in `assets/js/site.js`.
- Placeholders still to fill: `[PARTNER COOPERATIVE]`, `[PICKUP ADDRESS]`, `[COMMISSION %]`,
  `[COURIER]`, `[WAYBILL NUMBER]`, `[PARTNERSHIPS EMAIL]`, `[RESELLER CONTACT]`, `[HOTLINE]`, `[RESPONSE TIME]`, and the final Privacy Notice and Terms.
