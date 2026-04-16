import "server-only";
import {
  docSections,
  marketingSource,
  type SectionMeta,
} from "@/lib/source";

// ---------------------------------------------------------------------------
// Derived section routing state — everything here is computed from the
// docSections registry and marketingSource defined in lib/source.ts.
// No slugs, sets, or layout classifications are hardcoded in this file.
// ---------------------------------------------------------------------------

/** Marketing slugs derived from the Fumadocs marketing collection pages. */
export const MARKETING_SLUGS = marketingSource
  .getPages()
  .map((p) => p.url.replace(/^\//, ""))
  .filter(Boolean) as string[];

/** Build a unified config that includes both doc sections and marketing entries. */
const marketingEntries: Record<string, SectionMeta> = Object.fromEntries(
  MARKETING_SLUGS.map((slug) => [
    slug,
    {
      source: marketingSource,
      collection: "marketing" as const,
      title: slug,
      layout: "marketing" as const,
    },
  ]),
);

export const SECTION_CONFIG: Record<string, SectionMeta> = {
  ...docSections,
  ...marketingEntries,
};

export const SECTION_SLUGS = Object.keys(SECTION_CONFIG);
export type SectionSlug = string;

// Derived sets — computed from the layout annotation in each section's metadata.
export const MARKETING_SECTION_SLUGS = new Set(MARKETING_SLUGS);
export const MARKETING_SECTIONS = new Set<string>(MARKETING_SLUGS);

export const DOCS_STYLE_APP_SECTIONS = new Set(
  Object.entries(docSections)
    .filter(([, meta]) => meta.hasOwnRoute)
    .map(([slug]) => slug),
);

export const POST_SECTIONS = new Set(
  Object.entries(SECTION_CONFIG)
    .filter(([, meta]) => meta.layout === "post" || meta.layout === "changelog")
    .map(([slug]) => slug),
);

export const CHANGELOG_SECTIONS = new Set(
  Object.entries(SECTION_CONFIG)
    .filter(([, meta]) => meta.layout === "changelog")
    .map(([slug]) => slug),
);

export type MarketingSlug = string;
