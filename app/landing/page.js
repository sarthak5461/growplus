import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import Marquee from "../../components/Marquee";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "All Services | GrowPlus+" };

export default async function LandingPage() {
  const { services, process, testimonials } = await getSiteContent();
  return (
    <>
      <section className="lp-hero">
        <div className="lp-hero-left">
          <div className="eyebrow">India&apos;s Elite Growth Partner · Since 2020</div>
          <h1 className="hero-h1" style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}>
            <span className="line"><span className="word">Every</span></span>
            <span className="line"><span className="word w2">Service You</span></span>
            <span className="line"><span className="word w3"><em>Need.</em></span></span>
          </h1>
          <p className="body-text" style={{ maxWidth: "46ch", margin: "1.5rem 0" }}>
            7 specialized digital marketing services. One integrated strategy. Built to dominate your market.
          </p>
          <div className="pill-row">
            {services.map((s) => <span className="pill" key={s.slug}>{s.icon} {s.short}</span>)}
          </div>
        </div>
        <div className="lp-hero-right">
          <div>
            <div className="svc-tag">🎁 FREE Growth Audit — Limited Spots</div>
            <h3 style={{ margin: "1rem 0" }}>Claim Your Free Audit</h3>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>No commitment. 100% actionable insights.</p>
            <ContactForm compact source="landing-audit" success="Booked! Your audit arrives within 48 hours." />
          </div>
        </div>
      </section>
      <Marquee items={services.map((s) => s.short)} />
      <section className="section">
        <div className="eyebrow">All Services</div>
        <h2 className="section-title">Everything You Need to <em>Dominate Online</em></h2>
        <div className="card-grid" style={{ marginTop: "3rem" }}>
          {services.map((service) => (
            <div className="card-item" key={service.slug}>
              <div className="card-number">{service.number}</div>
              <div className="card-icon-wrap">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link className="card-link" href={`/services/${service.slug}`}>Explore →</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">How It Works</div>
        <h2 className="section-title">From Day 1 to <em>Market Leader</em></h2>
        <div style={{ marginTop: "2rem" }}>
          {process.map((step) => (
            <div className="process-item" key={step.num}>
              <div className="process-num">{step.num}</div>
              <div className="process-content"><h4>{step.title}</h4><p>{step.body}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">Client Results</div>
        <h2 className="section-title">They Grew. <em>You&apos;re Next.</em></h2>
        <div className="testi-grid" style={{ marginTop: "3rem" }}>
          {testimonials.map((item) => (
            <div className="testi-card" key={item.name}>
              <div className="stars">★★★★★</div>
              <p className="testi-text">&ldquo;{item.quote}&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">{item.initial}</div>
                <div><div className="testi-name">{item.name}</div><div className="testi-role">{item.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="two-col">
          <div>
            <div className="eyebrow">Take Action Now</div>
            <h2 className="section-title">Your Competition Is Already <em>Here</em></h2>
            <p className="body-text">Don&apos;t let them get further ahead. Book your free session now.</p>
          </div>
          <ContactForm source="landing-call" success="Confirmed! Our team calls within 2 business hours." />
        </div>
      </section>
    </>
  );
}
