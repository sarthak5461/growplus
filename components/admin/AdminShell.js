"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminFetch } from "../../lib/admin";
import { NAV } from "../../lib/adminFields";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    adminFetch("/api/auth/me")
      .then(() => setReady(true))
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  if (pathname === "/admin/login") return children;
  if (!ready) return <div className="admin-loading">Loading admin…</div>;

  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <Link href="/admin" className="admin-brand">GrowPlus <em>+</em> Admin</Link>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          className="admin-signout"
          onClick={async () => {
            await adminFetch("/api/auth/logout", { method: "POST" }).catch(() => ({}));
            router.push("/admin/login");
          }}
        >
          Sign out
        </button>
        <Link href="/" className="admin-view-site">View website</Link>
      </aside>
      <section className="admin-main">{children}</section>
    </div>
  );
}
