import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const email = process.env.SEED_ADMIN_EMAIL || "admin@growplus.local";
const password = process.env.SEED_ADMIN_PASSWORD || "GrowPlus!admin";
const name = process.env.SEED_ADMIN_NAME || "GrowPlus Admin";

async function main() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const users = db.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  const passwordHash = await bcrypt.hash(password, 12);
  await users.updateOne(
    { email: email.toLowerCase() },
    {
      $set: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: "super_admin",
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
  await client.close();
  console.log(`Seeded admin ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
