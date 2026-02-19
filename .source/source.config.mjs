// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkGfm } from "fumadocs-core/mdx-plugins";
var docs = defineDocs({
  dir: "content/docs"
});
var selfHosting = defineDocs({
  dir: "content/self-hosting"
});
var guides = defineDocs({
  dir: "content/guides"
});
var integrations = defineDocs({
  dir: "content/integrations"
});
var faq = defineDocs({
  dir: "content/faq"
});
var handbook = defineDocs({
  dir: "content/handbook"
});
var library = defineDocs({
  dir: "content/library"
});
var security = defineDocs({
  dir: "content/security"
});
var blog = defineDocs({
  dir: "content/blog"
});
var changelog = defineDocs({
  dir: "content/changelog"
});
var customers = defineDocs({
  dir: "content/customers"
});
var standalone = defineDocs({
  dir: "content/_standalone"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  }
});
export {
  blog,
  changelog,
  customers,
  source_config_default as default,
  docs,
  faq,
  guides,
  handbook,
  integrations,
  library,
  security,
  selfHosting,
  standalone
};
