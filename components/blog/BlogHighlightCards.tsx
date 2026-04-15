"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { TextHighlight } from "@/components/ui/text-highlight";
import type { BlogPageItem } from "./BlogIndex";
import { formatDate, normalizeTags } from "./utils";

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
          <TextHighlight highlightClassName="origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out">
            {post.frontMatter?.title || post.name}
          </TextHighlight>
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
