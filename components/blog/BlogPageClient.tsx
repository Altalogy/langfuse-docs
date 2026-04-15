"use client";

import { Suspense } from "react";
import { BlogFilterProvider } from "./BlogFilterContext";
import { BlogSidebar } from "./BlogSidebar";
import { BlogAside } from "./BlogAside";
import { BlogIndex } from "./BlogIndex";
import type { BlogPageItem } from "./BlogIndex";
import Link from "next/link";
import { TextHighlight } from "@/components/ui/text-highlight";
import { Footer } from "@/components/layout/Footer";
import { AISearchPanel } from "@/components/inkeep/search";

const hatchStyle = {
  "--stripe-base": "transparent",
  "--stripe-line": "rgba(108, 103, 96, 0.06)",
} as React.CSSProperties;

function BlogHatchBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden z-0"
    >
      <div
        className="bg-stripe-pattern absolute -top-4 -left-8 w-[55%] h-[200px]"
        style={{ ...hatchStyle, clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
      />
      <div
        className="bg-stripe-pattern absolute -top-4 right-0 w-[35%] h-[160px]"
        style={{ ...hatchStyle, clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div
        className="bg-stripe-pattern absolute top-[180px] -left-4 w-[30%] h-[120px]"
        style={{ ...hatchStyle, clipPath: "polygon(0 0, 100% 40%, 60% 100%, 0 100%)" }}
      />
      <div
        className="bg-stripe-pattern absolute top-[150px] right-[5%] w-[20%] h-[100px]"
        style={{ ...hatchStyle, clipPath: "polygon(15% 0, 100% 0, 100% 80%, 0 100%)" }}
      />
    </div>
  );
}

/**
 * Client component that wraps the entire blog page content.
 * Provides BlogFilterContext so both the sidebar and main content
 * share filter state (tags, search query).
 */
export function BlogPageClient({ pages }: { pages: BlogPageItem[] }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] animate-pulse rounded-[2px] bg-surface-bg/50" />
      }
    >
      <BlogFilterProvider pages={pages}>
        <div id="home-layout" className="flex flex-1 mx-auto w-full min-h-screen max-w-360">
          <BlogSidebar />
          <main className="flex-1 min-w-0 rounded-sm pattern-bg">
            <div className="relative z-1">
              <BlogHatchBackground />
              <div className="relative z-1 mx-auto w-full px-6 py-8">
                <div className="mb-8">
                  <h1 className="font-analog text-4xl font-medium text-text-primary mb-2">
                    <TextHighlight>Langfuse Blog</TextHighlight>
                  </h1>
                  <p className="text-text-tertiary text-[15px]">
                    The latest updates from Langfuse. See{" "}
                    <Link
                      href="/changelog"
                      className="underline hover:text-text-primary"
                    >
                      Changelog
                    </Link>{" "}
                    for more product updates.
                  </p>
                </div>
                <BlogIndex />
              </div>
            </div>
            <Footer className="md:max-w-none xl:max-w-none px-6 sm:px-6 md:px-6" />
          </main>
          <BlogAside />
          <AISearchPanel />
        </div>
      </BlogFilterProvider>
    </Suspense>
  );
}
