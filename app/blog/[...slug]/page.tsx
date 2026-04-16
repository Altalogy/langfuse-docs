import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSource } from "@/lib/source";
import { loadPage, buildSectionMetadata } from "@/lib/mdx-page";
import { getMDXComponents } from "@/mdx-components";
import { ContentColumns } from "@/components/layout";
import { BlogPostSidebar } from "@/components/blog/BlogPostSidebar";
import { computeTagCounts, type BlogFrontMatter } from "@/components/blog/utils";
import { DocBodyChrome } from "@/components/DocBodyChrome";
import { MainContentWrapper } from "@/components/MainContentWrapper";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const result = await loadPage(blogSource, slug);
  if (!result) notFound();
  const { MDX } = result;

  const blogPages = blogSource
    .getPages()
    .filter((p) => {
      const fm = p.data as unknown as BlogFrontMatter;
      return p.url !== "/blog" && fm.showInBlogIndex !== false;
    });
  const tags = computeTagCounts(
    blogPages.map((p) => (p.data as unknown as BlogFrontMatter).tag)
  );

  return (
    <ContentColumns
      leftSidebar={<BlogPostSidebar tags={tags} totalPosts={blogPages.length} />}
    >
      <div className="mx-auto w-full max-w-[680px] px-4 py-6 md:px-0">
        <MainContentWrapper>
          <DocBodyChrome withProse>
            <MDX components={getMDXComponents()} />
          </DocBodyChrome>
        </MainContentWrapper>
      </div>
    </ContentColumns>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage(slug);
  if (!page) return { title: "Not Found" };
  return buildSectionMetadata(page, "blog", "Blog", slug);
}

export function generateStaticParams() {
  return blogSource.generateParams();
}
