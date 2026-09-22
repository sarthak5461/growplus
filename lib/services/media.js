import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";

export async function listMedia() {
  const db = await tryGetDb();
  if (!db) return [];
  return db.collection(COLLECTIONS.media).find({}).sort({ createdAt: -1 }).toArray();
}

export async function createMedia(meta) {
  const db = await tryGetDb();
  const result = await db.collection(COLLECTIONS.media).insertOne({ ...meta, createdAt: new Date() });
  return { ...meta, _id: result.insertedId };
}

export async function deleteMedia(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.media).deleteOne({ _id: new ObjectId(id) });
}
