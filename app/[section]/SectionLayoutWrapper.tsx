"use client";

import { SidebarProvider } from "fumadocs-ui/components/sidebar/base";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Thin client wrapper that provides SidebarProvider.
 * DocsLayout is passed as {children} (from the server layout), so it runs in the
 * server context and its LayoutContextProvider propagates correctly to DocsPage.
 */
export function SectionLayoutWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("layout-wrapper", className)}>
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
