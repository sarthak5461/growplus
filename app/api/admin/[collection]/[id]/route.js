import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireApiUser } from "@/lib/auth/auth";
import { COLLECTION_HANDLERS } from "@/lib/admin/collections";

export async function PUT(request, { params }) {
  const { collection, id } = await params;
  const handler = COLLECTION_HANDLERS[collection];
  if (!handler) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { error } = await requireApiUser([handler.permission]);
  if (error) return error;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await request.json().catch(() => ({}));
  await handler.update(id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request, { params }) {
  const { collection, id } = await params;
  const handler = COLLECTION_HANDLERS[collection];
  if (!handler) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { error } = await requireApiUser([handler.permission]);
  if (error) return error;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await handler.remove(id);
  return NextResponse.json({ ok: true });
}
