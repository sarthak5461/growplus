import { NextResponse } from "next/server";

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  CONTENT_EDITOR: "content_editor",
  REPORT_MANAGER: "report_manager",
};

export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard:view",
  CONTENT_VIEW: "content:view",
  CONTENT_EDIT: "content:edit",
  MEDIA_VIEW: "media:view",
  MEDIA_UPLOAD: "media:upload",
  SERVICES_VIEW: "services:view",
  SERVICES_EDIT: "services:edit",
  BLOG_VIEW: "blog:view",
  BLOG_EDIT: "blog:edit",
  TESTIMONIALS_VIEW: "testimonials:view",
  TESTIMONIALS_EDIT: "testimonials:edit",
  CASE_STUDIES_VIEW: "case_studies:view",
  CASE_STUDIES_EDIT: "case_studies:edit",
  FAQ_VIEW: "faq:view",
  FAQ_EDIT: "faq:edit",
  SETTINGS_VIEW: "settings:view",
  SETTINGS_EDIT: "settings:edit",
  USERS_VIEW: "users:view",
  USERS_EDIT: "users:edit",
};

const ALL = Object.values(PERMISSIONS);

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ALL,
  [ROLES.ADMIN]: ALL.filter((p) => p !== PERMISSIONS.USERS_EDIT),
  [ROLES.CONTENT_EDITOR]: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.SERVICES_VIEW,
    PERMISSIONS.SERVICES_EDIT,
    PERMISSIONS.BLOG_VIEW,
    PERMISSIONS.BLOG_EDIT,
    PERMISSIONS.TESTIMONIALS_VIEW,
    PERMISSIONS.TESTIMONIALS_EDIT,
    PERMISSIONS.CASE_STUDIES_VIEW,
    PERMISSIONS.CASE_STUDIES_EDIT,
    PERMISSIONS.FAQ_VIEW,
    PERMISSIONS.FAQ_EDIT,
  ],
  [ROLES.REPORT_MANAGER]: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CONTENT_VIEW,
  ],
};

export function hasPermission(user, permission) {
  if (!user) return false;
  return (ROLE_PERMISSIONS[user.role] || []).includes(permission);
}

export function requirePermissions(user, permissions) {
  const allowed = permissions.every((permission) => hasPermission(user, permission));
  if (allowed) return null;
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
