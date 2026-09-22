import { MongoClient } from "mongodb";
import { loadEnv } from "./load-env.mjs";
import {
  awards,
  blogPosts,
  cases,
  contactFaqs,
  faqs,
  partners,
  process as processSteps,
  services,
  site,
  team,
  testimonials,
  tools,
  updates,
  whyPoints,
} from "../lib/data.js";

loadEnv();

const defaultNav = [
  { label: "Home", href: "/", enabled: true, order: 1 },
  { label: "Who We Are", href: "/about", enabled: true, order: 2 },
  { label: "Why Different", href: "/why", enabled: true, order: 3 },
  { label: "Blog", href: "/blog", enabled: true, order: 4 },
  { label: "Updates", href: "/updates", enabled: true, order: 5 },
  { label: "Grow With Us", href: "/contact", enabled: true, order: 6 },
  { label: "All Services", href: "/landing", enabled: true, order: 7 },
];

const defaultServiceNav = services.map((item, order) => ({
  label: item.short,
  href: `/services/${item.slug}`,
  icon: item.icon,
  enabled: true,
  order,
}));

async function upsertMany(col, docs, uniqueKeys) {
  for (const doc of docs) {
    const filter = {};
    uniqueKeys.forEach((key) => {
      filter[key] = doc[key];
    });
    await col.updateOne(filter, { $set: { ...doc, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }
}

async function main() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  const blocks = db.collection("content_blocks");
  const entries = {
    "header.cta.label": "Get Started",
    "header.cta.href": "/contact",
    "header.nav": defaultNav,
    "header.services": defaultServiceNav,
    "footer.brand": "Grow Plus +",
    "footer.description": site.tagline,
    "footer.phone": site.phone,
    "footer.email": site.email,
    "footer.website": site.website,
    "footer.location": site.location,
    "footer.socials": [
      { platform: "Facebook", icon: "f", link: "#", enabled: true },
      { platform: "Instagram", icon: "in", link: "#", enabled: true },
      "LinkedIn",
    ].filter(Boolean),
    "site.name": site.name,
    "site.tagline": site.tagline,
    "home.hero.eyebrow": "India's Elite Digital Agency · Since 2020",
    "home.hero.titleLineOne": "We Make",
    "home.hero.titleLineTwo": "Brands",
    "home.hero.titleAccent": "Grow",
    "home.hero.titleLineThree": "Beyond",
    "home.hero.titleLineFour": "Limits",
    "home.hero.primaryButtonText": "Start Growing",
    "home.hero.primaryButtonLink": "/contact",
    "home.hero.secondaryButtonText": "Our Services",
    "home.hero.secondaryButtonLink": "/services",
    "home.hero.statsText": "500+ Brands Scaled · ₹50Cr+ Generated",
    "home.stats": [
      { value: 500, unit: "+", label: "Brands Scaled" },
      { value: 5, unit: " yrs", label: "Experience" },
      { value: 98, unit: "%", label: "Client Retention" },
      { value: 40, unit: "+", label: "Awards Won" },
    ],
    "home.about.eyebrow": "Who We Are",
    "home.about.title": "Digital Marketing Redefined",
    "home.cta.title": "Ready to build a brand that leads its market?",
    "home.cta.buttonText": "Get Your Free Strategy Session",
    "home.cta.buttonLink": "/contact",
    "home.trustedClients.eyebrow": "Trusted By",
    "home.trustedClients.body": "Brands across industries trust GrowPlus+ to drive their digital growth.",
    "home.trustedClients.logos": partners.map((name) => ({ name })),
  };

  // fix socials array
  entries["footer.socials"] = [
    { platform: "Facebook", icon: "f", link: "#", enabled: true },
    { platform: "Instagram", icon: "in", link: "#", enabled: true },
    { platform: "LinkedIn", icon: "Li", link: "#", enabled: true },
  ];

  for (const [key, value] of Object.entries(entries)) {
    await blocks.updateOne({ key }, { $set: { key, value, updatedAt: new Date() } }, { upsert: true });
  }

  await db.collection("services").createIndex({ slug: 1 }, { unique: true });
  await db.collection("blogs").createIndex({ slug: 1 }, { unique: true });
  await db.collection("updates").createIndex({ slug: 1 }, { unique: true });

  await upsertMany(
    db.collection("services"),
    services.map((item, order) => ({ ...item, shortDescription: item.summary, enabled: true, order })),
    ["slug"],
  );
  await upsertMany(
    db.collection("testimonials"),
    testimonials.map((item, order) => ({
      ...item,
      clientName: item.name,
      content: item.quote,
      enabled: true,
      order,
    })),
    ["name"],
  );
  await upsertMany(
    db.collection("case_studies"),
    cases.map((item, order) => ({ ...item, description: item.body, image: item.emoji, enabled: true, order })),
    ["title"],
  );
  await upsertMany(
    db.collection("faqs"),
    faqs.map((item, order) => ({ ...item, question: item.q, answer: item.a, group: "home", enabled: true, order })),
    ["q", "group"],
  );
  await upsertMany(
    db.collection("faqs"),
    contactFaqs.map((item, order) => ({ ...item, question: item.q, answer: item.a, group: "contact", enabled: true, order })),
    ["q", "group"],
  );
  await upsertMany(
    db.collection("blogs"),
    blogPosts.map((item) => ({
      ...item,
      content: item.body,
      status: "published",
      publishedAt: new Date(),
    })),
    ["slug"],
  );
  await upsertMany(
    db.collection("updates"),
    updates.map((item) => ({ ...item, status: "published", publishedAt: new Date() })),
    ["slug"],
  );

  const misc = db.collection("misc");
  const miscSeed = [
    ...team.map((item, order) => ({ ...item, kind: "team", order })),
    ...tools.map((item, order) => ({ ...item, kind: "tools", order })),
    ...partners.map((name, order) => ({ name, kind: "partners", order })),
    ...awards.map((item, order) => ({ ...item, kind: "awards", order })),
    ...whyPoints.map((item, order) => ({ ...item, kind: "whyPoints", order })),
    ...processSteps.map((item, order) => ({ ...item, kind: "process", order })),
  ];
  for (const doc of miscSeed) {
    const filter = doc.name ? { kind: doc.kind, name: doc.name } : { kind: doc.kind, title: doc.title, num: doc.num };
    await misc.updateOne(filter, { $set: { ...doc, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } }, { upsert: true });
  }

  await client.close();
  console.log("Seeded GrowPlus content");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
