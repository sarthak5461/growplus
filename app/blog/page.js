import Link from "next/link";
import BlogGrid from "../../components/BlogGrid";
import NewsletterForm from "../../components/NewsletterForm";
import { getSiteContent } from "../../lib/cms";

export const metadata = { title: "Blog | GrowPlus+" };

export default async function BlogPage() {
  const { blogPosts } = await getSiteContent();
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  return (
    <>
      <section className="page-hero">
        <div className="blog-hero-tag">📝 Knowledge Hub</div>
        <h1 className="section-title">Insights That Drive <em>Growth</em></h1>
        <p className="body-text" style={{ maxWidth: "62ch", marginTop: "1.5rem" }}>
          Expert strategies, industry deep-dives, and real campaign learnings from the GrowPlus+ team.
        </p>
      </section>
      <section className="section">
        <Link href={`/blog/${featured.slug}`} className="blog-featured">
          <div className="blog-featured-thumb">{featured.icon}</div>
          <div className="blog-featured-body">
            <span className="blog-cat-pill">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="blog-meta">
              <div className="blog-author-av">{featured.author[0]}</div>
              <span>{featured.author} · {featured.date} · {featured.read}</span>
            </div>
            <span className="read-link">Read Full Article →</span>
          </div>
        </Link>
        <BlogGrid posts={blogPosts} />
      </section>
      <section className="section">
        <div className="newsletter-wrap">
          <div className="newsletter-text">
            <div className="eyebrow">Never Miss an Insight</div>
            <h2 className="section-title" style={{ fontSize: "2.4rem" }}>Join 8,000+ Marketers</h2>
            <p className="body-text">Get our best articles and case studies every Tuesday.</p>
          </div>
          <NewsletterForm label="Subscribe Free" />
        </div>
      </section>
      <section className="cta-band">
        <h2>Ready to put these insights to work?</h2>
        <Link className="btn-white" href="/contact">Get a Free Strategy Session</Link>
      </section>
    </>
  );
}
