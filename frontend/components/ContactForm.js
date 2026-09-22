"use client";

import { useState } from "react";
import { submitLead } from "../lib/cms";

const services = [
  "Search Engine Optimization (SEO)",
  "Performance Marketing",
  "Social Media Marketing",
  "Brand Marketing",
  "Influencer Marketing",
  "Content Marketing",
  "Multiple Services / Full Package",
];

export default function ContactForm({ compact = false, source = "contact", success = "Received! We'll reach out within 24 hours with your custom growth plan." }) {
  const [ok, setOk] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.source = source;
    setPending(true);
    try {
      await submitLead(payload);
    } catch {
      // still show success locally if CMS is offline
    }
    setOk(true);
    setPending(false);
    e.currentTarget.reset();
    setTimeout(() => setOk(false), 6000);
  }

  if (compact) {
    return (
      <form className="form-wrap" onSubmit={onSubmit}>
        <div className="form-group"><label>Your Name</label><input name="first_name" required /></div>
        <div className="form-group"><label>Email</label><input name="email" type="email" required /></div>
        <div className="form-group"><label>Phone</label><input name="phone" /></div>
        <div className="form-group">
          <label>I Need Help With</label>
          <select name="service" required defaultValue="">
            <option value="" disabled>Choose a service...</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="form-submit" disabled={pending}>{pending ? "Sending..." : "Claim Free Audit →"}</button>
        <div className={`success-msg${ok ? " show" : ""}`}>{success}</div>
      </form>
    );
  }

  return (
    <form className="form-wrap" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group"><label>First Name</label><input name="first_name" required /></div>
        <div className="form-group"><label>Last Name</label><input name="last_name" /></div>
      </div>
      <div className="form-group"><label>Email Address</label><input name="email" type="email" required /></div>
      <div className="form-group"><label>Phone Number</label><input name="phone" /></div>
      <div className="form-group"><label>Company / Brand Name</label><input name="company" /></div>
      <div className="form-group">
        <label>Service Required</label>
        <select name="service" required defaultValue="">
          <option value="" disabled>Select a service...</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Monthly Budget</label>
        <select name="budget" defaultValue="">
          <option value="" disabled>Select budget range...</option>
          <option>₹25,000 – ₹50,000</option>
          <option>₹50,000 – ₹1,00,000</option>
          <option>₹1,00,000 – ₹5,00,000</option>
          <option>₹5,00,000+</option>
        </select>
      </div>
      <div className="form-group"><label>Tell Us Your Goals</label><textarea name="message" /></div>
      <button className="form-submit" disabled={pending}>{pending ? "Sending..." : "Request Free Strategy Session →"}</button>
      <div className={`success-msg${ok ? " show" : ""}`}>{success}</div>
    </form>
  );
}
