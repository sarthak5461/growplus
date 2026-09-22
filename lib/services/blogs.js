import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";
import { isPublishable } from "../utils";
import { sanitizeRichText } from "../sanitize";

export async function listBlogs({ includeUnpublished = false } = {}) {
  const db = await tryGetDb();
  if (!db) {
    return fallbackPayload.blogPosts.map((post) => ({
      ...post,
      status: "published",
      publishedAt: post.date,
      excerpt: post.excerpt,
    }));
  }
  const docs = await db.collection(COLLECTIONS.blogs).find({}).sort({ publishedAt: -1 }).toArray();
  if (!docs.length) return fallbackPayload.blogPosts.map((post) => ({ ...post, status: "published" }));
  if (includeUnpublished) return docs;
  const now = new Date();
  return docs.filter((doc) => isPublishable(doc, now) || (!doc.status && doc.slug));
}

export async function getBlogBySlug(slug, { includeUnpublished = false } = {}) {
  const db = await tryGetDb();
  if (!db) return fallbackPayload.blogPosts.find((post) => post.slug === slug) || null;
  const doc = await db.collection(COLLECTIONS.blogs).findOne({ slug });
  if (!doc) return null;
  if (!includeUnpublished && !isPublishable(doc)) return null;
  return doc;
}

export async function createBlog(data) {
  const db = await tryGetDb();
  const doc = {
    ...data,
    content: sanitizeRichText(data.content || ""),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection(COLLECTIONS.blogs).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function updateBlog(id, data) {
  const db = await tryGetDb();
  const next = { ...data, updatedAt: new Date() };
  if (data.content) next.content = sanitizeRichText(data.content);
  await db.collection(COLLECTIONS.blogs).updateOne({ _id: new ObjectId(id) }, { $set: next });
}

export async function deleteBlog(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.blogs).deleteOne({ _id: new ObjectId(id) });
}
