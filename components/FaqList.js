"use client";

import { useState } from "react";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className={`faq-item${open === index ? " open" : ""}`} key={item.q}>
          <button className="faq-q" type="button" onClick={() => setOpen(open === index ? null : index)}>
            <h4>{item.q}</h4>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-a" style={{ maxHeight: open === index ? "240px" : "0" }}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
