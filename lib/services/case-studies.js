import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";

export async function listCaseStudies({ includeDisabled = false } = {}) {
  const db = await tryGetDb();
  if (!db) {
    return fallbackPayload.cases.map((item, order) => ({
      brand: item.brand,
      category: item.brand,
      title: item.title,
      description: item.body,
      image: item.emoji,
      metrics: item.metrics,
      enabled: true,
      order,
    }));
  }
  const query = includeDisabled ? {} : { enabled: { $ne: false } };
  const docs = await db.collection(COLLECTIONS.caseStudies).find(query).sort({ order: 1 }).toArray();
  return docs.length ? docs : fallbackPayload.cases;
}

export async function createCaseStudy(data) {
  const db = await tryGetDb();
  const result = await db.collection(COLLECTIONS.caseStudies).insertOne({ ...data, createdAt: new Date() });
  return { ...data, _id: result.insertedId };
}

export async function updateCaseStudy(id, data) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.caseStudies).updateOne({ _id: new ObjectId(id) }, { $set: { ...data, updatedAt: new Date() } });
}

export async function deleteCaseStudy(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.caseStudies).deleteOne({ _id: new ObjectId(id) });
}
