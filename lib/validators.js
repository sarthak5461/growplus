export function requireFields(payload, keys) {
  for (const key of keys) {
    if (payload[key] == null || String(payload[key]).trim() === "") {
      return `${key} is required`;
    }
  }
  return null;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}
