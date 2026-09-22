import NewsletterForm from "../../components/NewsletterForm";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "New Updates | GrowPlus+" };

export default async function UpdatesPage() {
  const { updates } = await getSiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">New Updates</div>
        <h1 className="section-title">What&apos;s Happening at <em>GrowPlus+</em></h1>
        <p className="body-text" style={{ maxWidth: "62ch", marginTop: "1.5rem" }}>
          Industry insights, agency news, and marketing tips from our team of growth experts.
        </p>
      </section>
      <section className="section">
        <div className="update-grid">
          {updates.map((item) => (
            <div className="update-card" key={item.slug}>
              <div className={`update-thumb ${item.thumb}`}>{item.icon}</div>
              <div className="update-body">
                <div className="update-cat">{item.cat}</div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div className="update-date">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="newsletter-wrap">
          <div className="newsletter-text">
            <div className="eyebrow">Stay Updated</div>
            <h2 className="section-title" style={{ fontSize: "2.4rem" }}>Get Updates First</h2>
            <p className="body-text">Be the first to know about industry changes, agency news, and new strategies.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
