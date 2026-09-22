import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";
import { initials } from "../utils";

export async function listTestimonials({ includeDisabled = false } = {}) {
  const db = await tryGetDb();
  if (!db) {
    return fallbackPayload.testimonials.map((item, order) => ({
      clientName: item.name,
      role: item.role,
      company: item.role,
      content: item.quote,
      rating: 5,
      initial: item.initial || initials(item.name),
      enabled: true,
      order,
    }));
  }
  const query = includeDisabled ? {} : { enabled: { $ne: false } };
  const docs = await db.collection(COLLECTIONS.testimonials).find(query).sort({ order: 1 }).toArray();
  return docs.length ? docs : fallbackPayload.testimonials;
}

export async function createTestimonial(data) {
  const db = await tryGetDb();
  const doc = { ...data, initial: data.initial || initials(data.clientName), createdAt: new Date() };
  const result = await db.collection(COLLECTIONS.testimonials).insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function updateTestimonial(id, data) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.testimonials).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, initial: data.initial || initials(data.clientName), updatedAt: new Date() } },
  );
}

export async function deleteTestimonial(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.testimonials).deleteOne({ _id: new ObjectId(id) });
}
