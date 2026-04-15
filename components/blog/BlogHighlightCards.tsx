"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import type { BlogPageItem } from "./BlogIndex";


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

function HighlightRow({ post }: { post: BlogPageItem }) {
  const [hovered, setHovered] = useState(false);
  const tags = normalizeTags(post.frontMatter?.tag);
  const ogImage = post.frontMatter?.ogImage;

  return (
    <Link
      href={post.route}
      className="group relative flex flex-col md:flex-row gap-1.5 md:gap-4 px-4 py-4 transition-colors hover:bg-surface-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 md:group-hover:mr-[156px]">
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
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[140px] aspect-video rounded-[2px] overflow-hidden shadow-md hidden md:block">
          <Image
            src={ogImage}
            alt={post.frontMatter?.title ?? "Blog post"}
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>
      )}
    </Link>
  );
}

export function BlogHighlightCards({ posts }: { posts: BlogPageItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="rounded-[2px] border border-line-structure bg-surface-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-line-structure">
        <h2 className="text-left font-analog font-medium text-[16px] text-text-primary">
          Highlights
        </h2>
      </div>

      {/* Rows */}
      <div className="divide-y divide-line-structure">
        {posts.map((post) => (
          <HighlightRow key={post.route} post={post} />
        ))}
      </div>
    </section>
  );
}
