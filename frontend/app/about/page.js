import Link from "next/link";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Who We Are | GrowPlus+" };

export default async function AboutPage() {
  const { team, awards } = await getSiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">5yrs</div>
        <h1 className="section-title">Who We Are</h1>
        <p className="body-text" style={{ maxWidth: "62ch", marginTop: "1.5rem" }}>
          Founded in 2020, GrowPlus+ was born from a conviction that brands deserve better than generic marketing. We set out to build India&apos;s most accountable, most data-driven, most results-focused digital agency.
        </p>
      </section>
      <section className="section">
        <div className="eyebrow">Our Story</div>
        <h2 className="section-title">Five Years. <em>Infinite Impact.</em></h2>
        <p className="body-text" style={{ maxWidth: "70ch", margin: "1.5rem 0" }}>
          We started as a small team of passionate marketers who were frustrated by the industry&apos;s obsession with vanity metrics. Likes don&apos;t pay salaries. Impressions don&apos;t grow businesses. So we built a different kind of agency — one obsessed with revenue, ROAS, and real measurable outcomes.
        </p>
        <div className="why-grid">
          <div className="why-card"><div className="why-num">01</div><h3>Excellence First</h3><p>We set the bar high for every deliverable and never settle for average results.</p></div>
          <div className="why-card"><div className="why-num">02</div><h3>Innovation Always</h3><p>Testing tomorrow&apos;s strategies before they become today&apos;s best practices.</p></div>
          <div className="why-card"><div className="why-num">03</div><h3>Partnership Mindset</h3><p>Your success is our success. We&apos;re invested in your growth, not just your budget.</p></div>
          <div className="why-card"><div className="why-num">04</div><h3>Radical Transparency</h3><p>Real-time dashboards. No fluff reports. No smoke and mirrors. Ever.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">Awards & Recognition</div>
        <h2 className="section-title">Recognized by the <em>Industry</em></h2>
        <div className="awards-row" style={{ marginTop: "3rem" }}>
          {awards.map((award) => (
            <div className="award-card" key={award.title}>
              <div className="award-icon">{award.icon}</div>
              <div className="award-title">{award.title}</div>
              <div className="award-org">{award.org}</div>
              <div className="award-year">{award.year}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">The Team</div>
        <h2 className="section-title">The Minds Behind the <em>Magic</em></h2>
        <div className="team-grid" style={{ marginTop: "3rem" }}>
          {team.map((person) => (
            <div className="team-card" key={person.name}>
              <div className="testi-avatar" style={{ width: 64, height: 64, fontSize: "1.6rem", marginBottom: "1.25rem" }}>{person.initial}</div>
              <h3>{person.name}</h3>
              <p className="update-cat">{person.role}</p>
              <p className="body-text">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-band">
        <h2>Ready to work with the best?</h2>
        <Link className="btn-white" href="/contact">Let&apos;s Talk Growth</Link>
      </section>
    </>
  );
}
