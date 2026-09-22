import { COLLECTIONS, tryGetDb } from "../db";

export async function enforceRateLimit(key, limit, windowMs) {
  const db = await tryGetDb();
  if (!db) return { ok: true, remaining: limit };
  const now = Date.now();
  const windowStart = now - windowMs;
  const col = db.collection(COLLECTIONS.rateLimits);
  await col.deleteMany({ key, createdAt: { $lt: new Date(windowStart) } });
  const count = await col.countDocuments({ key, createdAt: { $gte: new Date(windowStart) } });
  if (count >= limit) {
    const retryAfter = Math.ceil(windowMs / 1000);
    return { ok: false, retryAfter };
  }
  await col.insertOne({ key, createdAt: new Date() });
  return { ok: true, remaining: limit - count - 1 };
}

export function rateLimitResponse(retryAfter) {
  return Response.json(
    { error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
