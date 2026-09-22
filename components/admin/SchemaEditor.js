"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../lib/admin";

export default function SchemaEditor({ page, title }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    adminFetch(`/api/admin/content?page=${page}`)
      .then((data) => {
        setFields(data.schema.fields);
        setValues(data.values);
      })
      .catch((err) => setError(err.message));
  }, [page]);

  function renderValue(field) {
    const value = values[field.key];
    if (field.type === "list") return JSON.stringify(value || [], null, 2);
    if (field.type === "boolean") return Boolean(value);
    return value ?? "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const entries = {};
      fields.forEach((field) => {
        const raw = values[field.key];
        if (field.type === "list") entries[field.key] = typeof raw === "string" ? JSON.parse(raw || "[]") : raw;
        else if (field.type === "number") entries[field.key] = Number(raw);
        else entries[field.key] = raw;
      });
      await adminFetch("/api/admin/content", { method: "PUT", body: JSON.stringify({ entries }) });
      setSaved("Saved");
      setTimeout(() => setSaved(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header"><h1>{title}</h1></div>
      {error ? <p className="admin-error">{error}</p> : null}
      {saved ? <p className="admin-ok">{saved}</p> : null}
      <form className="admin-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label className="admin-field" key={field.key}>
            <span>{field.label}</span>
            {field.type === "textarea" || field.type === "list" ? (
              <textarea
                rows={field.type === "list" ? 10 : 5}
                value={typeof values[field.key] === "object" ? JSON.stringify(values[field.key] || [], null, 2) : (values[field.key] || "")}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              />
            ) : field.type === "boolean" ? (
              <input
                type="checkbox"
                checked={Boolean(values[field.key])}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.checked })}
              />
            ) : (
              <input
                value={renderValue(field)}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              />
            )}
          </label>
        ))}
        <button className="admin-btn" type="submit">Save</button>
      </form>
    </div>
  );
}
