"use client";

import { AsideShell } from "@/components/home/layout/AsideShell";
import { Text } from "@/components/ui/text";
import TocCommunity from "@/components/TocCommunity";

export function BlogAside() {
  return (
    <AsideShell>
      <div className="flex-1 px-4 py-4 min-h-0">
        <Text
          size="s"
          className="text-left text-[13px] text-text-tertiary leading-snug"
        >
          Content TBD
        </Text>
      </div>

      <TocCommunity className="border-t border-line-structure mt-auto" />
    </AsideShell>
  );
}
