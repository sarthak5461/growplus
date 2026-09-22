import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { listContacts, listSubscribers } from "@/lib/services/contacts";

export async function GET() {
  const { error } = await requireApiUser([PERMISSIONS.CONTENT_VIEW]);
  if (error) return error;
  const leads = await listContacts();
  return NextResponse.json(leads.map((item) => ({ ...item, id: String(item._id) })));
}

export { listSubscribers, PERMISSIONS };
