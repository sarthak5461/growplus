import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";

export async function createContact(data) {
  const db = await tryGetDb();
  if (!db) return { ok: true, stored: false };
  await db.collection(COLLECTIONS.contacts).insertOne({ ...data, createdAt: new Date() });
  return { ok: true, stored: true };
}

export async function listContacts() {
  const db = await tryGetDb();
  if (!db) return [];
  return db.collection(COLLECTIONS.contacts).find({}).sort({ createdAt: -1 }).toArray();
}

export async function deleteContact(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.contacts).deleteOne({ _id: new ObjectId(id) });
}

export async function addSubscriber(email) {
  const db = await tryGetDb();
  if (!db) return { ok: true };
  await db.collection(COLLECTIONS.newsletter).updateOne(
    { email: email.toLowerCase() },
    { $setOnInsert: { email: email.toLowerCase(), createdAt: new Date() } },
    { upsert: true },
  );
  return { ok: true };
}

export async function listSubscribers() {
  const db = await tryGetDb();
  if (!db) return [];
  return db.collection(COLLECTIONS.newsletter).find({}).sort({ createdAt: -1 }).toArray();
}
