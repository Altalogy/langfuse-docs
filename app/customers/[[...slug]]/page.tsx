import { customersSource } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { CustomerIndex } from "@/components/customers/CustomerIndex";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Customer Stories</h1>
        <p className="text-muted-foreground text-lg mb-8">
          See how teams use Langfuse to build better LLM applications.
        </p>
        <CustomerIndex />
      </div>
    );
  }

  const page = customersSource.getPage(params.slug);
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
  const params = customersSource.generateParams();
  return [{ slug: [] }, ...params];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Customer Stories - Langfuse",
      description:
        "See how teams use Langfuse to build better LLM applications.",
    };
  }

  const page = customersSource.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? "";

  return {
    title: `${title} - Langfuse`,
    description,
    openGraph: {
      title: `${title} - Langfuse`,
      description,
    },
  };
}
