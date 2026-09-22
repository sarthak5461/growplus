"use client";

import Link from "next/link";

const fallbackServices = [
  { href: "/services/seo", label: "SEO" },
  { href: "/services/performance", label: "Performance" },
  { href: "/services/social", label: "Social Media" },
  { href: "/services/affiliate", label: "Affiliate" },
  { href: "/services/brand", label: "Brand" },
  { href: "/services/influencer", label: "Influencer" },
  { href: "/services/content", label: "Content" },
];

export default function Footer({ site, footer, services = [] }) {
  const serviceLinks = (footer?.services || services.map((item) => ({ href: item.href || `/services/${item.slug}`, label: item.short || item.title })) || fallbackServices);
  const socials = (footer?.socials || []).filter((item) => item.enabled !== false);
  const phone = footer?.phone || site?.phone;
  const email = footer?.email || site?.email;
  const website = footer?.website || site?.website;
  const location = footer?.location || site?.location;
  const description = footer?.description || site?.tagline || "India's most results-obsessed digital marketing agency.";

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">Grow Plus <em>+</em></div>
          <p className="footer-desc">{description} We turn brands into growth machines through data-driven strategy and relentless execution.</p>
          <div className="footer-socials">
            {(socials.length ? socials : [{ icon: "f" }, { icon: "in" }, { icon: "Li" }]).map((item) => (
              <a className="social-link" href={item.link || "#"} key={item.platform || item.icon}>{item.icon}</a>
            ))}
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
            {(serviceLinks.length ? serviceLinks : fallbackServices).map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href={`tel:${phone}`}>{phone}</a></li>
            <li><a href={`mailto:${email}`}>{email}</a></li>
            <li>{website}</li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 GrowPlus+. All rights reserved.</p>
        <p>Built to Grow →</p>
      </div>
    </footer>
  );
}
