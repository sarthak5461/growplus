"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/admin";

export default function InboxPage() {
  const [leads, setLeads] = useState([]);
  const [subs, setSubs] = useState([]);

  async function load() {
    const [nextLeads, nextSubs] = await Promise.all([
      adminFetch("/api/admin/inbox/leads"),
      adminFetch("/api/admin/inbox/subscribers"),
    ]);
    setLeads(nextLeads);
    setSubs(nextSubs);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  return (
    <div>
      <div className="admin-header"><h1>Inbox</h1></div>
      <h2 style={{ margin: "0 0 1rem" }}>Leads</h2>
      {leads.map((lead) => (
        <div className="admin-row" key={lead.id}>
          <div>
            <strong>{lead.first_name} {lead.last_name} · {lead.email}</strong>
            <p>{lead.service} {lead.budget ? `· ${lead.budget}` : ""} {lead.company ? `· ${lead.company}` : ""}</p>
            <p>{lead.message}</p>
          </div>
          <button
            type="button"
            className="admin-btn danger"
            onClick={async () => {
              await adminFetch(`/api/admin/inbox/leads/${lead.id}`, { method: "DELETE" });
              await load();
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <h2 style={{ margin: "2rem 0 1rem" }}>Newsletter</h2>
      {subs.map((item) => (
        <div className="admin-row" key={item.id}>
          <strong>{item.email}</strong>
        </div>
      ))}
    </div>
  );
}
