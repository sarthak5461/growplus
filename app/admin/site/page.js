"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/admin";

const fields = ["name", "phone", "email", "website", "location", "tagline"];

export default function SiteSettingsPage() {
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch("/api/admin/site").then(setForm).catch((err) => setError(err.message));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await adminFetch("/api/admin/site", { method: "PUT", body: JSON.stringify(form) });
      setSaved("Saved");
      setTimeout(() => setSaved(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header"><h1>Site settings</h1></div>
      {error ? <p className="admin-error">{error}</p> : null}
      {saved ? <p className="admin-ok">{saved}</p> : null}
      <form className="admin-form" onSubmit={onSubmit}>
        {fields.map((key) => (
          <label className="admin-field" key={key}>
            <span>{key}</span>
            {key === "tagline" ? (
              <textarea value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            ) : (
              <input value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            )}
          </label>
        ))}
        <button className="admin-btn" type="submit">Save settings</button>
      </form>
    </div>
  );
}
