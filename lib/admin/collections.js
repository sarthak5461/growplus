import { PAGE_SCHEMAS } from "../cms/schemas";
import {
  createBlog,
  createCaseStudy,
  createFaq,
  createMisc,
  createService,
  createTestimonial,
  createUpdate,
  deleteBlog,
  deleteCaseStudy,
  deleteContact,
  deleteFaq,
  deleteMisc,
  deleteService,
  deleteTestimonial,
  deleteUpdate,
  getContentMap,
  listBlogs,
  listCaseStudies,
  listContacts,
  listFaqs,
  listMisc,
  listServices,
  listSubscribers,
  listTestimonials,
  listUpdates,
  updateBlog,
  updateCaseStudy,
  updateFaq,
  updateMisc,
  updateService,
  updateTestimonial,
  updateUpdate,
  upsertContentMap,
} from "../services";
import { PERMISSIONS } from "../auth/rbac";

function withId(doc) {
  if (!doc) return doc;
  const id = doc.id || (doc._id ? String(doc._id) : undefined);
  return { ...doc, id };
}

export const COLLECTION_HANDLERS = {
  services: {
    permission: PERMISSIONS.SERVICES_EDIT,
    view: PERMISSIONS.SERVICES_VIEW,
    list: async () => (await listServices({ includeDisabled: true })).map(withId),
    create: (data) => createService({ enabled: true, ...data }),
    update: (id, data) => updateService(id, data),
    remove: (id) => deleteService(id),
  },
  testimonials: {
    permission: PERMISSIONS.TESTIMONIALS_EDIT,
    view: PERMISSIONS.TESTIMONIALS_VIEW,
    list: async () => (await listTestimonials({ includeDisabled: true })).map(withId),
    create: (data) => createTestimonial({ enabled: true, clientName: data.name, content: data.quote, ...data }),
    update: (id, data) => updateTestimonial(id, { clientName: data.name, content: data.quote, ...data }),
    remove: (id) => deleteTestimonial(id),
  },
  cases: {
    permission: PERMISSIONS.CASE_STUDIES_EDIT,
    view: PERMISSIONS.CASE_STUDIES_VIEW,
    list: async () => (await listCaseStudies({ includeDisabled: true })).map(withId),
    create: (data) => createCaseStudy({ enabled: true, description: data.body, image: data.emoji, ...data }),
    update: (id, data) => updateCaseStudy(id, { description: data.body, image: data.emoji, ...data }),
    remove: (id) => deleteCaseStudy(id),
  },
  faqs: {
    permission: PERMISSIONS.FAQ_EDIT,
    view: PERMISSIONS.FAQ_VIEW,
    list: async () => (await listFaqs({ group: "home", includeDisabled: true })).map(withId),
    create: (data) => createFaq({ group: "home", enabled: true, question: data.q, answer: data.a, ...data }),
    update: (id, data) => updateFaq(id, { question: data.q, answer: data.a, ...data }),
    remove: (id) => deleteFaq(id),
  },
  contactFaqs: {
    permission: PERMISSIONS.FAQ_EDIT,
    view: PERMISSIONS.FAQ_VIEW,
    list: async () => (await listFaqs({ group: "contact", includeDisabled: true })).map(withId),
    create: (data) => createFaq({ group: "contact", enabled: true, question: data.q, answer: data.a, ...data }),
    update: (id, data) => updateFaq(id, { question: data.q, answer: data.a, ...data }),
    remove: (id) => deleteFaq(id),
  },
  blogPosts: {
    permission: PERMISSIONS.BLOG_EDIT,
    view: PERMISSIONS.BLOG_VIEW,
    list: async () => (await listBlogs({ includeUnpublished: true })).map(withId),
    create: (data) => createBlog({ status: data.status || "published", content: data.content || data.body, ...data }),
    update: (id, data) => updateBlog(id, { content: data.content || data.body, ...data }),
    remove: (id) => deleteBlog(id),
  },
  updates: {
    permission: PERMISSIONS.CONTENT_EDIT,
    view: PERMISSIONS.CONTENT_VIEW,
    list: async () => (await listUpdates({ includeUnpublished: true })).map(withId),
    create: (data) => createUpdate({ status: data.status || "published", ...data }),
    update: (id, data) => updateUpdate(id, data),
    remove: (id) => deleteUpdate(id),
  },
  team: miscHandler("team"),
  tools: miscHandler("tools"),
  partners: miscHandler("partners"),
  awards: miscHandler("awards"),
  whyPoints: miscHandler("whyPoints"),
  process: miscHandler("process"),
};

function miscHandler(kind) {
  return {
    permission: PERMISSIONS.CONTENT_EDIT,
    view: PERMISSIONS.CONTENT_VIEW,
    list: async () => (await listMisc(kind)).map(withId),
    create: (data) => createMisc(kind, data),
    update: (id, data) => updateMisc(id, data),
    remove: (id) => deleteMisc(id),
  };
}

export async function loadSchemaPage(page) {
  const schema = PAGE_SCHEMAS[page];
  if (!schema) return null;
  const map = await getContentMap();
  const values = {};
  schema.fields.forEach((field) => {
    const parts = field.key.split(".");
    let current = map;
    for (const part of parts) current = current?.[part];
    values[field.key] = current ?? field.fallback ?? (field.type === "list" ? [] : "");
  });
  return { schema, values };
}

export async function saveSchemaEntries(entries) {
  await upsertContentMap(entries);
}

export { listContacts, listSubscribers, deleteContact, withId };
export { PAGE_SCHEMAS };
