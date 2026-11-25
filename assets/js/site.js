/* Iskaparate.ph — shared site script: catalogue, cart, header/footer, language. */
(function () {
  'use strict';

  const fmt = (n) => '₱' + Number(n).toLocaleString('en-US');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Catalogue (sample data from the prototype) ---------- */
  // deliver: 'seller' = the vendor delivers herself in her area; 'courier' = booked courier
  const shops = {
    rosa: { name: 'Kusina ni Aling Rosa', short: 'Aling Rosa', area: 'Cubao, Quezon City', deliver: 'seller', deliverNote: 'Aling Rosa delivers herself within Quezon City and nearby cities', fee: 100, url: 'shop.html' },
    habi: { name: 'Habi Iloilo Weaves', area: 'Iloilo City', deliver: 'courier', fee: 180 },
    nena: { name: 'Tita Nena’s Pantry', area: 'Batangas', deliver: 'courier', fee: 180 },
    cora: { name: 'Matamis ni Lola Cora', short: 'Lola Cora', area: 'Bulacan', deliver: 'seller', deliverNote: 'Lola Cora’s family delivers within Bulacan and North Metro Manila', fee: 120 },
    bicol: { name: 'Bicol Hibla Makers', area: 'Albay', deliver: 'courier', fee: 180 },
    malinis: { name: 'Malinis Aircon Services', area: 'Metro Manila', deliver: 'seller', deliverNote: 'The technician comes to your home in Metro Manila', fee: 0 },
    cebu: { name: 'Cebu Tamis Co-op', area: 'Cebu City', deliver: 'courier', fee: 180 },
    isk: { name: 'Iskaparate bundles', area: 'Packed by Iskaparate', deliver: 'courier', fee: 180 }
  };

  const products = [
    { id: 'ube', img: 'assets/img/ube.jpg', name: 'Ube halaya', cardName: 'Ube halaya, 500 g jar', shop: 'rosa', cat: 'food', type: 'mto', price: 280, tag: 'Made to order · 2 days', lead: 'ready in 2 days',
      sizes: [{ id: '250', label: '250 g', price: 150 }, { id: '500', label: '500 g', price: 280 }, { id: '1000', label: '1 kg', price: 520 }], defaultSize: '500',
      desc: 'Purple yam slow-cooked with milk and butter, stirred by hand for two hours. Sold in glass jars.',
      ingredients: 'Ube, condensed milk, evaporated milk, butter, sugar.', allergens: 'Contains milk.',
      resale: 'Approved resellers pay <strong>₱250 a jar</strong> for 12 or more.' },
    { id: 'banig', img: 'assets/img/banig.jpg', name: 'Banig placemats, set of 4', shop: 'habi', cat: 'crafts', type: 'stock', price: 650, tag: 'Ships nationwide', lead: 'ships from Iloilo City',
      desc: 'Hand-woven tikog grass placemats in natural and indigo stripes. Wipe clean with a damp cloth.' },
    { id: 'calamansi', img: 'assets/img/calamansi.jpg', name: 'Calamansi concentrate, 1 L', shop: 'nena', cat: 'food', type: 'stock', price: 220, tag: 'Ships nationwide', lead: 'ships from Batangas',
      desc: 'Pure calamansi juice concentrate, lightly sweetened. Mix 1 part to 4 parts water.', ingredients: 'Calamansi juice, cane sugar.', allergens: 'No common allergens.' },
    { id: 'pastillas', img: 'assets/img/pastillas.jpg', name: 'Pastillas de leche, box of 30', shop: 'cora', cat: 'food', type: 'mto', price: 300, tag: 'Made to order · 3 days', lead: 'ready in 3 days',
      desc: 'Soft carabao-milk pastillas wrapped in cut paper, made the way Lola Cora learned in Bulacan.', ingredients: 'Carabao milk, sugar, calamansi zest.', allergens: 'Contains milk.' },
    { id: 'adobo', img: 'assets/img/adobo.jpg', name: 'Chicken adobo party tray', shop: 'rosa', cat: 'food', type: 'mto', price: 1450, tag: 'Delivered by the seller', lead: 'serves 10 to 12 · 2 days notice', shopTag: 'Party tray', kind: 'tray',
      desc: 'Classic soy-and-vinegar chicken adobo with garlic rice on the side. Serves 10 to 12.', ingredients: 'Chicken, soy sauce, cane vinegar, garlic, bay leaf, pepper, rice.', allergens: 'Contains soy and wheat.' },
    { id: 'tote', img: 'assets/img/tote.jpg', name: 'Abaca tote bag', shop: 'bicol', cat: 'crafts', type: 'stock', price: 780, tag: 'Ships nationwide', lead: 'ships from Albay',
      desc: 'Sturdy tote woven from Bicol abaca fibre with cotton handles. Fits a laptop up to 14 inches.' },
    { id: 'aircon', img: 'assets/img/aircon.jpg', name: 'Aircon cleaning, split type', shop: 'malinis', cat: 'services', type: 'service', price: 900, priceText: 'From ₱900', tag: 'Metro Manila service', lead: 'booked by date and area',
      desc: 'Full cleaning of one split-type unit: filters, coils, blower and drain line. About 1.5 hours per unit.' },
    { id: 'mangoes', img: 'assets/img/mango.jpg', name: 'Dried mangoes, 250 g', shop: 'cebu', cat: 'food', type: 'stock', price: 190, tag: 'Wholesale available', lead: 'ships from Cebu City',
      desc: 'Sweet Cebu Carabao mangoes, sliced and sun-dried by the co-op’s members.', ingredients: 'Mango, sugar.', allergens: 'No common allergens.',
      resale: 'Approved resellers pay <strong>₱165 a pack</strong> for 24 or more, ₱150 for 96 or more.' },
    { id: 'flan', img: 'assets/img/flan.jpg', name: 'Leche flan, 2 llaneras', shop: 'rosa', cat: 'food', type: 'mto', price: 360, tag: 'Made to order', lead: 'ready in 1 day', kind: 'mto', hideHome: true,
      desc: 'Silky egg-yolk custard with dark caramel, steamed in two llaneras.', ingredients: 'Egg yolks, condensed milk, evaporated milk, sugar.', allergens: 'Contains egg and milk.' },
    { id: 'pancit', img: 'assets/img/pancit.jpg', name: 'Pancit bihon party tray', shop: 'rosa', cat: 'food', type: 'mto', price: 1100, tag: 'Party tray', lead: 'serves 10 to 12 · 2 days notice', kind: 'tray', hideHome: true,
      desc: 'Rice noodles with chicken, pork, cabbage and carrots. Serves 10 to 12.', ingredients: 'Rice noodles, chicken, pork, vegetables, soy sauce.', allergens: 'Contains soy and wheat.' },
    { id: 'ube-case', img: 'assets/img/ube-case.jpg', name: 'Ube halaya, case of 12 jars', shop: 'rosa', cat: 'wholesale', type: 'mto', price: 3000, tag: 'Wholesale', lead: 'for approved resellers', kind: 'wholesale', hideHome: true,
      desc: 'Twelve 500 g jars of ube halaya for approved resellers.', ingredients: 'Ube, condensed milk, evaporated milk, butter, sugar.', allergens: 'Contains milk.' },
    { id: 'visayas-box', img: 'assets/img/visayas-box.jpg', name: 'Visayas pasalubong box', shop: 'isk', cat: 'bundle', type: 'stock', price: 1150, tag: 'Bundle', lead: 'from 3 shops', bundle: true, hideHome: true,
      from: 'From 3 shops', items: 'Dried mangoes, banig coasters and piaya, packed together.',
      desc: 'Dried mangoes, banig coasters and piaya, packed together. Each seller is paid their share.' },
    { id: 'merienda', img: 'assets/img/merienda.jpg', name: 'Merienda for the office', shop: 'isk', cat: 'bundle', type: 'stock', price: 980, tag: 'Bundle', lead: 'from 3 shops', bundle: true, hideHome: true,
      from: 'From 3 shops', items: 'Pastillas, ube halaya and calamansi concentrate for 15 people.',
      desc: 'Pastillas, ube halaya and calamansi concentrate for 15 people. Each seller is paid their share.' }
  ];
  // Shop-page notes and kinds for Aling Rosa's items
  const ube1kg = { id: 'ube', size: '1000', name: 'Ube halaya, 1 kg tub', note: 'Ready in 2 days', price: 520, tag: 'Made to order', kind: 'mto' };

  const byId = (id) => products.find((p) => p.id === id);

  /* ---------- Cart (localStorage) ---------- */
  const CART_KEY = 'isk-cart-v2';
  const DEFAULT_CART = { items: [{ id: 'ube', size: '500', qty: 2 }, { id: 'banig', qty: 1 }], shops: {} };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  const cart = {
    read() { return store.get(CART_KEY, JSON.parse(JSON.stringify(DEFAULT_CART))); },
    write(c) { store.set(CART_KEY, c); updateCartCount(); },
    lineKey(i) { return i.id + (i.size ? ':' + i.size : ''); },
    lines() {
      return this.read().items.map((i) => {
        const p = byId(i.id); if (!p) return null;
        const size = p.sizes ? (p.sizes.find((s) => s.id === i.size) || p.sizes[0]) : null;
        const unit = size ? size.price : p.price;
        return { ...i, key: this.lineKey(i), product: p, shopId: p.shop, shop: shops[p.shop], name: size ? `${p.name}, ${size.label}${p.id === 'ube' && size.id !== '1000' ? ' jar' : ''}` : p.name, unit, total: unit * i.qty };
      }).filter(Boolean);
    },
    add(id, qty, size) {
      const c = this.read();
      const key = id + (size ? ':' + size : '');
      const found = c.items.find((i) => this.lineKey(i) === key);
      if (found) found.qty = Math.min(99, found.qty + qty); else c.items.push(size ? { id, size, qty } : { id, qty });
      this.write(c);
    },
    setQty(key, qty) { const c = this.read(); c.items.forEach((i) => { if (this.lineKey(i) === key) i.qty = qty; }); this.write(c); },
    remove(key) { const c = this.read(); c.items = c.items.filter((i) => this.lineKey(i) !== key); this.write(c); },
    shopMeta(shopId) { const c = this.read(); return (c.shops && c.shops[shopId]) || {}; },
    setShopMeta(shopId, patch) { const c = this.read(); c.shops = c.shops || {}; c.shops[shopId] = { ...(c.shops[shopId] || {}), ...patch }; this.write(c); },
    count() { return this.read().items.reduce((n, i) => n + i.qty, 0); },
    clear() { this.write({ items: [], shops: {} }); },
    reset() { this.write(JSON.parse(JSON.stringify(DEFAULT_CART))); },
    groups() {
      const out = [];
      this.lines().forEach((l) => {
        let g = out.find((x) => x.shopId === l.shopId);
        if (!g) { g = { shopId: l.shopId, shop: l.shop, lines: [], meta: this.shopMeta(l.shopId) }; out.push(g); }
        g.lines.push(l);
      });
      out.forEach((g) => {
        g.confirmFirst = true; // every order is confirmed by the vendor before the buyer pays
        g.how = g.shop.deliver;
        g.subtotal = g.lines.reduce((n, l) => n + l.total, 0);
        g.shipping = g.shop.fee;
      });
      return out;
    }
  };

  /* ---------- Language ---------- */
  const LANG_KEY = 'isk-lang';
  const dict = {
    en: {
      top: 'Every seller confirms your order before you pay · Pay with GCash, Maya or InstaPay',
      searchPh: 'Search ube halaya, banig, aircon cleaning…', search: 'Search', categories: 'Categories', wholesale: 'Wholesale', sell: 'Become a vendor', academy: 'Iskaparate Academy', cart: 'Cart', signin: 'Can’t find it?',
      footAbout: 'An online mall for proud Filipino brands, helping nanays and micro-entrepreneurs sell online since 2020.',
      fShop: 'Shop', fSell: 'Sell and partner', fHelp: 'Help', fMarket: 'Iskaparate is a marketplace: every item is sold by an independent seller.',
      heroEyebrow: 'Online mall since 2020', heroTitle: 'Proud Filipino brands, straight from the nanays who make them.',
      heroLead: 'Every shop is checked by Iskaparate, and many are vouched for by their cooperative or foundation. Order home-cooked food, crafts and services from sellers across Luzon, Visayas and Mindanao.',
      startShopping: 'Start shopping', shopByCat: 'Shop by category', fresh: 'Fresh this week', bundles: 'Curated bundles'
    },
    fil: {
      top: 'Kinukumpirma muna ng nagbebenta ang order bago ka magbayad · GCash, Maya o InstaPay',
      searchPh: 'Maghanap ng ube halaya, banig, paglilinis ng aircon…', search: 'Hanapin', categories: 'Mga kategorya', wholesale: 'Pakyawan', sell: 'Maging vendor', academy: 'Iskaparate Academy', cart: 'Cart', signin: 'Wala ang hanap mo?',
      footAbout: 'Online mall para sa mga ipinagmamalaking produktong Pilipino, tumutulong sa mga nanay at maliliit na negosyante mula pa noong 2020.',
      fShop: 'Mamili', fSell: 'Magbenta at makipag-partner', fHelp: 'Tulong', fMarket: 'Ang Iskaparate ay isang marketplace: bawat produkto ay ibinebenta ng isang malayang nagbebenta.',
      heroEyebrow: 'Online mall mula 2020', heroTitle: 'Ipinagmamalaking produktong Pilipino, diretso mula sa mga nanay na gumawa nito.',
      heroLead: 'Sinusuri ng Iskaparate ang bawat tindahan, at marami ang inendorso ng kanilang kooperatiba o foundation. Umorder ng lutong-bahay, gawang-kamay at serbisyo mula sa Luzon, Visayas at Mindanao.',
      startShopping: 'Magsimulang mamili', shopByCat: 'Mamili ayon sa kategorya', fresh: 'Bago ngayong linggo', bundles: 'Mga piling bundle'
    }
  };
  const lang = () => store.get(LANG_KEY, 'en');
  function applyLang() {
    const l = lang(); const d = dict[l] || dict.en;
    document.documentElement.lang = l === 'fil' ? 'fil' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => { const v = d[el.dataset.i18n]; if (v) el.textContent = v; });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => { const v = d[el.dataset.i18nPh]; if (v) el.placeholder = v; });
    document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  }

  /* ---------- Header / footer ---------- */
  const logo = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3" y="3" width="26" height="26" rx="5" stroke="#1D2140" stroke-width="2.2"/><path d="M3 13h26M3 21h26" stroke="#F0A81C" stroke-width="2.6"/><rect x="8" y="7" width="5" height="6" rx="1" fill="#1D2140"/><rect x="16" y="9" width="4" height="4" rx="1" fill="#1D2140"/><rect x="11" y="16" width="6" height="5" rx="1" fill="#1D2140"/></svg>';

  function headerHTML(active) {
    const cur = (k) => (k === active ? ' aria-current="page"' : '');
    return `
<div class="topbar"><div class="container">
  <span class="msg" data-i18n="top">${dict.en.top}</span>
  <div class="lang" role="group" aria-label="Language">
    <button type="button" data-lang="en" aria-pressed="true">English</button>
    <button type="button" data-lang="fil" aria-pressed="false">Filipino</button>
  </div>
</div></div>
<header class="site-header"><div class="container bar">
  <a class="brand" href="index.html" aria-label="Iskaparate home">${logo}<span class="brand-word">iskaparate<span>.ph</span></span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mainnav" aria-label="Menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D2140" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  <form class="search" role="search" action="index.html#featured" method="get">
    <label for="site-search" class="sr-only">Search Iskaparate</label>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#565B73" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
    <input id="site-search" name="q" type="search" data-i18n-ph="searchPh" placeholder="${dict.en.searchPh}">
    <button type="submit" data-i18n="search">Search</button>
  </form>
  <nav class="mainnav" id="mainnav" aria-label="Main">
    <a href="index.html#categories" data-i18n="categories">Categories</a>
    <a href="index.html#wholesale" data-i18n="wholesale">Wholesale</a>
    <a href="sell.html"${cur('sell')} data-i18n="sell">Become a vendor</a>
    <a href="academy.html" class="nav-academy"${cur('academy')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg><span data-i18n="academy">Iskaparate Academy</span><span class="nav-new">Free</span></a>
    <a href="cart.html" class="cart-link"${cur('cart')}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D2140" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
      <span data-i18n="cart">Cart</span><span class="cart-count" aria-label="items in cart">0</span>
    </a>
    <a href="find.html" class="btn btn-outline"${cur('find')} data-i18n="signin">Can’t find it?</a>
  </nav>
</div></header>`;
  }

  function footerHTML() {
    return `
<footer class="site-footer"><div class="container">
  <div class="grid" style="--min:200px;--g:28px">
    <div class="stack" style="--g:10px">
      <span class="brand-word" style="font-size:22px">iskaparate<span style="color:var(--brown)">.ph</span></span>
      <p class="small muted" style="line-height:1.55" data-i18n="footAbout">${dict.en.footAbout}</p>
    </div>
    <nav aria-label="Shop"><span data-i18n="fShop">Shop</span>
      <a href="index.html?cat=food#featured">Food and pasalubong</a>
      <a href="index.html?cat=crafts#featured">Crafts and weaves</a>
      <a href="index.html?cat=services#featured">Services</a>
      <a href="index.html#wholesale">Wholesale</a>
    </nav>
    <nav aria-label="Sell"><span data-i18n="fSell">Sell and partner</span>
      <a href="sell.html">Become a vendor</a>
      <a href="academy.html">Iskaparate Academy</a>
      <a href="info.html#how-shops-run">How we run vendors’ shops</a>
      <a href="info.html#partners">Partner organisations</a>
      <a href="find.html">Find any item for me</a>
    </nav>
    <nav aria-label="Help"><span data-i18n="fHelp">Help</span>
      <a href="info.html#payments">How payments are held</a>
      <a href="info.html#shipping">Delivery and returns</a>
      <a href="info.html#privacy">Privacy notice</a>
      <a href="info.html#terms">Terms</a>
    </nav>
  </div>
  <div class="footer-base"><span data-i18n="fMarket">${dict.en.fMarket}</span><span>© ${new Date().getFullYear()} Iskaparate · iskaparate.ph</span></div>
</div></footer>`;
  }

  function updateCartCount() { document.querySelectorAll('.cart-count').forEach((el) => { el.textContent = cart.count(); }); }

  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* Product card markup shared by pages */
  function productCard(p, opts) {
    opts = opts || {};
    const href = 'product.html?id=' + encodeURIComponent(p.id) + (opts.size ? '&size=' + opts.size : '');
    return `<a class="pcard" href="${href}">
  <div class="ph">${p.img ? `<img src="${p.img}" alt="${esc(opts.name || p.cardName || p.name)}" loading="lazy">` : ''}<span class="ph-tag">${esc(opts.tag || p.tag)}</span></div>
  <div class="pcard-body">
    <span class="pcard-name">${esc(opts.name || p.cardName || p.name)}</span>
    <span class="small" style="color:var(--text-3)">${esc(opts.sub || shops[p.shop].name)}</span>
    <span class="price" style="margin-top:4px">${esc(opts.price || p.priceText || fmt(p.price))}</span>
  </div>
</a>`;
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const h = document.getElementById('site-header');
    if (h) h.outerHTML = headerHTML(document.body.dataset.page);
    const f = document.getElementById('site-footer');
    if (f) f.outerHTML = footerHTML();

    document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => { store.set(LANG_KEY, b.dataset.lang); applyLang(); }));
    const mb = document.querySelector('.menu-btn');
    if (mb) mb.addEventListener('click', () => {
      const nav = document.getElementById('mainnav');
      const open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', String(open));
    });
    const q = new URLSearchParams(location.search).get('q');
    const si = document.getElementById('site-search');
    if (si && q) si.value = q;

    const sh = document.querySelector('.site-header');
    if (sh) document.documentElement.style.setProperty('--header-h', sh.offsetHeight + 'px');

    updateCartCount();
    applyLang();
  });

  window.ISK = { fmt, esc, shops, products, byId, cart, store, toast, productCard, applyLang, ube1kg };
})();
