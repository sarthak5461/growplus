import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { COLLECTIONS, db, getPublicContent, parseRow, seedIfEmpty } from "./db.js";

seedIfEmpty();

const app = express();
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "growplus-dev-secret-change-me";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use((req, _res, next) => {
  if (req.path.length > 1 && req.path.endsWith("/")) {
    req.url = req.url.replace(/\/+(\?|$)/, "$1") || "/";
  }
  next();
});

function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Sign in required" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Session expired" });
  }
}

function sendContent(_req, res) {
  res.json(getPublicContent());
}

app.get("/api/content", sendContent);

app.post("/api/leads", (req, res) => {
  const body = req.body || {};
  if (!body.email) return res.status(400).json({ error: "Email is required" });
  db.prepare(`
    INSERT INTO leads (first_name, last_name, email, phone, company, service, budget, message, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.first_name || "",
    body.last_name || "",
    body.email,
    body.phone || "",
    body.company || "",
    body.service || "",
    body.budget || "",
    body.message || "",
    body.source || "contact",
  );
  res.json({ ok: true });
});

app.post("/api/newsletter", (req, res) => {
  const email = req.body?.email;
  if (!email) return res.status(400).json({ error: "Email is required" });
  db.prepare("INSERT OR IGNORE INTO subscribers (email) VALUES (?)").run(email);
  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username || "");
  if (!user || !bcrypt.compareSync(password || "", user.password_hash)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.json({ token: signToken(user), username: user.username });
});

app.get("/api/admin/me", auth, (req, res) => {
  res.json({ username: req.user.username });
});

app.get("/api/admin/stats", auth, (req, res) => {
  const counts = {};
  for (const collection of COLLECTIONS) {
    counts[collection] = db.prepare("SELECT COUNT(*) AS n FROM records WHERE collection = ?").get(collection).n;
  }
  counts.leads = db.prepare("SELECT COUNT(*) AS n FROM leads").get().n;
  counts.subscribers = db.prepare("SELECT COUNT(*) AS n FROM subscribers").get().n;
  res.json(counts);
});

app.get("/api/admin/site", auth, (req, res) => {
  res.json(JSON.parse(db.prepare("SELECT data FROM site WHERE id = 1").get().data));
});

app.put("/api/admin/site", auth, (req, res) => {
  db.prepare("UPDATE site SET data = ? WHERE id = 1").run(JSON.stringify(req.body || {}));
  res.json({ ok: true });
});

app.get("/api/admin/inbox/leads", auth, (req, res) => {
  res.json(db.prepare("SELECT * FROM leads ORDER BY id DESC").all());
});

app.delete("/api/admin/inbox/leads/:id", auth, (req, res) => {
  db.prepare("DELETE FROM leads WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.get("/api/admin/inbox/subscribers", auth, (req, res) => {
  res.json(db.prepare("SELECT * FROM subscribers ORDER BY id DESC").all());
});

app.get("/api/admin/:collection", auth, (req, res) => {
  const { collection } = req.params;
  if (!COLLECTIONS.includes(collection)) return res.status(404).json({ error: "Unknown collection" });
  const rows = db.prepare("SELECT id, data, sort_order FROM records WHERE collection = ? ORDER BY sort_order, id").all(collection);
  res.json(rows.map(parseRow));
});

app.post("/api/admin/:collection", auth, (req, res) => {
  const { collection } = req.params;
  if (!COLLECTIONS.includes(collection)) return res.status(404).json({ error: "Unknown collection" });
  const max = db.prepare("SELECT COALESCE(MAX(sort_order), -1) AS n FROM records WHERE collection = ?").get(collection).n;
  const info = db.prepare("INSERT INTO records (collection, data, sort_order) VALUES (?, ?, ?)").run(
    collection,
    JSON.stringify(req.body || {}),
    max + 1,
  );
  res.json({ id: Number(info.lastInsertRowid), ...(req.body || {}) });
});

app.put("/api/admin/:collection/:id", auth, (req, res) => {
  const { collection, id } = req.params;
  const existing = db.prepare("SELECT id FROM records WHERE collection = ? AND id = ?").get(collection, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  const { id: _id, sort_order, ...data } = req.body || {};
  db.prepare("UPDATE records SET data = ? WHERE id = ?").run(JSON.stringify(data), id);
  if (typeof sort_order === "number") {
    db.prepare("UPDATE records SET sort_order = ? WHERE id = ?").run(sort_order, id);
  }
  res.json({ ok: true });
});

app.delete("/api/admin/:collection/:id", auth, (req, res) => {
  db.prepare("DELETE FROM records WHERE collection = ? AND id = ?").run(req.params.collection, req.params.id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`GrowPlus API running on http://127.0.0.1:${PORT}`);
});
