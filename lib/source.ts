import { loader } from "fumadocs-core/source";
import {
  docs,
  selfHosting,
  guides,
  integrations,
  faq,
  handbook,
  library,
  security,
  blog,
  changelog,
  customers,
  standalone,
} from "fumadocs-mdx:collections/server";

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const selfHostingSource = loader({
  baseUrl: "/self-hosting",
  source: selfHosting.toFumadocsSource(),
});

export const guidesSource = loader({
  baseUrl: "/guides",
  source: guides.toFumadocsSource(),
});

export const integrationsSource = loader({
  baseUrl: "/integrations",
  source: integrations.toFumadocsSource(),
});

export const faqSource = loader({
  baseUrl: "/faq",
  source: faq.toFumadocsSource(),
});

export const handbookSource = loader({
  baseUrl: "/handbook",
  source: handbook.toFumadocsSource(),
});

export const librarySource = loader({
  baseUrl: "/library",
  source: library.toFumadocsSource(),
});

export const securitySource = loader({
  baseUrl: "/security",
  source: security.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});

export const changelogSource = loader({
  baseUrl: "/changelog",
  source: changelog.toFumadocsSource(),
});

export const customersSource = loader({
  baseUrl: "/customers",
  source: customers.toFumadocsSource(),
});

export const standaloneSource = loader({
  baseUrl: "/",
  source: standalone.toFumadocsSource(),
});
