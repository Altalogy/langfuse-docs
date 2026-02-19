import { changelogSource } from "@/lib/source";
import Link from "next/link";

type ChangelogFrontmatter = {
  date?: string;
  author?: string;
  ogImage?: string;
};

export const ChangelogIndex = ({
  itemsPerPage = 50,
}: {
  itemsPerPage?: number;
}) => {
  const pages = changelogSource.getPages();

  const sorted = pages
    .sort((a, b) => {
      const fmA = (a.data as unknown as { frontmatter?: ChangelogFrontmatter }).frontmatter ?? {};
      const fmB = (b.data as unknown as { frontmatter?: ChangelogFrontmatter }).frontmatter ?? {};
      const dateA = fmA.date ? new Date(fmA.date).getTime() : 0;
      const dateB = fmB.date ? new Date(fmB.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, itemsPerPage);

  return (
    <div className="space-y-6">
      {sorted.map((page) => {
        const fm = (page.data as unknown as { frontmatter?: ChangelogFrontmatter }).frontmatter ?? {};
        return (
          <Link
            key={page.url}
            href={page.url}
            className="group block rounded-lg border border-border bg-card p-5 hover:border-primary/50 transition-colors"
          >
            <h2 className="font-mono text-lg font-medium group-hover:text-primary transition-colors">
              {page.data.title}
            </h2>
            {page.data.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {page.data.description}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
              {fm.date && (
                <time>
                  {new Date(fm.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
