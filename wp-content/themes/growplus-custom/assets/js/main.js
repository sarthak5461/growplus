// const client = sanityClient({
//   projectId: '53co0xh4',
//   dataset: 'production',
//   useCdn: true,
//   apiVersion: '2024-01-01'
// });

/* =========================================
   GROWPLUS+ — MAIN JAVASCRIPT
========================================= */

/* ---- CURSOR ---- */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
if (cur) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

/* ---- SPOTLIGHT ---- */
const spotlight = document.getElementById('spotlight');
if (spotlight) {
  document.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => spotlight.style.opacity = '0');
  document.addEventListener('mouseenter', () => spotlight.style.opacity = '1');
}

/* ---- NAV SCROLL ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ---- MOBILE MENU ---- */
function toggleMenu() {
  const ham  = document.getElementById('ham');
  const menu = document.getElementById('mob-menu');
  if (ham)  ham.classList.toggle('open');
  if (menu) menu.classList.toggle('open');
}
window.toggleMenu = toggleMenu;

/* ---- SCROLL REVEAL ---- */
function checkReveal() {
  const threshold = window.innerHeight * 0.88;
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
    if (el.getBoundingClientRect().top < threshold) el.classList.add('vis');
  });
}
window.addEventListener('scroll', checkReveal, { passive: true });
checkReveal();

/* ---- COUNTERS ---- */
function runCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.count);
    let start = null;
    const dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.floor(ease * target);
      if (prog < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}
setTimeout(runCounters, 600);

/* ---- FORMS ---- */
function handleForm(e, successId) {
  e.preventDefault();
  const msg = document.getElementById(successId);
  if (msg) { msg.style.display = 'block'; }
  e.target.reset();
  setTimeout(() => { if (msg) msg.style.display = 'none'; }, 6000);
}
window.handleForm = handleForm;

/* ---- FAQ TOGGLE ---- */
function toggleFaq(qEl) {
  const item   = qEl.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-a').style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-a').style.maxHeight =
      item.querySelector('.faq-a').scrollHeight + 'px';
  }
}
window.toggleFaq = toggleFaq;

/* ---- BLOG FILTER ---- */
function filterBlog(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#blog-grid .blog-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}
window.filterBlog = filterBlog;

/* ---- CARD SHIMMER TRACKING ---- */
document.querySelectorAll('.card-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height* 100).toFixed(1) + '%');
  });
});

/* ---- GLOBAL FLOATING PARTICLES ---- */
(function () {
  const canvas = document.getElementById('global-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const pts = Array.from({ length: 35 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    o: Math.random() * 0.18 + 0.04,
    pulse: Math.random() * Math.PI * 2
  }));
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.pulse += 0.012;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const alpha = p.o + Math.sin(p.pulse) * 0.06;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      g.addColorStop(0, `rgba(200,16,46,${alpha})`);
      g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,16,46,${Math.min(alpha * 2, 0.5)})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ---- HERO CANVAS (only on pages that have it) ---- */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
    pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4, o: Math.random() * 0.35 + 0.06,
      pulse: Math.random() * Math.PI * 2
    }));
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const rg = ctx.createRadialGradient(W * .15, H * .3, 0, W * .15, H * .3, W * .6);
    rg.addColorStop(0, 'rgba(200,16,46,0.06)'); rg.addColorStop(1, 'transparent');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.pulse += 0.015;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const ao = p.o + Math.sin(p.pulse) * 0.08;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,16,46,${ao})`; ctx.fill();
    });
    pts.forEach((p, i) => {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
        if (d < 140) {
          const op = 0.08 * (1 - d / 140);
          const g  = ctx.createLinearGradient(p.x, p.y, pts[j].x, pts[j].y);
          g.addColorStop(0, `rgba(200,16,46,${op})`);
          g.addColorStop(0.5, `rgba(200,16,46,${op * 1.6})`);
          g.addColorStop(1, `rgba(200,16,46,${op})`);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = g; ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
    });
    const time = Date.now() * 0.0004;
    for (let i = 0; i < 3; i++) {
      const y = H * (0.2 + 0.3 * i + 0.04 * Math.sin(time + i * 1.8));
      const band = ctx.createLinearGradient(0, y - 40, 0, y + 40);
      band.addColorStop(0, 'transparent');
      band.addColorStop(0.5, 'rgba(200,16,46,0.025)');
      band.addColorStop(1, 'transparent');
      ctx.fillStyle = band; ctx.fillRect(0, y - 40, W, 80);
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---- PARALLAX ---- */
window.addEventListener('scroll', () => {
  const bg = document.getElementById('para-bg');
  if (bg) bg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
}, { passive: true });

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => { checkReveal(); runCounters(); });



// Sanity CMS 

// Home Page

// client.fetch(`*[_type == "page" && slug.current == "homePage"][0]`)
//   .then(data => {
//     console.log(data);

//     // Hero Section
//     document.getElementById('hero-title').innerText = data.heroHeading;
//     document.getElementById('hero-subtitle').innerText = data.heroSubheading;
//   })
//   .catch(err => console.error(err));