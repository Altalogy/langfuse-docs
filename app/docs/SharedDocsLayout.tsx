import type { ComponentProps, ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsLayoutWrapper } from "./DocsLayoutWrapper";
import { NavbarDocs, DocsSecondaryNav, DocsSecondaryNavMobile } from "@/components/layout";
import { DocsPatternTracker } from "@/components/layout/DocsContentArea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AISearch, AISearchPanel, AISearchTrigger } from "@/components/ai/search";
import { cn } from "@/lib/utils";
import { MessageCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ai/button";

/**
 * Shared wrapper used by all sidebar-based section layouts
 * (docs, guides, integrations, self-hosting, library).
 * Each layout only needs to pass the correct page tree.
 *
 * Renders two sticky headers:
 *  1. NavbarDocs    — h-14 (3.5rem) — logo + search + launch app
 *  2. DocsSecondaryNav — h-11 (2.75rem) — section tabs
 * Total header = 6.25rem → set as --fd-nav-height so fumadocs
 * calculates sidebar sticky-top and mobile drawer offset correctly.
 */
export function SharedDocsLayout({
  tree,
  children,
}: {
  tree: ComponentProps<typeof DocsLayout>["tree"];
  children: ReactNode;
}) {
  return (
    <AISearch>
      <div className="docs-chrome flex min-h-screen flex-col">
        <DocsPatternTracker />
        <NavbarDocs />
        <DocsSecondaryNav />
        <DocsLayoutWrapper>
          <DocsLayout
            tree={tree}
            githubUrl="https://github.com/langfuse/langfuse-docs"
            nav={{ component: <DocsSecondaryNavMobile /> }}
            sidebar={{ enabled: true, collapsible: false }}
            searchToggle={{ enabled: false }}
            themeSwitch={{ component: <div className="ms-auto"><ThemeToggle /></div> }}
          >
            <AISearchPanel />
            <AISearchTrigger
              position="float"
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  className: 'text-fd-muted-foreground rounded-2xl',
                }),
              )}
            >
              <MessageCircleIcon className="size-4.5" />
              Ask AI
            </AISearchTrigger>
            {children}
          </DocsLayout>
        </DocsLayoutWrapper>
      </div>
    </AISearch>
  );
}
