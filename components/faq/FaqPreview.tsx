// TODO: Reimplement using fumadocs source.getPages() to list FAQ pages.
// Previously used getPagesUnderRoute("/faq/all") from Nextra which no longer exists.

// Preserve the Page-like type for callers that reference it
type FaqPage = {
  route: string;
  frontMatter: Record<string, any>;
  meta?: { title: string };
  name: string;
};

export const getFaqPages = (): FaqPage[] => {
  // TODO: Fetch FAQ pages from fumadocs source
  return [];
};

export const getFilteredFaqPages = (
  faqPages: FaqPage[],
  tags: string[],
  limit: number | undefined = undefined
): FaqPage[] => {
  return faqPages
    .filter((page) => {
      const faqTags = page.frontMatter?.tags || [];
      return faqTags.some((tag: string) => tags.includes(tag));
    })
    .sort((a, b) =>
      (a.frontMatter?.title || "").localeCompare(b.frontMatter?.title || "")
    )
    .slice(0, limit);
};

export const FaqPreview = ({
  tags,
  renderAsCards = false,
}: {
  tags: string[];
  renderAsCards?: boolean;
}) => {
  // TODO: Render FAQ preview using fumadocs source
  return null;
};

export const FaqList = ({
  pages,
  renderAsCards = false,
}: {
  pages: FaqPage[];
  renderAsCards?: boolean;
}) => {
  // TODO: Render FAQ list using fumadocs source
  return null;
};
