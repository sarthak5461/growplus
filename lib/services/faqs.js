import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { fallbackPayload } from "../data";

export async function listFaqs({ group, includeDisabled = false } = {}) {
  const db = await tryGetDb();

  if (!db) {
    const source =
      group === "contact" ? fallbackPayload.contactFaqs : fallbackPayload.faqs;

    return source.map((item, order) => ({
      ...item,
      question: item.q,
      answer: item.a,
      group: group || "home",
      enabled: true,
      order,
    }));
  }

  const query = includeDisabled ? {} : { enabled: { $ne: false } };

  if (group) {
    query.group = group;
  }

  const docs = await db
    .collection(COLLECTIONS.faqs)
    .find(query)
    .sort({ order: 1 })
    .toArray();

  if (docs.length) {
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  }

  const source =
    group === "contact" ? fallbackPayload.contactFaqs : fallbackPayload.faqs;

  return source.map((item, order) => ({
    ...item,
    group: group || "home",
    enabled: true,
    order,
  }));
}

export async function createFaq(data) {
  const db = await tryGetDb();
  const result = await db
    .collection(COLLECTIONS.faqs)
    .insertOne({ ...data, createdAt: new Date() });
  return { ...data, _id: result.insertedId };
}

export async function updateFaq(id, data) {
  const db = await tryGetDb();
  await db
    .collection(COLLECTIONS.faqs)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
    );
}

export async function deleteFaq(id) {
  const db = await tryGetDb();
  await db.collection(COLLECTIONS.faqs).deleteOne({ _id: new ObjectId(id) });
}
