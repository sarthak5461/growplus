import { fallbackPayload } from "./data";
import { getPath } from "./utils";
import { getContentMap } from "./services/content";
import { listServices } from "./services/services";
import { listTestimonials } from "./services/testimonials";
import { listCaseStudies } from "./services/case-studies";
import { listFaqs } from "./services/faqs";
import { listBlogs } from "./services/blogs";
import { listUpdates } from "./services/updates";
import { listMisc } from "./services/misc";
import { serializeMongoDoc, serializeMongoDocs } from "./utils/serialize";

function serializeService(item) {
  item = serializeMongoDoc(item);

  return {
    ...item,
    summary: item.summary || item.shortDescription,
    tags: Array.isArray(item.tags) ? item.tags : [],
    href: `/services/${item.slug}`,
  };
}

function serializeTestimonial(item) {
  item = serializeMongoDoc(item);

  return {
    ...item,
    name: item.name || item.clientName,
    quote: item.quote || item.content,
    role: item.role || item.company || "",
    initial: item.initial || (item.name || item.clientName || "GP").slice(0, 1),
  };
}

function serializeFaq(item) {
  item = serializeMongoDoc(item);

  return {
    ...item,
    q: item.q || item.question,
    a: item.a || item.answer,
  };
}

function serializeCase(item) {
  item = serializeMongoDoc(item);

  return {
    ...item,
    emoji: item.emoji || item.image || "📈",
    body: item.body || item.description,
    metrics: item.metrics || [],
  };
}

function serializeBlog(item) {
  item = serializeMongoDoc(item);

  const date =
    item.date ||
    (item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "");

  return {
    ...item,
    date,
    body: item.body || item.content || item.excerpt,
    author: item.author || "GrowPlus+",
    read: item.read || "5 min read",
    category: item.category || item.cat || "Growth",
  };
}

function serializeUpdate(item) {
  item = serializeMongoDoc(item);

  return {
    ...item,
    date:
      item.date ||
      (item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })
        : ""),
  };
}

export async function getSiteContent() {
  const [
    content,
    services,
    testimonials,
    cases,
    faqs,
    contactFaqs,
    blogPosts,
    updates,
    team,
    tools,
    partners,
    awards,
    whyPoints,
    process,
  ] = await Promise.all([
    getContentMap(),
    listServices(),
    listTestimonials(),
    listCaseStudies(),
    listFaqs({ group: "home" }),
    listFaqs({ group: "contact" }),
    listBlogs(),
    listUpdates(),
    listMisc("team"),
    listMisc("tools"),
    listMisc("partners"),
    listMisc("awards"),
    listMisc("whyPoints"),
    listMisc("process"),
  ]);

  const site = {
    ...fallbackPayload.site,
    ...(content.site || {}),
    phone: getPath(content, "footer.phone", fallbackPayload.site.phone),
    email: getPath(content, "footer.email", fallbackPayload.site.email),
    website: getPath(content, "footer.website", fallbackPayload.site.website),
    location: getPath(
      content,
      "footer.location",
      fallbackPayload.site.location,
    ),
    tagline: getPath(
      content,
      "footer.description",
      fallbackPayload.site.tagline,
    ),
  };

  return {
    ...fallbackPayload,
    site,
    header: content.header || {},
    footer: content.footer || {},
    home: content.home || {},

    services: services.map(serializeService),
    testimonials: testimonials.map(serializeTestimonial),
    cases: cases.map(serializeCase),
    faqs: faqs.map(serializeFaq),
    contactFaqs: contactFaqs.map(serializeFaq),
    blogPosts: blogPosts.map(serializeBlog),
    updates: updates.map(serializeUpdate),

    team: serializeMongoDocs(team),
    tools: serializeMongoDocs(tools),

    partners: serializeMongoDocs(partners)
      .map((item) => (typeof item === "string" ? item : item.name))
      .filter(Boolean),

    awards: serializeMongoDocs(awards),
    whyPoints: serializeMongoDocs(whyPoints),
    process: serializeMongoDocs(process),
  };
}
