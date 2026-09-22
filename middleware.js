import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "growplus_token";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  if (!token || !process.env.AUTH_SECRET) {
    return NextResponse.redirect(loginUrl);
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
