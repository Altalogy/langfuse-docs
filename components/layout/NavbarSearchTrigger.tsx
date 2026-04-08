"use client";

import { useAISearchContext } from "@/components/ai/search";
import { Search } from "lucide-react";

export function NavbarSearchTrigger() {
  const { setOpen } = useAISearchContext();

  return (
    <>
      {/* Full search input — hidden on small screens */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 w-full max-w-sm rounded-md border border-line-structure bg-surface-1 px-3 text-sm text-text-tertiary transition-colors hover:border-line-cta hover:text-text-secondary"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 text-left truncate">Search or ask AI...</span>
        <kbd className="inline-flex items-center gap-0.5 text-xs font-mono text-text-disabled">
          <span className="text-[10px]">⌘</span>/
        </kbd>
      </button>

      {/* Icon-only button — visible on small screens */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex md:hidden items-center justify-center size-9 rounded-md border border-line-structure bg-surface-1 text-text-tertiary transition-colors hover:border-line-cta hover:text-text-secondary"
        aria-label="Search or ask AI"
      >
        <Search className="size-4" />
      </button>
    </>
  );
}
