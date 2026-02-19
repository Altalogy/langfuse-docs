/**
 * Handbook metadata that was previously stored in pages/_meta.tsx files.
 *
 * Extracted from:
 *   _pages_backup/handbook/_meta.tsx (TEAMS)
 *   _pages_backup/handbook/chapters/_meta.tsx (CHAPTER_ORDER)
 */

export const TEAMS: Record<string, { name: string; firstPage: string }> = {
  "product-engineering": {
    name: "Product Engineering",
    firstPage: "principles",
  },
  "sales-and-cs": {
    name: "Sales & CS",
    firstPage: "overview",
  },
  support: {
    name: "Support",
    firstPage: "support",
  },
  devrel: {
    name: "DevRel",
    firstPage: "community-hour",
  },
  operations: {
    name: "Operations",
    firstPage: "entity-structure",
  },
};

export const CHAPTER_ORDER: string[] = [
  "mission",
  "customers",
  "story",
  "why",
  "open-source",
  "monetization",
  "team",
];
