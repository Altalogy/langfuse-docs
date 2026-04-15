"use client";

import { SidebarShell } from "@/components/home/layout/SidebarShell";
import { Text } from "@/components/ui/text";
import { ProductUpdateSignup } from "@/components/ProductUpdateSignup";
import { useBlogFilter } from "./BlogFilterContext";
import { cn } from "@/lib/utils";

export function BlogSidebar() {
  const {
    selectedTag,
    setSelectedTag,
    tags,
    allPosts,
  } = useBlogFilter();

  return (
    <SidebarShell>
      {/* Categories */}
      <div className="pb-px bg-line-structure">
        <div className="px-2 py-4 rounded-sm bg-surface-1">
          <Text
            size="s"
            className="px-2 mb-3 font-[430] text-left text-[13px] text-text-primary"
          >
            Categories
          </Text>
          <div className="flex flex-col">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 w-full text-left transition-colors",
                !selectedTag
                  ? "text-text-primary"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              <Text size="s" className="text-left text-inherit text-[13px]">
                + All [{allPosts.length}]
              </Text>
            </button>
            {tags.map((tag) => (
              <button
                key={tag.name}
                onClick={() =>
                  setSelectedTag(
                    selectedTag === tag.name ? null : tag.name
                  )
                }
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 w-full text-left transition-colors",
                  selectedTag === tag.name
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-primary"
                )}
              >
                <Text size="s" className="text-left text-inherit text-[13px] capitalize">
                  + {tag.name} [{tag.count}]
                </Text>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Receive Updates */}
      <div className="pb-px bg-line-structure">
        <div className="px-4 py-4 rounded-sm bg-surface-1">
          <Text
            size="s"
            className="mb-2 font-[430] text-left text-[13px] text-text-primary"
          >
            Receive Updates
          </Text>
          <Text size="s" className="mb-3 text-left text-[13px] text-text-tertiary leading-snug">
            One email per month with our latest ships and product announcements.
          </Text>
          <ProductUpdateSignup source="blog-sidebar" small stacked className="flex-col items-start" />
        </div>
      </div>
    </SidebarShell>
  );
}
