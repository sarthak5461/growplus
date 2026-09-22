import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { loadSchemaPage, saveSchemaEntries } from "@/lib/admin/collections";

export async function GET(request) {
  const { error } = await requireApiUser([PERMISSIONS.CONTENT_VIEW]);
  if (error) return error;
  const page = request.nextUrl.searchParams.get("page") || "home";
  const data = await loadSchemaPage(page);
  if (!data) return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request) {
  const { error } = await requireApiUser([PERMISSIONS.CONTENT_EDIT]);
  if (error) return error;
  const body = await request.json().catch(() => ({}));
  await saveSchemaEntries(body.entries || body);
  return NextResponse.json({ ok: true });
}
