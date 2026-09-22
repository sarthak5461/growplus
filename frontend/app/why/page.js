import Link from "next/link";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Why We're Different | GrowPlus+" };

export default async function WhyPage() {
  const { whyPoints } = await getSiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Why GrowPlus+</div>
        <h1 className="section-title">We&apos;re Not Like Every Other <em>Agency</em></h1>
        <p className="body-text" style={{ maxWidth: "62ch", marginTop: "1.5rem" }}>
          Most agencies over-promise and under-deliver. We do the opposite. Here&apos;s what makes us genuinely different — not in marketing copy, but in practice.
        </p>
      </section>
      <section className="section">
        <div className="why-grid">
          {whyPoints.map((item) => (
            <div className="why-card" key={item.num}>
              <div className="why-num">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">The Difference</div>
        <h2 className="section-title">Them vs. <em>Us</em></h2>
        <div className="vs-wrap" style={{ marginTop: "3rem" }}>
          <div className="vs-col">
            <h3>Typical Agency</h3>
            <ul>
              <li>✗ Vague monthly reports</li>
              <li>✗ Junior account managers</li>
              <li>✗ Cookie-cutter strategies</li>
              <li>✗ Long onboarding delays</li>
              <li>✗ No performance guarantees</li>
            </ul>
          </div>
          <div className="vs-badge">VS</div>
          <div className="vs-col">
            <h3>GrowPlus+</h3>
            <ul>
              <li>✓ Live real-time dashboards</li>
              <li>✓ Dedicated senior team</li>
              <li>✓ Custom growth strategies</li>
              <li>✓ 48-hour campaign launch</li>
              <li>✓ Results or we work free</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="cta-band">
        <h2>Experience the GrowPlus+ difference today.</h2>
        <Link className="btn-white" href="/contact">Start Your Journey</Link>
      </section>
    </>
  );
}
