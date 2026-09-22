import Link from "next/link";
import Marquee from "./Marquee";

export default function ServiceDetail({ service }) {
  return (
    <>
      <section className="svc-hero">
        <div className="svc-hero-num">{service.number}</div>
        <div>
          <div className="svc-tag">Service {service.number} of 07</div>
          <h1>{service.title.split(" ").slice(0, -1).join(" ")} <em>{service.title.split(" ").slice(-1)}</em></h1>
          <p className="body-text" style={{ maxWidth: "58ch", margin: "1.5rem 0 2rem" }}>{service.description}</p>
          <div className="btn-row">
            <Link className="btn-primary" href="/contact">Get Started →</Link>
            <Link className="btn-ghost" href="/services">← All Services</Link>
          </div>
        </div>
      </section>
      <Marquee items={service.tags} />
      <section className="section">
        <div className="two-col">
          <div>
            <div className="eyebrow">Key Results</div>
            <h2 className="section-title">Proven <em>Performance</em></h2>
            <p className="body-text">Our approach is built for measurable outcomes. We set clear KPIs on day one and obsess over hitting them.</p>
            <div className="stat-num" style={{ marginTop: "2rem" }}>{service.resultValue}</div>
            <p className="body-text">{service.resultLabel}</p>
          </div>
          <div className="form-wrap">
            <h3>What&apos;s Included</h3>
            <ul className="include-list" style={{ marginTop: "1.5rem" }}>
              <li>✓ Dedicated senior specialist</li>
              <li>✓ Custom strategy built for your brand</li>
              <li>✓ 48-hour campaign launch</li>
              <li>✓ Real-time Looker Studio dashboard</li>
              <li>✓ Weekly reporting & monthly strategy calls</li>
              <li>✓ Performance guarantees</li>
            </ul>
            <div className="btn-row"><Link className="btn-primary" href="/contact">Get a Free Audit →</Link></div>
          </div>
        </div>
      </section>
      <section className="cta-band">
        <h2>Ready to grow your brand?</h2>
        <Link className="btn-white" href="/contact">Start Today</Link>
      </section>
    </>
  );
}
