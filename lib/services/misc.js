import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";

const FALLBACKS = {
  team: () => fallbackPayload.team,
  tools: () => fallbackPayload.tools,
  partners: () => fallbackPayload.partners.map((name) => ({ name })),
  awards: () => fallbackPayload.awards,
  whyPoints: () => fallbackPayload.whyPoints,
  process: () => fallbackPayload.process,
};

export async function listMisc(kind) {
  const db = await tryGetDb();
  if (!db) return FALLBACKS[kind] ? FALLBACKS[kind]() : [];
  const docs = await db.collection(COLLECTIONS.misc).find({ kind }).sort({ order: 1 }).toArray();
  if (docs.length) return docs;
  return FALLBACKS[kind] ? FALLBACKS[kind]() : [];
}

export async function createMisc(kind, data) {
  const db = await tryGetDb();
  const doc = { ...data, kind, createdAt: new Date() };
  const result = await db.collection(COLLECTIONS.misc).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function updateMisc(id, data) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.misc).updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
}

export async function deleteMisc(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.misc).deleteOne({ _id: new ObjectId(id) });
}
