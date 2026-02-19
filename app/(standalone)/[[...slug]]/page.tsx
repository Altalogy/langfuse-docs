import { standaloneSource } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";

// Pages that are handled by other routes and should not be served here
const EXCLUDED_SLUGS = new Set([
  "blog",
  "changelog",
  "customers",
  "404",
]);

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Homepage
  if (!params.slug || params.slug.length === 0) {
    const page = standaloneSource.getPage([]) ?? standaloneSource.getPage(["index"]);
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

  if (EXCLUDED_SLUGS.has(params.slug[0])) {
    notFound();
  }

  const page = standaloneSource.getPage(params.slug);
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
  const params = standaloneSource.generateParams();
  return [
    { slug: [] },
    ...params.filter(
      (p) => p.slug && p.slug.length > 0 && !EXCLUDED_SLUGS.has(p.slug[0])
    ),
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Langfuse - Open Source LLM Engineering Platform",
      description:
        "Open source LLM engineering platform. Traces, evals, prompt management and metrics to debug and improve your LLM application.",
    };
  }

  const page = standaloneSource.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? "";

  return {
    title: `${title} - Langfuse`,
    description,
  };
}
