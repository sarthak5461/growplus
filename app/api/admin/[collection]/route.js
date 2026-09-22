import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { COLLECTION_HANDLERS } from "@/lib/admin/collections";

export async function GET(_request, { params }) {
  const { collection } = await params;
  const handler = COLLECTION_HANDLERS[collection];
  if (!handler) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { error } = await requireApiUser([handler.view]);
  if (error) return error;
  return NextResponse.json(await handler.list());
}

export async function POST(request, { params }) {
  const { collection } = await params;
  const handler = COLLECTION_HANDLERS[collection];
  if (!handler) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { error } = await requireApiUser([handler.permission]);
  if (error) return error;
  const body = await request.json().catch(() => ({}));
  const created = await handler.create(body);
  return NextResponse.json({ ...created, id: String(created._id) }, { status: 201 });
}
