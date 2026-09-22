function serializeValue(value) {
  if (value === null || value === undefined) {
    return value;
  }

  if (value?._bsontype === "ObjectId") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, serializeValue(val)]),
    );
  }

  return value;
}

export function serializeMongoDoc(doc) {
  return serializeValue(doc);
}

export function serializeMongoDocs(docs) {
  return Array.isArray(docs) ? docs.map(serializeMongoDoc) : [];
}
