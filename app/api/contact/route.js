import { NextResponse } from "next/server";
import { createContact } from "@/lib/services/contacts";
import { enforceRateLimit, rateLimitResponse } from "@/lib/security/rate-limit";
import { isEmail, requireFields } from "@/lib/validators";
import { sendMail } from "@/lib/email";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const limited = await enforceRateLimit(`contact:${ip}`, 6, 60 * 60 * 1000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  const body = await request.json().catch(() => ({}));
  const missing = requireFields(body, ["email"]);
  if (missing || !isEmail(body.email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  await createContact(body);
  await sendMail({
    to: process.env.CONTACT_TO_EMAIL || "Info@growplused.com",
    subject: "New GrowPlus+ enquiry",
    text: JSON.stringify(body),
  });
  return NextResponse.json({ ok: true });
}
