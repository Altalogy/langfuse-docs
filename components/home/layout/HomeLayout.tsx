import type { ReactNode } from "react";
import { Footer } from "../../layout/Footer";
import { HomeSidebar } from "./HomeSidebar";
import { HomeAside } from "./HomeAside";
import { HomeMainArea } from "./HomeMainArea";
import { AISearchPanel } from "@/components/inkeep/search";
import { PageChrome } from "./PageChrome";

type HomeLayoutProps = {
  children: ReactNode;
  /** Right TOC / utility column. Default: true. */
  showAside?: boolean;
  /** Override the default left sidebar (HomeSidebar). */
  leftSidebar?: ReactNode;
  /** Override the default right sidebar (HomeAside). */
  rightSidebar?: ReactNode;
};

/**
 * Layout for the homepage and all marketing/wide pages.
 * Three-column grid matching the docs layout structure:
 * [left sidebar 240px] | [content 1fr, pattern-bg] | [right sidebar 240px]
 *
 * Pass `leftSidebar` / `rightSidebar` to swap out the default sidebars
 * for page-specific versions (e.g. blog filters, changelog nav).
 */
export function HomeLayout({
  children,
  showAside = true,
  leftSidebar,
  rightSidebar,
}: HomeLayoutProps) {
  return (
    <PageChrome>
      <div id="home-layout" className="flex flex-1 mx-auto w-full min-h-0 max-w-360">
        {leftSidebar ?? <HomeSidebar />}
        <HomeMainArea>
          {children}
          <Footer />
        </HomeMainArea>
        {showAside ? (rightSidebar ?? <HomeAside />) : null}
        <AISearchPanel />
      </div>
    </PageChrome>
  );
}
