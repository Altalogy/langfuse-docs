// TODO: Reimplement using fumadocs source.getPages() to show recent changelog entries.
// Previously used getPagesUnderRoute("/changelog") at module level from Nextra which no longer exists.

import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Changelog({ className }: { className?: string }) {
  // TODO: Fetch changelog pages from fumadocs source, sort by date, and render timeline
  return (
    <div
      className={cn("rounded border p-5 bg-card", className)}
      role="region"
      aria-labelledby="changelog-heading"
    >
      <div className="px-5 py-2 text-center -mt-5 -mx-5 mb-5 border-b font-medium text-xs sm:text-base">
        <h3 id="changelog-heading">Changelog</h3>
      </div>
      <div className="text-sm text-muted-foreground p-4 text-center">
        <Link href="/changelog" className="text-primary hover:underline">
          View the full changelog
        </Link>
      </div>
    </div>
  );
}
