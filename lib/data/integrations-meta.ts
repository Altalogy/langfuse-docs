/**
 * Integration metadata that was previously stored in pages/_meta.tsx files.
 * These represent external links (integrations not backed by filesystem pages)
 * shown on the integrations index page.
 *
 * Extracted from:
 *   _pages_backup/integrations/native/_meta.tsx
 *   _pages_backup/integrations/data-platform/_meta.tsx
 */

export const nativeIntegrationsMeta: Record<
  string,
  { title: string; href: string }
> = {
  "python-sdk": {
    title: "Python SDK",
    href: "/docs/sdk/python/sdk-v3",
  },
  "js-ts-sdk": {
    title: "JS/TS SDK",
    href: "/docs/sdk/typescript/guide",
  },
};

export const dataPlatformIntegrationsMeta: Record<
  string,
  { title: string; href: string }
> = {
  "public-api": {
    title: "Public API",
    href: "/docs/api-and-data-platform/features/public-api",
  },
  "exports-to-s3": {
    title: "Exports to S3",
    href: "/docs/query-traces#blob-storage",
  },
  "metrics-api": {
    title: "Metrics API",
    href: "/docs/analytics/metrics-api",
  },
  "prompt-webhooks": {
    title: "Prompt Webhooks",
    href: "/docs/prompts/get-started#webhooks",
  },
  "export-blob-storage": {
    title: "Export to Blob Storage (e.g., S3)",
    href: "/docs/api-and-data-platform/features/export-to-blob-storage",
  },
};
