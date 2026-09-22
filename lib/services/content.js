import { COLLECTIONS, tryGetDb } from "../db";
import { getPath, setPath } from "../utils";
import { flattenSchemaFields } from "../cms/schemas";

export async function getContentMap(prefix = "") {
  const db = await tryGetDb();
  const map = {};
  if (!db) {
    flattenSchemaFields().forEach((field) => {
      if (field.fallback !== undefined && (!prefix || field.key.startsWith(prefix))) {
        setPath(map, field.key, field.fallback);
      }
    });
    return prefix ? getPath(map, prefix, map) : map;
  }
  const query = prefix ? { key: { $regex: `^${prefix}` } } : {};
  const rows = await db.collection(COLLECTIONS.contentBlocks).find(query).toArray();
  rows.forEach((row) => setPath(map, row.key, row.value));
  flattenSchemaFields().forEach((field) => {
    if (field.fallback !== undefined && getPath(map, field.key, undefined) === undefined) {
      if (!prefix || field.key.startsWith(prefix)) setPath(map, field.key, field.fallback);
    }
  });
  return prefix ? getPath(map, prefix, map) : map;
}

export async function upsertContent(key, value) {
  const db = await tryGetDb();
  if (!db) throw new Error("Database unavailable");
  await db.collection(COLLECTIONS.contentBlocks).updateOne(
    { key },
    { $set: { key, value, updatedAt: new Date() } },
    { upsert: true },
  );
}

export async function upsertContentMap(entries) {
  for (const [key, value] of Object.entries(entries)) {
    await upsertContent(key, value);
  }
}
