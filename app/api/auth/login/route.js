import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, cookieOptions } from "@/lib/auth/cookie";
import { createAccessToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { findUserByEmail } from "@/lib/services/users";
import { enforceRateLimit, rateLimitResponse } from "@/lib/security/rate-limit";

function clientKey(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

export async function POST(request) {
  const limited = await enforceRateLimit(`login:${clientKey(request)}`, 8, 15 * 60 * 1000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || body.username || "").trim().toLowerCase();
  const password = String(body.password || "");
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await createAccessToken(user);
  const response = NextResponse.json({
    ok: true,
    user: { name: user.name, email: user.email, role: user.role },
  });
  response.cookies.set(COOKIE_NAME, token, cookieOptions());
  return response;
}

export async function DELETE() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
  return response;
}
