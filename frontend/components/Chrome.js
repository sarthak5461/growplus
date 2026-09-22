"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const serviceLinks = [
  { href: "/seo", icon: "🔍", label: "SEO" },
  { href: "/performance", icon: "⚡", label: "Performance Marketing" },
  { href: "/social", icon: "📱", label: "Social Media Marketing" },
  { href: "/affiliate", icon: "🔗", label: "Affiliate Marketing" },
  { href: "/brand", icon: "🌐", label: "Brand Marketing" },
  { href: "/influencer", icon: "🤝", label: "Influencer Marketing" },
  { href: "/content", icon: "✍️", label: "Content Marketing" },
];

export default function Chrome({ site, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    setOpen(false);
    document.body.classList.toggle("admin-mode", isAdmin);
    return () => document.body.classList.remove("admin-mode");
  }, [pathname, isAdmin]);

  useEffect(() => {
    if (isAdmin) return undefined;
    const cur = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    const spotlight = document.getElementById("spotlight");
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cur) {
        cur.style.left = `${mx}px`;
        cur.style.top = `${my}px`;
      }
      if (spotlight) {
        spotlight.style.left = `${mx}px`;
        spotlight.style.top = `${my}px`;
      }
    };
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) {
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
      }
      requestAnimationFrame(animRing);
    };
    const onScroll = () => setScrolled(window.scrollY > 20);
    const checkReveal = () => {
      const threshold = window.innerHeight * 0.88;
      document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach((el) => {
        if (el.getBoundingClientRect().top < threshold) el.classList.add("vis");
      });
    };
    const runCounters = () => {
      document.querySelectorAll("[data-count]").forEach((el) => {
        if (el.dataset.done) return;
        el.dataset.done = "1";
        const target = parseInt(el.dataset.count, 10);
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / 1800, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = String(Math.floor(ease * target));
          if (prog < 1) requestAnimationFrame(step);
          else el.textContent = String(target);
        };
        requestAnimationFrame(step);
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("scroll", () => {
      const bg = document.getElementById("para-bg");
      if (bg) bg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }, { passive: true });
    animRing();
    checkReveal();
    setTimeout(runCounters, 400);

    const canvas = document.getElementById("global-particles");
    let stopParticles = () => {};
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let W;
      let H;
      const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      const pts = Array.from({ length: 35 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        o: Math.random() * 0.18 + 0.04,
        pulse: Math.random() * Math.PI * 2,
      }));
      let alive = true;
      const draw = () => {
        if (!alive) return;
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.012;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          const alpha = p.o + Math.sin(p.pulse) * 0.06;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
          g.addColorStop(0, `rgba(200,16,46,${alpha})`);
          g.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });
        requestAnimationFrame(draw);
      };
      draw();
      stopParticles = () => {
        alive = false;
        window.removeEventListener("resize", resize);
      };
    }

    const hero = document.getElementById("hero-canvas");
    let stopHero = () => {};
    if (hero) {
      const ctx = hero.getContext("2d");
      let W;
      let H;
      let pts = [];
      const resize = () => {
        W = hero.width = hero.offsetWidth || window.innerWidth;
        H = hero.height = hero.offsetHeight || window.innerHeight;
        pts = Array.from({ length: 80 }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.4,
          o: Math.random() * 0.35 + 0.06,
          pulse: Math.random() * Math.PI * 2,
        }));
      };
      resize();
      window.addEventListener("resize", resize);
      let alive = true;
      const draw = () => {
        if (!alive) return;
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.015;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,16,46,${p.o + Math.sin(p.pulse) * 0.08})`;
          ctx.fill();
        });
        pts.forEach((p, i) => {
          for (let j = i + 1; j < pts.length; j += 1) {
            const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
            if (d < 140) {
              const op = 0.08 * (1 - d / 140);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(200,16,46,${op})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
        requestAnimationFrame(draw);
      };
      draw();
      stopHero = () => {
        alive = false;
        window.removeEventListener("resize", resize);
      };
    }

    const cards = Array.from(document.querySelectorAll(".card-item"));
    const onCard = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      e.currentTarget.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    cards.forEach((card) => card.addEventListener("mousemove", onCard));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      stopParticles();
      stopHero();
      cards.forEach((card) => card.removeEventListener("mousemove", onCard));
    };
  }, [pathname, isAdmin]);

  const isActive = (href) => pathname === href;

  if (isAdmin) return children;

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
      <div id="spotlight" />
      <div id="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div id="global-grid" />
      <div id="geo-lines">
        <div className="geo-line" />
        <div className="geo-line" />
        <div className="geo-line" />
        <div className="geo-vline" />
        <div className="geo-vline" />
      </div>
      <canvas id="global-particles" />

      <nav className={scrolled ? "scrolled" : ""} id="navbar">
        <Link href="/" className="nav-logo">Grow Plus <em>+</em></Link>
        <ul className="nav-links">
          <li><Link href="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
          <li><Link href="/about" className={isActive("/about") ? "active" : ""}>Who We Are</Link></li>
          <li><Link href="/why" className={isActive("/why") ? "active" : ""}>Why Different</Link></li>
          <li>
            <a href="#">Services ▾</a>
            <div className="nav-dropdown">
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href}><span className="dd-icon">{item.icon}</span>{item.label}</Link>
              ))}
            </div>
          </li>
          <li><Link href="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link></li>
          <li><Link href="/updates" className={isActive("/updates") ? "active" : ""}>Updates</Link></li>
          <li><Link href="/contact" className={isActive("/contact") ? "active" : ""}>Grow With Us</Link></li>
          <li><Link href="/landing" className={isActive("/landing") ? "active" : ""}>All Services</Link></li>
        </ul>
        <Link href="/contact" className="nav-cta">Get Started</Link>
        <button className={`hamburger${open ? " open" : ""}`} id="ham" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`} id="mob-menu">
        <Link href="/">Home</Link>
        <Link href="/about">Who We Are</Link>
        <Link href="/why">Why Different</Link>
        <Link href="/services">All Services</Link>
        {serviceLinks.map((item) => <Link key={item.href} href={item.href}>— {item.label}</Link>)}
        <Link href="/blog">Blog</Link>
        <Link href="/updates">New Updates</Link>
        <Link href="/contact">Grow With Us</Link>
        <Link href="/landing">All Services Landing</Link>
      </div>

      <main className="site-main">{children}</main>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Grow Plus <em>+</em></div>
            <p className="footer-desc">{site?.tagline || "India's most results-obsessed digital marketing agency."} We turn brands into growth machines through data-driven strategy and relentless execution.</p>
            <div className="footer-socials">
              <a className="social-link" href="#">f</a>
              <a className="social-link" href="#">in</a>
              <a className="social-link" href="#">Li</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">Who We Are</Link></li>
              <li><Link href="/why">Why Different</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/updates">New Updates</Link></li>
              <li><Link href="/contact">Grow With Us</Link></li>
              <li><Link href="/services">All Services</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              {serviceLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label.replace(" Marketing", "")}</Link></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={`tel:${site?.phone}`}>{site?.phone}</a></li>
              <li><a href={`mailto:${site?.email}`}>{site?.email}</a></li>
              <li>{site?.website}</li>
              <li>{site?.location}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 GrowPlus+. All rights reserved.</p>
          <p>Built to Grow →</p>
        </div>
      </footer>
    </>
  );
}
