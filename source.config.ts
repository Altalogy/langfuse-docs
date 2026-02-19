import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkGfm } from "fumadocs-core/mdx-plugins";

// Docs section - main documentation
export const docs = defineDocs({
  dir: "content/docs",
});

// Self-hosting section
export const selfHosting = defineDocs({
  dir: "content/self-hosting",
});

// Guides section (includes cookbook)
export const guides = defineDocs({
  dir: "content/guides",
});

// Integrations section
export const integrations = defineDocs({
  dir: "content/integrations",
});

// FAQ section
export const faq = defineDocs({
  dir: "content/faq",
});

// Handbook section
export const handbook = defineDocs({
  dir: "content/handbook",
});

// Library section
export const library = defineDocs({
  dir: "content/library",
});

// Security section
export const security = defineDocs({
  dir: "content/security",
});

// Blog section (custom layout, not DocsLayout)
export const blog = defineDocs({
  dir: "content/blog",
});

// Changelog section (custom layout, not DocsLayout)
export const changelog = defineDocs({
  dir: "content/changelog",
});

// Customers section (custom layout)
export const customers = defineDocs({
  dir: "content/customers",
});

// Standalone pages (top-level routes like /about, /pricing, etc.)
export const standalone = defineDocs({
  dir: "content/_standalone",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
});
