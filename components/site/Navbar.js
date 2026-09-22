"use client";

import Link from "next/link";

const fallbackServices = [
  { href: "/services/seo", icon: "🔍", label: "SEO" },
  { href: "/services/performance", icon: "⚡", label: "Performance Marketing" },
  { href: "/services/social", icon: "📱", label: "Social Media Marketing" },
  { href: "/services/affiliate", icon: "🔗", label: "Affiliate Marketing" },
  { href: "/services/brand", icon: "🌐", label: "Brand Marketing" },
  { href: "/services/influencer", icon: "🤝", label: "Influencer Marketing" },
  { href: "/services/content", icon: "✍️", label: "Content Marketing" },
];

const fallbackNav = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "Why Different", href: "/why" },
  { label: "Blog", href: "/blog" },
  { label: "Updates", href: "/updates" },
  { label: "Grow With Us", href: "/contact" },
  { label: "All Services", href: "/landing" },
];

export default function Navbar({ header, scrolled, open, setOpen, pathname }) {
  const serviceLinks = (header?.services || [])
    .filter((item) => item.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const navItems = (header?.nav || [])
    .filter((item) => item.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const services = serviceLinks.length ? serviceLinks : fallbackServices;
  const links = navItems.length ? navItems : fallbackNav;
  const beforeServices = links.filter((item) => !["/blog", "/updates", "/contact", "/landing"].includes(item.href));
  const afterServices = links.filter((item) => ["/blog", "/updates", "/contact", "/landing"].includes(item.href));
  const isActive = (href) => pathname === href;
  const ctaLabel = header?.cta?.label || "Get Started";
  const ctaHref = header?.cta?.href || "/contact";

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""} id="navbar">
        <Link href="/" className="nav-logo">Grow Plus <em>+</em></Link>
        <ul className="nav-links">
          {beforeServices.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link href={item.href} className={isActive(item.href) ? "active" : ""}>{item.label}</Link>
            </li>
          ))}
          <li>
            <a href="#">Services ▾</a>
            <div className="nav-dropdown">
              {services.map((item) => (
                <Link key={item.href} href={item.href}><span className="dd-icon">{item.icon}</span>{item.label}</Link>
              ))}
            </div>
          </li>
          {afterServices.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link href={item.href} className={isActive(item.href) ? "active" : ""}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <Link href={ctaHref} className="nav-cta">{ctaLabel}</Link>
        <button className={`hamburger${open ? " open" : ""}`} id="ham" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`} id="mob-menu">
        {links.map((item) => <Link key={`m-${item.href}-${item.label}`} href={item.href}>{item.label}</Link>)}
        <Link href="/services">All Services</Link>
        {services.map((item) => <Link key={`ms-${item.href}`} href={item.href}>— {item.label}</Link>)}
      </div>
    </>
  );
}
