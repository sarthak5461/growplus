"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "../../lib/admin";
import { NAV } from "../../lib/adminFields";

export default function AdminHomePage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminFetch("/api/admin/stats").then(setStats).catch(() => setStats({}));
  }, []);

  return (
    <div>
      <div className="admin-header"><h1>Overview</h1></div>
      <p className="body-text" style={{ marginBottom: "1.5rem" }}>Edit any section of the public website. Changes show up on the Next.js site after refresh.</p>
      <div className="admin-grid">
        {NAV.filter((item) => item.href !== "/admin").map((item) => {
          const key = item.href.replace("/admin/", "");
          const display = key === "inbox"
            ? (stats?.leads ?? 0) + (stats?.subscribers ?? 0)
            : key === "site" ? "✎" : (stats?.[key] ?? "→");
          return (
            <Link href={item.href} className="admin-stat" key={item.href}>
              <strong>{display}</strong>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
