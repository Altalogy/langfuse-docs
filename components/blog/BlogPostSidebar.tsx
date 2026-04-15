"use client";

import { Text } from "@/components/ui/text";
import { ProductUpdateSignup } from "@/components/ProductUpdateSignup";
import Link from "next/link";

type TagInfo = { name: string; count: number };

/**
 * Left sidebar shown on individual blog post pages.
 * Rendered inside the fumadocs DocsLayout grid via sidebar.component,
 * using [grid-area:sidebar] for proper grid placement.
 */
export function BlogPostSidebar({
  tags,
  totalPosts,
}: {
  tags: TagInfo[];
  totalPosts: number;
}) {
  return (
    <div
      className="sticky z-20 [grid-area:sidebar] max-lg:hidden bg-line-structure"
      style={{
        top: "var(--fd-docs-row-1)",
        height: "calc(var(--fd-docs-height) - var(--fd-docs-row-1))",
      }}
    >
      <div className="absolute inset-0 flex flex-col p-px pt-0">
        <nav className="flex overflow-y-auto overflow-x-hidden flex-col flex-1 rounded-sm bg-surface-1">
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
                <Link
                  href="/blog"
                  className="flex items-center gap-1 px-2 py-0.5 w-full text-left text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <Text
                    size="s"
                    className="text-left text-inherit text-[13px]"
                  >
                    + All [{totalPosts}]
                  </Text>
                </Link>
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                    className="flex items-center gap-1 px-2 py-0.5 w-full text-left text-text-tertiary hover:text-text-primary transition-colors"
                  >
                    <Text
                      size="s"
                      className="text-left text-inherit text-[13px] capitalize"
                    >
                      + {tag.name} [{tag.count}]
                    </Text>
                  </Link>
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
              <Text
                size="s"
                className="mb-3 text-left text-[13px] text-text-tertiary leading-snug"
              >
                One email per month with our latest ships and product
                announcements.
              </Text>
              <ProductUpdateSignup
                source="blog-post-sidebar"
                small
                compact
                className="flex-col items-start"
              />
            </div>
          </div>

          <span className="flex px-px w-full bg-line-structure h-[3px]">
            <span className="w-full h-full rounded-t-sm bg-surface-1" />
          </span>
        </nav>
      </div>
    </div>
  );
}
