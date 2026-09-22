import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";

function collection(db) {
  return db.collection(COLLECTIONS.services);
}

export async function listServices({ includeDisabled = false } = {}) {
  const db = await tryGetDb();
  if (!db) {
    return fallbackPayload.services.map((item, order) => ({
      ...item,
      shortDescription: item.summary,
      enabled: true,
      order,
    }));
  }
  const query = includeDisabled ? {} : { enabled: { $ne: false } };
  const docs = await collection(db).find(query).sort({ order: 1 }).toArray();
  return docs.length ? docs : fallbackPayload.services;
}

export async function getServiceBySlug(slug) {
  const db = await tryGetDb();
  if (!db) return fallbackPayload.services.find((item) => item.slug === slug) || null;
  const doc = await collection(db).findOne({ slug, enabled: { $ne: false } });
  return doc || fallbackPayload.services.find((item) => item.slug === slug) || null;
}

export async function createService(data) {
  const db = await tryGetDb();
  const doc = { ...data, createdAt: new Date(), updatedAt: new Date() };
  const result = await collection(db).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function updateService(id, data) {
  const db = await tryGetDb();
  await collection(db).updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
}

export async function deleteService(id) {
  const db = await tryGetDb();
  await collection(db).deleteOne({ _id: new ObjectId(id) });
}
