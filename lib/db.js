import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let client;
let database;

export async function getDb() {
  if (!uri) throw new Error("Missing MONGO_URL");
  if (!dbName) throw new Error("Missing DB_NAME");
  if (database) return database;
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  database = client.db(dbName);
  return database;
}

export async function tryGetDb() {
  try {
    return await getDb();
  } catch {
    return null;
  }
}

export const COLLECTIONS = {
  users: "users",
  contentBlocks: "content_blocks",
  pages: "pages",
  services: "services",
  testimonials: "testimonials",
  caseStudies: "case_studies",
  faqs: "faqs",
  blogs: "blogs",
  updates: "updates",
  media: "media",
  contacts: "contacts",
  newsletter: "newsletter",
  rateLimits: "rate_limits",
  misc: "misc",
};
