"use client";

import { usePathname } from "next/navigation";
import {
  SidebarItem as SidebarItemBase,
  useFolderDepth,
} from "fumadocs-ui/components/sidebar/base";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type * as PageTree from "fumadocs-core/page-tree";

/**
 * Custom sidebar Item renderer used with `sidebar.components` in DocsLayout.
 *
 * Nodes transformed to `type: "link"` by `shortcutLinkTransformer` are link
 * shortcuts that may share a URL with a real page elsewhere in the tree.
 * We never show these shortcuts as visually active — the real page node (which
 * causes its ancestor folder to expand) is the canonical active item.
 *
 * All other items get normal active-state handling.
 *
 * The CSS classes and depth-based padding replicate what the internal
 * `SidebarItem` in `fumadocs-ui/layouts/docs/sidebar` applies, since that
 * module is not a public export.
 */

// Mirrors itemVariants from fumadocs-ui/layouts/docs/sidebar (internal)
const itemVariants = cva(
  "relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        link: "transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors",
      },
      highlight: {
        true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:start-2.5",
        false: "",
      },
    },
  }
);

export function SidebarShortcutItem({
  item,
}: {
  item: PageTree.Item & { type: string };
}) {
  const pathname = usePathname();
  const depth = useFolderDepth();

  // Normalise trailing slash the same way fumadocs-ui's isActive() does
  const normalize = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

  const active =
    (item.type as string) !== "link" && normalize(item.url) === normalize(pathname);

  return (
    <SidebarItemBase
      href={item.url}
      external={item.external}
      active={active}
      icon={item.icon}
      className={cn(itemVariants({ variant: "link", highlight: depth >= 1 }))}
      style={{ paddingInlineStart: `calc(${2 + 3 * depth} * var(--spacing))` }}
    >
      {item.name}
    </SidebarItemBase>
  );
}
