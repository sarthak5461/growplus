export const PAGE_SCHEMAS = {
  header: {
    label: "Navigation",
    fields: [
      { key: "header.cta.label", label: "CTA label", type: "text", fallback: "Get Started" },
      { key: "header.cta.href", label: "CTA link", type: "link", fallback: "/contact" },
      {
        key: "header.nav",
        label: "Navigation items",
        type: "list",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link", type: "link" },
          { key: "enabled", label: "Enabled", type: "boolean" },
          { key: "order", label: "Order", type: "number" },
          { key: "external", label: "External", type: "boolean" },
        ],
      },
      {
        key: "header.services",
        label: "Services dropdown",
        type: "list",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link", type: "link" },
          { key: "icon", label: "Icon", type: "text" },
          { key: "enabled", label: "Enabled", type: "boolean" },
          { key: "order", label: "Order", type: "number" },
        ],
      },
    ],
  },
  footer: {
    label: "Footer",
    fields: [
      { key: "footer.brand", label: "Brand", type: "text", fallback: "Grow Plus +" },
      { key: "footer.description", label: "Description", type: "textarea", fallback: "India's most results-obsessed digital marketing agency. We turn brands into growth machines through data-driven strategy and relentless execution." },
      { key: "footer.phone", label: "Phone", type: "text", fallback: "+91 – 9671718434" },
      { key: "footer.email", label: "Email", type: "text", fallback: "Info@growplused.com" },
      { key: "footer.website", label: "Website", type: "text", fallback: "growplused.com" },
      { key: "footer.location", label: "Location", type: "text", fallback: "Faridabad, Haryana, India" },
      {
        key: "footer.socials",
        label: "Social links",
        type: "list",
        itemFields: [
          { key: "platform", label: "Platform", type: "text" },
          { key: "icon", label: "Icon", type: "text" },
          { key: "link", label: "Link", type: "link" },
          { key: "enabled", label: "Enabled", type: "boolean" },
        ],
      },
    ],
  },
  home: {
    label: "Home",
    fields: [
      { key: "home.hero.eyebrow", label: "Eyebrow", type: "text", fallback: "India's Elite Digital Agency · Since 2020" },
      { key: "home.hero.titleLineOne", label: "Title line 1", type: "text", fallback: "We Make" },
      { key: "home.hero.titleLineTwo", label: "Title line 2", type: "text", fallback: "Brands" },
      { key: "home.hero.titleAccent", label: "Title accent", type: "text", fallback: "Grow" },
      { key: "home.hero.titleLineThree", label: "Title line 3", type: "text", fallback: "Beyond" },
      { key: "home.hero.titleLineFour", label: "Title line 4", type: "text", fallback: "Limits" },
      { key: "home.hero.primaryButtonText", label: "Primary button", type: "text", fallback: "Start Growing" },
      { key: "home.hero.primaryButtonLink", label: "Primary link", type: "link", fallback: "/contact" },
      { key: "home.hero.secondaryButtonText", label: "Secondary button", type: "text", fallback: "Our Services" },
      { key: "home.hero.secondaryButtonLink", label: "Secondary link", type: "link", fallback: "/services" },
      { key: "home.hero.statsText", label: "Stats text", type: "text", fallback: "500+ Brands Scaled · ₹50Cr+ Generated" },
      {
        key: "home.stats",
        label: "Stats",
        type: "list",
        itemFields: [
          { key: "value", label: "Value", type: "number" },
          { key: "unit", label: "Unit", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "home.about.eyebrow", label: "About eyebrow", type: "text", fallback: "Who We Are" },
      { key: "home.about.title", label: "About title", type: "text", fallback: "Digital Marketing Redefined" },
      { key: "home.about.body", label: "About body", type: "textarea", fallback: "GrowPlus+ is India's most results-obsessed digital marketing agency. For five years, we've been engineering growth systems that compound — not quick wins that fade." },
      { key: "home.about.bodyTwo", label: "About body 2", type: "textarea", fallback: "Every strategy is built on data. Every campaign is built to scale. Every client is treated like a partner." },
      { key: "home.cta.title", label: "CTA title", type: "text", fallback: "Ready to build a brand that leads its market?" },
      { key: "home.cta.buttonText", label: "CTA button", type: "text", fallback: "Get Your Free Strategy Session" },
      { key: "home.cta.buttonLink", label: "CTA link", type: "link", fallback: "/contact" },
      { key: "home.trustedClients.eyebrow", label: "Trusted eyebrow", type: "text", fallback: "Trusted By" },
      { key: "home.trustedClients.body", label: "Trusted body", type: "textarea", fallback: "Brands across industries trust GrowPlus+ to drive their digital growth." },
      { key: "home.trustedClients.logos", label: "Client logos", type: "list", itemFields: [{ key: "name", label: "Name", type: "text" }] },
    ],
  },
};

export function flattenSchemaFields() {
  return Object.values(PAGE_SCHEMAS).flatMap((page) => page.fields);
}
