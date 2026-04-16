import type { ReactNode } from "react";
import { Footer } from "../../layout/Footer";
import { HomeSidebar } from "./HomeSidebar";
import { HomeAside } from "./HomeAside";
import { HomeMainArea } from "./HomeMainArea";
import { AISearchPanel } from "@/components/inkeep/search";
import { PageChrome } from "./PageChrome";

type ContentColumnsProps = {
  children: ReactNode;
  showAside?: boolean;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
};

/**
 * Three-column layout: left sidebar | content | right sidebar.
 * Used inside PageChrome (or any wrapper that provides the outer chrome).
 * Pass `leftSidebar` / `rightSidebar` to swap the default sidebars.
 */
export function ContentColumns({
  children,
  showAside = true,
  leftSidebar,
  rightSidebar,
}: ContentColumnsProps) {
  return (
    <div id="home-layout" className="flex flex-1 mx-auto w-full min-h-0 max-w-360">
      {leftSidebar ?? <HomeSidebar />}
      <HomeMainArea>
        {children}
        <Footer />
      </HomeMainArea>
      {showAside ? (rightSidebar ?? <HomeAside />) : null}
      <AISearchPanel />
    </div>
  );
}

type HomeLayoutProps = ContentColumnsProps;

/**
 * Full-page layout for the homepage and all marketing/wide pages.
 * Wraps ContentColumns with PageChrome (banner, navbar, AI search).
 */
export function HomeLayout({
  children,
  showAside = true,
  leftSidebar,
  rightSidebar,
}: HomeLayoutProps) {
  return (
    <PageChrome>
      <ContentColumns
        showAside={showAside}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
      >
        {children}
      </ContentColumns>
    </PageChrome>
  );
}
