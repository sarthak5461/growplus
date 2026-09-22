import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/rbac";
import { COLLECTION_HANDLERS } from "@/lib/admin/collections";
import { listBlogs } from "@/lib/services/blogs";
import { listContacts, listSubscribers } from "@/lib/services/contacts";
import { listServices } from "@/lib/services/services";

export async function GET() {
  const { error } = await requireApiUser([PERMISSIONS.DASHBOARD_VIEW]);
  if (error) return error;
  const [services, blogs, leads, subscribers] = await Promise.all([
    listServices({ includeDisabled: true }),
    listBlogs({ includeUnpublished: true }),
    listContacts(),
    listSubscribers(),
  ]);
  return NextResponse.json({
    services: services.length,
    blogPosts: blogs.length,
    leads: leads.length,
    subscribers: subscribers.length,
    inbox: leads.length + subscribers.length,
  });
}

export { COLLECTION_HANDLERS };
