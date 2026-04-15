"use client";

import { useBlogFilter } from "./BlogFilterContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export function BlogCategoryDropdown() {
  const { selectedTag, setSelectedTag, tags, allPosts } = useBlogFilter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const currentLabel = selectedTag
    ? `${selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)}`
    : "All";
  const currentCount = selectedTag
    ? tags.find((t) => t.name === selectedTag)?.count ?? 0
    : allPosts.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors"
      >
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        <span className="text-[12px] font-sans font-[430]">
          {currentLabel} [{currentCount}]
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-[2px] border border-line-structure bg-surface-bg shadow-lg overflow-hidden">
          <button
            onClick={() => { setSelectedTag(null); setOpen(false); }}
            className={cn(
              "flex justify-between items-center w-full px-3 py-1.5 text-left text-[12px] font-sans transition-colors",
              !selectedTag ? "bg-surface-1 text-text-primary" : "text-text-tertiary hover:bg-surface-1 hover:text-text-primary"
            )}
          >
            <span>All</span>
            <span className="tabular-nums ml-3">{allPosts.length}</span>
          </button>
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => { setSelectedTag(tag.name); setOpen(false); }}
              className={cn(
                "flex justify-between items-center w-full px-3 py-1.5 text-left text-[12px] font-sans capitalize transition-colors",
                selectedTag === tag.name ? "bg-surface-1 text-text-primary" : "text-text-tertiary hover:bg-surface-1 hover:text-text-primary"
              )}
            >
              <span>{tag.name}</span>
              <span className="tabular-nums ml-3">{tag.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
