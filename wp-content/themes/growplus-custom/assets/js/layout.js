/* =========================================
   GROWPLUS+ — SHARED NAV + FOOTER
   Injected into every page via this script
========================================= */

(function () {
  /* ---- GLOBAL ASSETS (loaded once per page) ---- */
  const ensureAsset = (selector, createEl) => {
    if (!document.querySelector(selector)) {
      document.head.appendChild(createEl());
    }
  };

  // Core stylesheet (in case a page forgets to include it)
  ensureAsset('link[href="css/style.css"]', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/style.css';
    return link;
  });

  // Sanity client CDN
  ensureAsset('script[src*="sanityClient.min.js"]', () => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@sanity/client@latest/dist/sanityClient.min.js';
    s.defer = true;
    return s;
  });


  const base = (window.growplusData && window.growplusData.homeUrl) ? window.growplusData.homeUrl.replace(/\/$/, '') : '';
  const pageUrl = (slug) => slug === 'index' ? `${base}/` : `${base}/${slug}/`;

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  /* ---- GLOBAL BG ELEMENTS ---- */
  const bgHTML = `
    <div id="cursor"></div>
    <div id="cursor-ring"></div>
    <div id="bg-orbs">
      <div class="orb orb-1"></div><div class="orb orb-2"></div>
      <div class="orb orb-3"></div><div class="orb orb-4"></div>
    </div>
    <div id="global-grid"></div>
    <div id="geo-lines">
      <div class="geo-line"></div><div class="geo-line"></div>
      <div class="geo-line"></div><div class="geo-vline"></div>
      <div class="geo-vline"></div>
    </div>
    <canvas id="global-particles"></canvas>
    <div id="spotlight"></div>`;
  document.body.insertAdjacentHTML('afterbegin', bgHTML);

  /* ---- NAV ---- */
  const navLinks = [
    { href: `${pageUrl('index')}`,     label: 'Home' },
    { href: `${pageUrl('about')}`,     label: 'Who We Are' },
    { href: `${pageUrl('why')}`,       label: 'Why Different' },
    { href: '#',              label: 'Services ▾', dropdown: [
        { href: `${pageUrl('seo')}`,         icon: '🔍', label: 'SEO' },
        { href: `${pageUrl('performance')}`, icon: '⚡', label: 'Performance Marketing' },
        { href: `${pageUrl('social')}`,      icon: '📱', label: 'Social Media Marketing' },
        { href: `${pageUrl('affiliate')}`,   icon: '🔗', label: 'Affiliate Marketing' },
        { href: `${pageUrl('brand')}`,       icon: '🌐', label: 'Brand Marketing' },
        { href: `${pageUrl('influencer')}`,  icon: '🤝', label: 'Influencer Marketing' },
        { href: `${pageUrl('content')}`,     icon: '✍️', label: 'Content Marketing' },
    ]},
    { href: `${pageUrl('blog')}`,      label: 'Blog' },
    { href: `${pageUrl('updates')}`,   label: 'Updates' },
    { href: `${pageUrl('contact')}`,   label: 'Grow With Us' },
    { href: `${pageUrl('landing')}`,   label: 'All Services' },
  ];

  const mobileLinks = [
    { href: `${pageUrl('index')}`,       label: 'Home' },
    { href: `${pageUrl('about')}`,       label: 'Who We Are' },
    { href: `${pageUrl('why')}`,         label: 'Why Different' },
    { href: `${pageUrl('services')}`,    label: 'All Services' },
    { href: `${pageUrl('seo')}`,         label: '— SEO' },
    { href: `${pageUrl('performance')}`, label: '— Performance Marketing' },
    { href: `${pageUrl('social')}`,      label: '— Social Media' },
    { href: `${pageUrl('affiliate')}`,   label: '— Affiliate Marketing' },
    { href: `${pageUrl('brand')}`,       label: '— Brand Marketing' },
    { href: `${pageUrl('influencer')}`,  label: '— Influencer Marketing' },
    { href: `${pageUrl('content')}`,     label: '— Content Marketing' },
    { href: `${pageUrl('blog')}`,        label: 'Blog' },
    { href: `${pageUrl('updates')}`,     label: 'New Updates' },
    { href: `${pageUrl('contact')}`,     label: 'Grow With Us' },
    { href: `${pageUrl('landing')}`,     label: 'All Services Landing' },
  ];

  let desktopLinksHTML = navLinks.map(l => {
    if (l.dropdown) {
      const ddItems = l.dropdown.map(d =>
        `<a href="${d.href}"><span class="dd-icon">${d.icon}</span>${d.label}</a>`
      ).join('');
      return `<li><a href="${l.href}">${l.label}</a><div class="nav-dropdown">${ddItems}</div></li>`;
    }
    const active = (new URL(l.href, window.location.origin).pathname.replace(/\/$/, '') === currentPath) ? ' class="active"' : '';
    return `<li><a href="${l.href}"${active}>${l.label}</a></li>`;
  }).join('');

  let mobileLinksHTML = mobileLinks.map(l =>
    `<a href="${l.href}">${l.label}</a>`
  ).join('');

  const navHTML = `
    <nav id="navbar">
      <a href="index.html" class="nav-logo">Grow<em>Plus</em>+</a>
      <ul class="nav-links">${desktopLinksHTML}</ul>
      <a href="contact.html" class="nav-cta">Get Started</a>
      <div class="hamburger" id="ham" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </div>
    </nav>
    <div class="mobile-menu" id="mob-menu">${mobileLinksHTML}</div>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ---- FOOTER ---- */
  const footerHTML = `
    <footer>
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">Grow<em>Plus</em>+</div>
          <p class="footer-desc">India's most results-obsessed digital marketing agency. We turn brands into growth machines through data-driven strategy and relentless execution.</p>
          <div class="footer-socials">
            <a href="https://facebook.com"  class="social-link" target="_blank">f</a>
            <a href="https://instagram.com" class="social-link" target="_blank">in</a>
            <a href="https://linkedin.com"  class="social-link" target="_blank">Li</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Navigation</h5>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">Who We Are</a></li>
            <li><a href="why.html">Why Different</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="updates.html">New Updates</a></li>
            <li><a href="contact.html">Grow With Us</a></li>
            <li><a href="landing.html">All Services</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="seo.html">SEO</a></li>
            <li><a href="performance.html">Performance Marketing</a></li>
            <li><a href="social.html">Social Media</a></li>
            <li><a href="affiliate.html">Affiliate Marketing</a></li>
            <li><a href="brand.html">Brand Marketing</a></li>
            <li><a href="influencer.html">Influencer Marketing</a></li>
            <li><a href="content.html">Content Marketing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:+919671718434">+91 – 9671718434</a></li>
            <li><a href="mailto:Info@growplused.com">Info@growplused.com</a></li>
            <li><a href="https://growplused.com" target="_blank">growplused.com</a></li>
            <li><a href="#">Faridabad, Haryana, India</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${growplusData?.year || new Date().getFullYear()} GrowPlus+. All rights reserved.</p>
        <p style="color:var(--red)">Built to Grow →</p>
      </div>
    </footer>`;
  /* Inject footer only after the DOM is parsed so it stays at the bottom */
  const injectFooter = () => document.body.insertAdjacentHTML('beforeend', footerHTML);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
