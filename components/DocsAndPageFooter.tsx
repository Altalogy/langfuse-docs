import { DocsFooter } from "./DocsFooter";
import { Footer } from "./layout";

export function DocsAndPageFooter() {
  return (
    <>
      <DocsFooter />
      <Footer className="md:max-w-none xl:max-w-none" />
    </>
  );
}