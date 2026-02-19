import { blogSource } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Blog index page (no slug)
  if (!params.slug || params.slug.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Latest updates, guides, and insights from the Langfuse team.
        </p>
        <BlogIndex />
      </div>
    );
  }

  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </article>
  );
}

export async function generateStaticParams() {
  const params = blogSource.generateParams();
  // Add empty slug for index page
  return [{ slug: [] }, ...params];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Blog - Langfuse",
      description:
        "Latest updates, guides, and insights from the Langfuse team.",
    };
  }

  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? "";

  return {
    title: `${title} - Langfuse Blog`,
    description,
    openGraph: {
      title: `${title} - Langfuse Blog`,
      description,
    },
  };
}
