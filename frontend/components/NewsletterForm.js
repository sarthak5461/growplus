"use client";

import { useState } from "react";
import { submitNewsletter } from "../lib/cms";

export default function NewsletterForm({ label = "Subscribe" }) {
  const [ok, setOk] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    try {
      await submitNewsletter(email);
    } catch {
      // keep the local confirmation if CMS is offline
    }
    setOk(true);
    e.currentTarget.reset();
    setTimeout(() => setOk(false), 4000);
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Your email" required />
      <button type="submit">{ok ? "You're in" : label}</button>
    </form>
  );
}
