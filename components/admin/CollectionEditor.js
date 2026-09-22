"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../lib/admin";
import { FIELDS } from "../../lib/adminFields";

function emptyFromFields(fields) {
  const next = {};
  fields.forEach((field) => {
    if (field.type === "checkbox") next[field.key] = field.key === "enabled" || field.key === "featured" ? true : false;
    else if (field.type === "tags") next[field.key] = [];
    else if (field.type === "json") next[field.key] = [];
    else next[field.key] = "";
  });
  return next;
}

function readValue(item, field) {
  const value = item[field.key];
  if (field.type === "tags") return Array.isArray(value) ? value.join(", ") : value || "";
  if (field.type === "json") return JSON.stringify(value || [], null, 2);
  if (field.type === "checkbox") return Boolean(value);
  return value ?? "";
}

function writeValue(field, raw) {
  if (field.type === "tags") return raw.split(",").map((part) => part.trim()).filter(Boolean);
  if (field.type === "json") return JSON.parse(raw || "[]");
  if (field.type === "checkbox") return Boolean(raw);
  return raw;
}

export default function CollectionEditor({ collection, title }) {
  const fields = FIELDS[collection] || [];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyFromFields(fields));
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  async function load() {
    const data = await adminFetch(`/api/admin/${collection}`);
    setItems(data);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [collection]);

  function startNew() {
    setEditing("new");
    setForm(emptyFromFields(fields));
    setError("");
  }

  function startEdit(item) {
    setEditing(item.id || item._id);
    const next = {};
    fields.forEach((field) => {
      next[field.key] = readValue(item, field);
    });
    setForm(next);
    setError("");
  }

  async function onSave(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = {};
      fields.forEach((field) => {
        payload[field.key] = writeValue(field, form[field.key]);
      });
      if (editing === "new") {
        await adminFetch(`/api/admin/${collection}`, { method: "POST", body: JSON.stringify(payload) });
      } else {
        await adminFetch(`/api/admin/${collection}/${editing}`, { method: "PUT", body: JSON.stringify(payload) });
      }
      setSaved("Saved");
      setTimeout(() => setSaved(""), 2000);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function onDelete(id) {
    if (!confirm("Delete this item?")) return;
    await adminFetch(`/api/admin/${collection}/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="admin-header">
        <h1>{title}</h1>
        <button type="button" className="admin-btn" onClick={startNew}>Add new</button>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      {saved ? <p className="admin-ok">{saved}</p> : null}

      {editing ? (
        <form className="admin-form" onSubmit={onSave}>
          {fields.map((field) => (
            <label key={field.key} className="admin-field">
              <span>{field.label}</span>
              {field.type === "textarea" || field.type === "json" ? (
                <textarea
                  rows={field.type === "json" ? 8 : 5}
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={Boolean(form[field.key])}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                />
              ) : (
                <input
                  value={form[field.key] || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                />
              )}
            </label>
          ))}
          <div className="admin-actions">
            <button type="submit" className="admin-btn">Save</button>
            <button type="button" className="admin-btn ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <div className="admin-list">
        {items.map((item) => (
          <div className="admin-row" key={item.id || item._id || item.slug || item.title}>
            <div>
              <strong>{item.title || item.name || item.q || item.slug || `#${item.id}`}</strong>
              <p>{item.summary || item.excerpt || item.role || item.a || item.desc || item.body || ""}</p>
            </div>
            <div className="admin-actions">
              <button type="button" className="admin-btn ghost" onClick={() => startEdit(item)}>Edit</button>
              <button type="button" className="admin-btn danger" onClick={() => onDelete(item.id || item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
