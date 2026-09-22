import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(html = "") {
  return sanitizeHtml(String(html), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "span"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
  });
}
