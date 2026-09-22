import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";
import { isPublishable } from "../utils";

export async function listUpdates({ includeUnpublished = false } = {}) {
  const db = await tryGetDb();
  if (!db) return fallbackPayload.updates.map((item) => ({ ...item, status: "published", publishedAt: item.date }));
  const docs = await db.collection(COLLECTIONS.updates).find({}).sort({ publishedAt: -1 }).toArray();
  if (!docs.length) return fallbackPayload.updates.map((item) => ({ ...item, status: "published" }));
  if (includeUnpublished) return docs;
  return docs.filter((doc) => isPublishable(doc) || !doc.status);
}

export async function getUpdateBySlug(slug) {
  const list = await listUpdates();
  return list.find((item) => item.slug === slug) || null;
}

export async function createUpdate(data) {
  const db = await tryGetDb();
  const result = await db.collection(COLLECTIONS.updates).insertOne({ ...data, createdAt: new Date() });
  return { ...data, _id: result.insertedId };
}

export async function updateUpdate(id, data) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.updates).updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
}

export async function deleteUpdate(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.updates).deleteOne({ _id: new ObjectId(id) });
}
