/* =========================================
   GROWPLUS+ — SHARED NAV + FOOTER
   Injected into every page via this script
========================================= */

(function () {
  /* Detect current page for active nav link */
  const path = window.location.pathname.split('/').pop() || 'index.html';

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
    { href: 'index.html',     label: 'Home' },
    { href: 'about.html',     label: 'Who We Are' },
    { href: 'why.html',       label: 'Why Different' },
    { href: '#',              label: 'Services ▾', dropdown: [
        { href: 'seo.html',         icon: '🔍', label: 'SEO' },
        { href: 'performance.html', icon: '⚡', label: 'Performance Marketing' },
        { href: 'social.html',      icon: '📱', label: 'Social Media Marketing' },
        { href: 'affiliate.html',   icon: '🔗', label: 'Affiliate Marketing' },
        { href: 'brand.html',       icon: '🌐', label: 'Brand Marketing' },
        { href: 'influencer.html',  icon: '🤝', label: 'Influencer Marketing' },
        { href: 'content.html',     icon: '✍️', label: 'Content Marketing' },
    ]},
    { href: 'blog.html',      label: 'Blog' },
    { href: 'updates.html',   label: 'Updates' },
    { href: 'contact.html',   label: 'Grow With Us' },
    { href: 'landing.html',   label: 'All Services' },
  ];

  const mobileLinks = [
    { href: 'index.html',       label: 'Home' },
    { href: 'about.html',       label: 'Who We Are' },
    { href: 'why.html',         label: 'Why Different' },
    { href: 'services.html',    label: 'All Services' },
    { href: 'seo.html',         label: '— SEO' },
    { href: 'performance.html', label: '— Performance Marketing' },
    { href: 'social.html',      label: '— Social Media' },
    { href: 'affiliate.html',   label: '— Affiliate Marketing' },
    { href: 'brand.html',       label: '— Brand Marketing' },
    { href: 'influencer.html',  label: '— Influencer Marketing' },
    { href: 'content.html',     label: '— Content Marketing' },
    { href: 'blog.html',        label: 'Blog' },
    { href: 'updates.html',     label: 'New Updates' },
    { href: 'contact.html',     label: 'Grow With Us' },
    { href: 'landing.html',     label: 'All Services Landing' },
  ];

  let desktopLinksHTML = navLinks.map(l => {
    if (l.dropdown) {
      const ddItems = l.dropdown.map(d =>
        `<a href="${d.href}"><span class="dd-icon">${d.icon}</span>${d.label}</a>`
      ).join('');
      return `<li><a href="${l.href}">${l.label}</a><div class="nav-dropdown">${ddItems}</div></li>`;
    }
    const active = (l.href === path) ? ' class="active"' : '';
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
        <p>© 2025 GrowPlus+. All rights reserved.</p>
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
