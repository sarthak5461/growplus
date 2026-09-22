import Link from "next/link";
import FaqList from "../components/FaqList";
import Marquee from "../components/Marquee";
import NewsletterForm from "../components/NewsletterForm";
import { getSiteContent } from "../lib/cms";
import { getPath } from "../lib/utils";

export default async function HomePage() {
  const content = await getSiteContent();
  const { services, faqs, cases, testimonials, tools, partners, home } = content;
  const stats = home?.stats?.length
    ? home.stats
    : [
        { value: 500, unit: "+", label: "Brands Scaled" },
        { value: 5, unit: " yrs", label: "Experience" },
        { value: 98, unit: "%", label: "Client Retention" },
        { value: 40, unit: "+", label: "Awards Won" },
      ];

  return (
    <>
      <section className="parallax-hero">
        <div className="parallax-bg" id="para-bg">
          <canvas id="hero-canvas" className="parallax-bg-canvas" />
        </div>
        <div className="hero-scanline" />
        <div className="corner-deco tl" /><div className="corner-deco tr" /><div className="corner-deco bl" /><div className="corner-deco br" />
        <div className="hero-content">
          <div className="eyebrow">{getPath(home, "hero.eyebrow", "India's Elite Digital Agency · Since 2020")}</div>
          <h1 className="hero-h1">
            <span className="line"><span className="word">{getPath(home, "hero.titleLineOne", "We Make")}</span></span>
            <span className="line"><span className="word w2">{getPath(home, "hero.titleLineTwo", "Brands")}</span> <span className="word w3"><em>{getPath(home, "hero.titleAccent", "Grow")}</em></span></span>
            <span className="line"><span className="word w4">{getPath(home, "hero.titleLineThree", "Beyond")}</span> <span className="word w5">{getPath(home, "hero.titleLineFour", "Limits")}</span></span>
          </h1>
          <div className="btn-row">
            <Link className="btn-primary" href={getPath(home, "hero.primaryButtonLink", "/contact")}>{getPath(home, "hero.primaryButtonText", "Start Growing")} <span className="arr">→</span></Link>
            <Link className="btn-ghost" href={getPath(home, "hero.secondaryButtonLink", "/services")}>{getPath(home, "hero.secondaryButtonText", "Our Services")}</Link>
          </div>
          <p className="body-text" style={{ marginTop: "1.5rem" }}>{getPath(home, "hero.statsText", "500+ Brands Scaled · ₹50Cr+ Generated")}</p>
        </div>
        <div className="scroll-cue"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      <Marquee items={services.map((s) => s.short)} />

      <section className="section">
        <div className="stats-row reveal">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-num"><span data-count={stat.value}>0</span><span className="stat-unit">{stat.unit}</span></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="two-col">
          <div className="reveal-left">
            <div className="eyebrow">{getPath(home, "about.eyebrow", "Who We Are")}</div>
            <h2 className="section-title">{getPath(home, "about.title", "Digital Marketing Redefined").split(" ").slice(0, -1).join(" ")} <em>{getPath(home, "about.title", "Digital Marketing Redefined").split(" ").slice(-1)}</em></h2>
            <div className="red-line" />
            <p className="body-text">{getPath(home, "about.body", "GrowPlus+ is India's most results-obsessed digital marketing agency. For five years, we've been engineering growth systems that compound — not quick wins that fade.")}</p>
            <p className="body-text">{getPath(home, "about.bodyTwo", "Every strategy is built on data. Every campaign is built to scale. Every client is treated like a partner.")}</p>
            <div className="btn-row"><Link className="btn-ghost" href="/about">Our Story →</Link></div>
          </div>
          <div className="dash-card reveal-right">
            <p className="eyebrow">Growth Dashboard</p>
            <div className="dash-metric"><span>Avg. ROAS</span><strong>6.2 ×</strong></div>
            <p className="body-text">↑ +3.4× from avg</p>
            <div className="dash-metric" style={{ marginTop: "2rem" }}><span>Organic Traffic</span><strong>+312%</strong></div>
            <div className="dash-metric"><span>Conversions</span><strong>+189%</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="reveal">
          <div className="eyebrow">What We Do</div>
          <h2 className="section-title">Seven Services. <strong>One Vision.</strong></h2>
          <div className="btn-row"><Link className="card-link" href="/services">View All Services →</Link></div>
        </div>
        <div className="card-grid" style={{ marginTop: "3rem" }}>
          {services.slice(0, 6).map((service) => (
            <div className="card-item" key={service.slug}>
              <div className="card-number">{service.number}</div>
              <div className="card-icon-wrap">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link className="card-link" href={service.href || `/services/${service.slug}`}>Explore →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Ready to build a brand that <em>leads</em> its market?</h2>
        <Link className="btn-white" href={getPath(home, "cta.buttonLink", "/contact")}>{getPath(home, "cta.buttonText", "Get Your Free Strategy Session")}</Link>
      </section>

      <section className="section">
        <div className="reveal">
          <div className="eyebrow">Case Studies</div>
          <h2 className="section-title">Results That Speak <em>Loudest</em></h2>
        </div>
        <div style={{ marginTop: "3rem" }}>
          {cases.map((item) => (
            <div className="case-card reveal" key={item.title}>
              <div className="case-thumb">{item.emoji}</div>
              <div className="case-body">
                <div className="case-brand">{item.brand}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="case-metrics">
                  {(item.metrics || []).map((m) => (
                    <div key={m.label}><div className="case-metric-val">{m.value}</div><div className="case-metric-label">{m.label}</div></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-sm">
        <div className="eyebrow">{getPath(home, "trustedClients.eyebrow", "Trusted By")}</div>
        <p className="body-text">{getPath(home, "trustedClients.body", "Brands across industries trust GrowPlus+ to drive their digital growth.")}</p>
        <div className="partners-row">
          {(getPath(home, "trustedClients.logos", null)?.map((item) => item.name || item) || partners).map((name) => <div className="partner-logo" key={name}>{name}</div>)}
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">Client Results</div>
        <h2 className="section-title">Real Brands. <em>Real Results.</em></h2>
        <div className="testi-grid" style={{ marginTop: "3rem" }}>
          {testimonials.map((item) => (
            <div className="testi-card reveal" key={item.name}>
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
        <div className="eyebrow">Our Tech Stack</div>
        <h2 className="section-title">Powered by the <em>Best Tools</em></h2>
        <div className="tools-grid" style={{ marginTop: "3rem" }}>
          {tools.map((tool) => (
            <div className="tool-item" key={tool.name}>
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{tool.name}</div>
              <div className="tool-desc">{tool.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2 className="section-title">Questions <em>Answered</em></h2>
            <p className="body-text">Everything you need to know before working with us.</p>
            <div className="btn-row"><Link className="btn-ghost" href="/contact">Ask Us Anything →</Link></div>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="newsletter-wrap">
          <div className="newsletter-text">
            <div className="eyebrow">Stay Ahead</div>
            <h2 className="section-title" style={{ fontSize: "2.6rem" }}>Get Weekly Growth Insights</h2>
            <p className="body-text">SEO updates, campaign strategies, and industry trends — straight to your inbox every Tuesday.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
