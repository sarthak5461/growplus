import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "./cookie";
import { verifyAccessToken } from "./jwt";
import { requirePermissions } from "./rbac";

export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function requireApiUser(permissions = []) {
  const user = await getSessionUser();
  if (!user) {
    return { user: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (permissions.length) {
    const forbidden = requirePermissions(user, permissions);
    if (forbidden) return { user, error: forbidden };
  }
  return { user, error: null };
}
