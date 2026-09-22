import ContactForm from "../../components/ContactForm";
import FaqList from "../../components/FaqList";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Grow With Us | GrowPlus+" };

export default async function ContactPage() {
  const { site, contactFaqs } = await getSiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="two-col">
          <div>
            <div className="eyebrow">Grow With Us</div>
            <h1 className="section-title">Let&apos;s Build Something <em>Extraordinary</em></h1>
            <p className="body-text" style={{ margin: "1.5rem 0 2rem" }}>
              Whether you&apos;re a startup ready to scale or an established brand seeking a breakthrough — we have the expertise and the track record to take you there.
            </p>
            <div className="contact-detail"><div className="contact-icon">📞</div><div><div className="contact-label">Call Us</div><div className="contact-value">{site.phone}</div></div></div>
            <div className="contact-detail"><div className="contact-icon">✉️</div><div><div className="contact-label">Email Us</div><div className="contact-value">{site.email}</div></div></div>
            <div className="contact-detail"><div className="contact-icon">📍</div><div><div className="contact-label">Based In</div><div className="contact-value">{site.location}</div></div></div>
            <div className="contact-detail"><div className="contact-icon">🌐</div><div><div className="contact-label">Website</div><div className="contact-value">{site.website}</div></div></div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Free Strategy Session</h3>
            <p className="body-text" style={{ marginBottom: "1.5rem" }}>Tell us about your brand. We&apos;ll craft a custom growth plan within 48 hours.</p>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="eyebrow">Before You Reach Out</div>
        <h2 className="section-title">Common <em>Questions</em></h2>
        <div style={{ marginTop: "2rem" }}><FaqList items={contactFaqs} /></div>
      </section>
    </>
  );
}
