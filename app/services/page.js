import Link from "next/link";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Our Services | GrowPlus+" };

export default async function ServicesPage() {
  const { services } = await getSiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">What We Do</div>
        <h1 className="section-title">Full-Spectrum Digital <em>Marketing</em></h1>
        <p className="body-text" style={{ maxWidth: "62ch", marginTop: "1.5rem" }}>
          Seven specialized services. One unified strategy. Built to dominate your market, compound your growth, and leave your competitors wondering what happened.
        </p>
      </section>
      <section className="section">
        <div className="card-grid">
          {services.map((service) => (
            <div className="card-item" key={service.slug}>
              <div className="card-number">{service.number}</div>
              <div className="card-icon-wrap">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <div className="pill-row">{service.tags.slice(0, 4).map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
              <Link className="card-link" href={`/services/${service.slug}`}>Explore →</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-band">
        <h2>Not sure which services you need?</h2>
        <Link className="btn-white" href="/contact">Get a Free Consultation</Link>
      </section>
    </>
  );
}
