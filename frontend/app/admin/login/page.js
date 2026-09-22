"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch, setToken } from "../../../lib/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await adminFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setToken(data.token);
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <h1>GrowPlus+ Admin</h1>
        <p className="body-text" style={{ marginBottom: "1.25rem" }}>Sign in to edit website content.</p>
        {error ? <p className="admin-error">{error}</p> : null}
        <label className="admin-field"><span>Username</span><input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label className="admin-field"><span>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="admin-btn" type="submit">Sign in</button>
      </form>
    </div>
  );
}
