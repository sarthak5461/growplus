import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { fallbackPayload } from "../frontend/lib/data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, "growplus.sqlite"));

export const COLLECTIONS = [
  "services",
  "faqs",
  "contactFaqs",
  "team",
  "cases",
  "testimonials",
  "tools",
  "partners",
  "awards",
  "whyPoints",
  "process",
  "blogPosts",
  "updates",
];

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS site (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    collection TEXT NOT NULL,
    data TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT DEFAULT '',
    last_name TEXT DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    company TEXT DEFAULT '',
    service TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    message TEXT DEFAULT '',
    source TEXT DEFAULT 'contact',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export function parseRow(row) {
  return { id: row.id, sort_order: row.sort_order, ...JSON.parse(row.data) };
}

export function seedIfEmpty() {
  const userCount = db.prepare("SELECT COUNT(*) AS n FROM users").get().n;
  if (userCount === 0) {
    const username = process.env.ADMIN_USER || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run(
      username,
      bcrypt.hashSync(password, 10),
    );
  }

  const siteCount = db.prepare("SELECT COUNT(*) AS n FROM site").get().n;
  if (siteCount === 0) {
    db.prepare("INSERT INTO site (id, data) VALUES (1, ?)").run(JSON.stringify(fallbackPayload.site));
  }

  const recordCount = db.prepare("SELECT COUNT(*) AS n FROM records").get().n;
  if (recordCount === 0) {
    const insert = db.prepare("INSERT INTO records (collection, data, sort_order) VALUES (?, ?, ?)");
    for (const collection of COLLECTIONS) {
      const items = fallbackPayload[collection] || [];
      items.forEach((item, index) => {
        const value = collection === "partners" ? { name: item } : item;
        insert.run(collection, JSON.stringify(value), index);
      });
    }
  }
}

export function getPublicContent() {
  const site = JSON.parse(db.prepare("SELECT data FROM site WHERE id = 1").get().data);
  const payload = { site };
  for (const collection of COLLECTIONS) {
    const rows = db.prepare("SELECT id, data, sort_order FROM records WHERE collection = ? ORDER BY sort_order, id").all(collection);
    const items = rows.map(parseRow);
    payload[collection] = collection === "partners" ? items.map((item) => item.name) : items;
  }
  return payload;
}
