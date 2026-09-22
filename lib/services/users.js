import { ObjectId } from "mongodb";
import { COLLECTIONS, tryGetDb } from "../db";
import { hashPassword } from "../auth/password";

export async function findUserByEmail(email) {
  const db = await tryGetDb();
  if (!db) return null;
  return db.collection(COLLECTIONS.users).findOne({ email: email.toLowerCase() });
}

export async function createUser({ name, email, password, role }) {
  const db = await tryGetDb();
  const passwordHash = await hashPassword(password);
  const doc = { name, email: email.toLowerCase(), passwordHash, role, createdAt: new Date() };
  const result = await db.collection(COLLECTIONS.users).insertOne(doc);
  return { ...doc, _id: result.insertedId, passwordHash: undefined };
}

export async function listUsers() {
  const db = await tryGetDb();
  if (!db) return [];
  return db.collection(COLLECTIONS.users).find({}, { projection: { passwordHash: 0 } }).toArray();
}

export async function updateUser(id, data) {
  const db = await tryGetDb();
  const next = { ...data };
  delete next.passwordHash;
  if (data.password) {
    next.passwordHash = await hashPassword(data.password);
    delete next.password;
  }
  await db.collection(COLLECTIONS.users).updateOne({ _id: new ObjectId(id) }, { $set: next });
}
