import { blogSource } from "@/lib/source";
import Link from "next/link";
import Image from "next/image";

type BlogPageFrontmatter = {
  date?: string;
  author?: string;
  tag?: string;
  ogImage?: string;
  showInBlogIndex?: boolean;
};

export const BlogIndex = ({
  maxItems,
}: {
  maxItems?: number;
}) => {
  const pages = blogSource.getPages();

  const sorted = pages
    .filter((page) => {
      const fm = (page.data as unknown as { frontmatter?: BlogPageFrontmatter }).frontmatter ?? {};
      return fm.showInBlogIndex !== false;
    })
    .sort((a, b) => {
      const fmA = (a.data as unknown as { frontmatter?: BlogPageFrontmatter }).frontmatter ?? {};
      const fmB = (b.data as unknown as { frontmatter?: BlogPageFrontmatter }).frontmatter ?? {};
      const dateA = fmA.date ? new Date(fmA.date).getTime() : 0;
      const dateB = fmB.date ? new Date(fmB.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, maxItems);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {sorted.map((page) => {
        const fm = (page.data as unknown as { frontmatter?: BlogPageFrontmatter }).frontmatter ?? {};
        return (
          <Link
            key={page.url}
            href={page.url}
            className="group block rounded-lg border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden"
          >
            {fm.ogImage && (
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={fm.ogImage}
                  alt={page.data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="font-mono text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                {page.data.title}
              </h2>
              {page.data.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {page.data.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {fm.date && (
                  <time>
                    {new Date(fm.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                {fm.author && <span>by {fm.author}</span>}
              </div>
              {fm.tag && (
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {fm.tag}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
