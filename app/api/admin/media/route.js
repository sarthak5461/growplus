import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { listMedia, createMedia } from "@/lib/services/media";
import { saveUpload } from "@/lib/storage/media";
import { enforceRateLimit, rateLimitResponse } from "@/lib/security/rate-limit";

export async function GET() {
  const { error } = await requireApiUser([PERMISSIONS.MEDIA_VIEW]);
  if (error) return error;
  const items = await listMedia();
  return NextResponse.json(items.map((item) => ({ ...item, id: String(item._id) })));
}

export async function POST(request) {
  const { error } = await requireApiUser([PERMISSIONS.MEDIA_UPLOAD]);
  if (error) return error;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const limited = await enforceRateLimit(`media:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) return rateLimitResponse(limited.retryAfter);
  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }
  const meta = await saveUpload(file);
  const saved = await createMedia(meta);
  return NextResponse.json({ ...saved, id: String(saved._id) });
}
