import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { getContentMap, upsertContentMap } from "@/lib/services/content";

export async function GET() {
  const { error } = await requireApiUser([PERMISSIONS.SETTINGS_VIEW]);
  if (error) return error;
  const map = await getContentMap("site");
  return NextResponse.json(map || {});
}

export async function PUT(request) {
  const { error } = await requireApiUser([PERMISSIONS.SETTINGS_EDIT]);
  if (error) return error;
  const body = await request.json().catch(() => ({}));
  const entries = {};
  Object.entries(body).forEach(([key, value]) => {
    entries[`site.${key}`] = value;
  });
  await upsertContentMap(entries);
  return NextResponse.json({ ok: true });
}
