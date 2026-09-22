import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { listSubscribers } from "@/lib/services/contacts";

export async function GET() {
  const { error } = await requireApiUser([PERMISSIONS.CONTENT_VIEW]);
  if (error) return error;
  const items = await listSubscribers();
  return NextResponse.json(items.map((item) => ({ ...item, id: String(item._id) })));
}
