import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/services/contacts";
import { enforceRateLimit, rateLimitResponse } from "@/lib/security/rate-limit";
import { isEmail } from "@/lib/validators";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const limited = await enforceRateLimit(`newsletter:${ip}`, 10, 60 * 60 * 1000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);
  const body = await request.json().catch(() => ({}));
  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  await addSubscriber(body.email);
  return NextResponse.json({ ok: true });
}
