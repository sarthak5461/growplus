import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { deleteContact } from "@/lib/services/contacts";

export async function DELETE(_request, { params }) {
  const { error } = await requireApiUser([PERMISSIONS.CONTENT_EDIT]);
  if (error) return error;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await deleteContact(id);
  return NextResponse.json({ ok: true });
}
