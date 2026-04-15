"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import type { BlogPageItem } from "./BlogIndex";
import { BlogCategoryDropdown } from "./BlogCategoryDropdown";
import { useBlogFilter } from "./BlogFilterContext";

const PAGE_SIZE = 15;

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.round(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 Day Ago";
  if (diffDays < 14) return `${diffDays} Days Ago`;
  if (diffDays < 30) return `${Math.round(diffDays / 7)} Weeks Ago`;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function normalizeTags(tagString?: string): string[] {
  if (tagString == null || typeof tagString !== "string") return [];
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function PostRow({ post }: { post: BlogPageItem }) {
  const [hovered, setHovered] = useState(false);
  const tags = normalizeTags(post.frontMatter?.tag);
  const ogImage = post.frontMatter?.ogImage;

  return (
    <Link
      href={post.route}
      className="group relative flex flex-col md:flex-row gap-1.5 md:gap-4 px-4 py-3 transition-colors hover:bg-surface-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 md:group-hover:mr-[136px]">
        <Text size="s" className="text-left text-[13px] text-text-tertiary leading-snug capitalize md:truncate">
          {tags.join(", ")}
        </Text>
        <h3 className="text-left text-[16px] font-analog font-medium text-text-primary leading-snug md:truncate">
          <span className="relative inline-flex items-center">
            <span
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-[0.76em] -translate-y-[52%] bg-[#FBFF7A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
            />
            <span className="relative">{post.frontMatter?.title || post.name}</span>
          </span>
        </h3>
        <Text
          size="s"
          className="text-left text-[13px] text-text-tertiary leading-snug md:truncate"
        >
          {post.frontMatter?.description}
        </Text>
      </div>

      <div className="flex md:shrink-0 md:flex-col md:items-end gap-1 md:gap-0.5 pt-0.5 md:group-hover:invisible">
        <Text size="s" className="text-left md:text-right text-[12px] text-text-tertiary whitespace-nowrap">
          {formatDate(post.frontMatter?.date)}
        </Text>
        {post.frontMatter?.author && (
          <>
            <span className="text-[12px] text-text-tertiary md:hidden">·</span>
            <Text size="s" className="text-left md:text-right text-[12px] text-text-tertiary">
              {post.frontMatter.author}
            </Text>
          </>
        )}
      </div>

      {ogImage && hovered && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-[120px] aspect-video rounded-[2px] overflow-hidden shadow-md hidden md:block">
          <Image
            src={ogImage}
            alt={post.frontMatter?.title ?? "Preview"}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      )}
    </Link>
  );
}

export function BlogPostList({ posts }: { posts: BlogPageItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { searchQuery, setSearchQuery } = useBlogFilter();

  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="rounded-[2px] border border-line-structure bg-surface-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line-structure">
        <h2 className="text-left font-analog font-medium text-[16px] text-text-primary shrink-0">
          All Posts
        </h2>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-text-tertiary pointer-events-none" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 pr-2 h-[26px] w-[140px] text-[12px]"
            />
          </div>
          <BlogCategoryDropdown />
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <Text size="s" className="text-[13px] text-text-tertiary">
            No posts found{searchQuery ? ` for "${searchQuery}"` : ""}.
          </Text>
        </div>
      ) : (
        <>
          {/* Rows */}
          <div className="divide-y divide-line-structure">
            {visible.map((post) => (
              <PostRow key={post.route} post={post} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center py-4 border-t border-line-structure">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="text-[13px] text-text-secondary underline underline-offset-2 hover:text-text-primary transition-colors cursor-pointer"
              >
                Load {Math.min(PAGE_SIZE, posts.length - visibleCount)} more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
