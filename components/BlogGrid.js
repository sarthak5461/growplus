"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = [
  { id: "all", label: "All Posts" },
  { id: "seo", label: "SEO" },
  { id: "performance", label: "Performance" },
  { id: "social", label: "Social Media" },
  { id: "branding", label: "Branding" },
  { id: "content", label: "Content" },
  { id: "influencer", label: "Influencer" },
];

export default function BlogGrid({ posts }) {
  const [cat, setCat] = useState("all");
  const visible = useMemo(
    () => posts.filter((post) => !post.featured && (cat === "all" || post.cat === cat)),
    [posts, cat],
  );

  return (
    <>
      <div className="blog-filter">
        {filters.map((item) => (
          <button key={item.id} className={`filter-btn${cat === item.id ? " active" : ""}`} onClick={() => setCat(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="blog-grid" id="blog-grid">
        {visible.map((post) => (
          <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
            <div className={`blog-thumb ${post.thumb}`}>{post.icon}</div>
            <div className="blog-card-body">
              <div className="blog-cat-pill">{post.category}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-card-author">
                  <div className="blog-card-av">{post.author[0]}</div>
                  <span className="blog-card-name">{post.author}</span>
                </div>
                <span className="blog-card-date">{post.date} · {post.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
