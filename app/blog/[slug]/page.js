import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "../../../lib/cms";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { blogPosts } = await getSiteContent();
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} | GrowPlus+` : "Article | GrowPlus+" };
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const { blogPosts } = await getSiteContent();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <article className="article">
      <div className="blog-cat-pill">{post.category}</div>
      <h1 className="section-title">{post.title}</h1>
      <p className="body-text">{post.author} · {post.date} · {post.read}</p>
      <div className="red-line" />
      <p className="body-text">{post.excerpt}</p>
      <p className="body-text">{post.body}</p>
      <div className="btn-row">
        <Link className="btn-ghost" href="/blog">← All articles</Link>
        <Link className="btn-primary" href="/contact">Work with us →</Link>
      </div>
    </article>
  );
}
