import { customersSource } from "@/lib/source";
import Link from "next/link";
import Image from "next/image";

type CustomerFrontmatter = {
  date?: string;
  ogImage?: string;
};

export const CustomerIndex = ({
  maxItems,
}: {
  maxItems?: number;
  path?: string;
}) => {
  const pages = customersSource.getPages();

  const sorted = pages
    .sort((a, b) => {
      const fmA = (a.data as unknown as { frontmatter?: CustomerFrontmatter })
        .frontmatter ?? {};
      const fmB = (b.data as unknown as { frontmatter?: CustomerFrontmatter })
        .frontmatter ?? {};
      const dateA = fmA.date ? new Date(fmA.date).getTime() : 0;
      const dateB = fmB.date ? new Date(fmB.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, maxItems);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sorted.map((page) => {
        const fm = (
          page.data as unknown as { frontmatter?: CustomerFrontmatter }
        ).frontmatter ?? {};
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
            <div className="p-5">
              <h2 className="font-mono text-xl font-medium group-hover:text-primary transition-colors">
                {page.data.title}
              </h2>
              {page.data.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {page.data.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
