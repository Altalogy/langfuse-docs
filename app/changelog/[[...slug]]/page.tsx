import { changelogSource } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { ChangelogIndex } from "@/components/changelog/ChangelogIndex";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Changelog index page (no slug)
  if (!params.slug || params.slug.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Changelog</h1>
        <p className="text-muted-foreground text-lg mb-8">
          New updates and improvements to Langfuse.
        </p>
        <ChangelogIndex />
      </div>
    );
  }

  const page = changelogSource.getPage(params.slug);
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
  const params = changelogSource.generateParams();
  return [{ slug: [] }, ...params];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Changelog - Langfuse",
      description: "New updates and improvements to Langfuse.",
    };
  }

  const page = changelogSource.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? "";

  return {
    title: `${title} - Langfuse Changelog`,
    description,
    openGraph: {
      title: `${title} - Langfuse Changelog`,
      description,
    },
  };
}
