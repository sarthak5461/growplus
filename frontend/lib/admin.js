const API = process.env.NEXT_PUBLIC_CMS_URL || "http://127.0.0.1:4000";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("growplus_admin_token") || "";
}

export function setToken(token) {
  localStorage.setItem("growplus_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("growplus_admin_token");
}

export async function adminFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined" && !window.location.pathname.endsWith("/login")) {
      window.location.href = "/admin/login";
    }
    throw new Error("Sign in required");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
