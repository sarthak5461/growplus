export function getPath(obj, key, fallback) {
  if (!key) return obj ?? fallback;
  const parts = String(key).split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return fallback;
    current = current[part];
  }
  return current === undefined ? fallback : current;
}

export function setPath(obj, key, value) {
  const parts = String(key).split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    if (!current[part] || typeof current[part] !== "object" || Array.isArray(current[part])) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
  return obj;
}

export function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "GP";
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

export function normalizeUrl(value = "") {
  const raw = String(value).trim();
  if (!raw || raw === "#") return "#";
  if (/^https?:\/\//i.test(raw) || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("/")) {
    return raw;
  }
  return `https://${raw.replace(/^\/+/, "")}`;
}

export function isPublishable(doc, now = new Date()) {
  if (!doc) return false;
  if (doc.status === "published") return true;
  if (doc.status === "scheduled" && doc.publishedAt && new Date(doc.publishedAt) <= now) return true;
  return false;
}
