import { fallbackPayload } from "./data";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://127.0.0.1:8000";

async function cmsGet(path) {
  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getSiteContent() {
  const data = await cmsGet("/api/content/");
  if (!data || !Array.isArray(data.services) || data.services.length === 0) {
    return fallbackPayload;
  }
  return {
    ...fallbackPayload,
    ...data,
    site: { ...fallbackPayload.site, ...(data.site || {}) },
  };
}

export async function submitLead(payload) {
  const res = await fetch(`${CMS_URL}/api/leads/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Could not submit");
  return res.json();
}

export async function submitNewsletter(email) {
  const res = await fetch(`${CMS_URL}/api/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Could not subscribe");
  return res.json();
}
