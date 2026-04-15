import { use } from "react";
import { notFound } from "next/navigation";
import { DocsSecondaryNav, HomeLayout, DocsSecondaryNavMobile, Layout } from "@/components/layout";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  SECTION_CONFIG,
  SECTION_SLUGS,
  DOCS_STYLE_APP_SECTIONS,
  MARKETING_SECTION_SLUGS,
  MARKETING_SECTIONS,
  POST_SECTIONS,
  CHANGELOG_SECTIONS,
} from "@/lib/section-registry";
import { MainContentWrapper } from "@/components/MainContentWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SectionLayoutWrapper } from "./SectionLayoutWrapper";
import { AISearch } from "@/components/inkeep/search-context";
import { AISearchPanel } from "@/components/inkeep/search-panel";
import { ForceLightMode } from "@/components/ForceLightMode";
import { BlogPostSidebar } from "@/components/blog/BlogPostSidebar";
import { computeTagCounts, type BlogFrontMatter } from "@/components/blog/utils";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ section: string }>;
};

const contentWrapperClass = "mx-auto w-full max-w-4xl";

// Synchronous server component — keeps the same RSC context-propagation behaviour
// as app/docs/layout.tsx (which is also sync). Using React.use() to unwrap the
// Next.js 15 params Promise without making the component async.
export default function SectionLayout({ children, params }: LayoutProps) {
  const { section } = use(params);

  if (!SECTION_SLUGS.includes(section as (typeof SECTION_SLUGS)[number])) {
    notFound();
  }
  if (DOCS_STYLE_APP_SECTIONS.has(section)) {
    notFound();
  }
  if (MARKETING_SECTIONS.has(section)) {
    return <HomeLayout>{children}</HomeLayout>;
  }

  const config = SECTION_CONFIG[section as keyof typeof SECTION_CONFIG];
  const tree = config.source.getPageTree();

  const isMarketing = MARKETING_SECTION_SLUGS.has(
    section as Parameters<typeof MARKETING_SECTION_SLUGS.has>[0]
  );
  const isPost = POST_SECTIONS.has(section);
  const isChangelog = CHANGELOG_SECTIONS.has(section);
  const isBlog = section === "blog";

  // For blog post pages, compute tags for the sidebar
  let blogSidebarComponent: React.ReactNode = null;
  if (isBlog) {
    const blogPages = config.source
      .getPages()
      .filter((p) => {
        const fm = p.data as unknown as BlogFrontMatter;
        return p.url !== "/blog" && fm.showInBlogIndex !== false;
      });
    const tags = computeTagCounts(
      blogPages.map((p) => (p.data as unknown as BlogFrontMatter).tag)
    );
    blogSidebarComponent = (
      <BlogPostSidebar tags={tags} totalPosts={blogPages.length} />
    );
  }

  // Render DocsLayout from the server component so its LayoutContextProvider
  // correctly propagates context to DocsPage in the page component.
  // SectionLayoutWrapper is a thin "use client" wrapper for SidebarProvider only.

  // Blog posts use a flex-column wrapper (like docs) so the grid fills the
  // remaining viewport height and the TOC extends to the very bottom.
  if (isBlog) {
    return (
      <AISearch>
        <div className="flex min-h-screen flex-col">
          <Layout>
            <SectionLayoutWrapper className="flex-1">
              <DocsLayout
                tree={tree}
                githubUrl="https://github.com/langfuse/langfuse-docs"
                nav={{ enabled: false }}
                sidebar={{ enabled: true, collapsible: false, component: blogSidebarComponent }}
                themeSwitch={{ enabled: false }}
                searchToggle={{ enabled: false }}
                containerProps={{ className: "blog-post-layout" } as React.ComponentProps<typeof DocsLayout>["containerProps"]}
              >
                {children}
                <AISearchPanel />
              </DocsLayout>
            </SectionLayoutWrapper>
            <ForceLightMode />
          </Layout>
        </div>
      </AISearch>
    );
  }

  return (
    <AISearch>
      <Layout>
        <SectionLayoutWrapper>
          <DocsLayout
            tree={tree}
            githubUrl="https://github.com/langfuse/langfuse-docs"
            nav={isMarketing || isPost ? { enabled: false } : { component: <DocsSecondaryNavMobile /> }}
            sidebar={
              isMarketing || isPost
                ? { enabled: false }
                : { banner: <DocsSecondaryNav /> }
            }
            themeSwitch={isMarketing || isPost ? { enabled: false } : { component: <div className="ms-auto"><ThemeToggle /></div> }}
            searchToggle={{ enabled: false }}
            containerProps={
              isMarketing || isChangelog
                ? ({ style: { "--fd-toc-width": "0px" } } as React.ComponentProps<
                    typeof DocsLayout
                  >["containerProps"])
                : undefined
            }
          >
            {isMarketing || isChangelog ? (
              <div className="w-full min-w-0 flex justify-center [grid-area:main]">
                <div
                  className={`${contentWrapperClass} ${isChangelog ? "px-3 md:px-4" : ""}`}
                  data-changelog-content={isChangelog ? "" : undefined}
                >
                  <MainContentWrapper>{children}</MainContentWrapper>
                </div>
              </div>
            ) : (
              children
            )}
            <AISearchPanel />
          </DocsLayout>
        </SectionLayoutWrapper>
        <ForceLightMode />
      </Layout>
    </AISearch>
  );
}
