"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/admin";

export default function MediaPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    const data = await adminFetch("/api/admin/media");
    setItems(data);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function onUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      await adminFetch("/api/admin/media", { method: "POST", body: form });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header"><h1>Media</h1></div>
      {error ? <p className="admin-error">{error}</p> : null}
      <label className="admin-field">
        <span>Upload file</span>
        <input type="file" onChange={onUpload} />
      </label>
      <div className="admin-list">
        {items.map((item) => (
          <div className="admin-row" key={item.id}>
            <div>
              <strong>{item.filename}</strong>
              <p>{item.url}</p>
            </div>
            <button
              type="button"
              className="admin-btn danger"
              onClick={async () => {
                await adminFetch(`/api/admin/media/${item.id}`, { method: "DELETE" });
                await load();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
