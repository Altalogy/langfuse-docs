// TODO: Reimplement using fumadocs source.getPages() to list FAQ pages by tag.
// Previously used getPagesUnderRoute("/faq/all") from Nextra which no longer exists.

const wordCasing: Record<string, string> = {
  api: "API",
  openai: "OpenAI",
  langchain: "LangChain",
};

export const formatTag = (tag: string) =>
  tag
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .map((word) => wordCasing[word.toLowerCase()] || word)
    .join(" ");

export const FaqIndex = () => {
  // TODO: Fetch FAQ pages from fumadocs source, group by tag, and render cards
  return null;
};
