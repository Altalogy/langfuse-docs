import Script from "next/script";
import { Banner } from "@/components/layout/Banner";
import { Navbar } from "@/components/layout/Navbar";
import { AISearch, FloatingAskAIButton } from "@/components/inkeep/search";
import { ForceLightMode } from "@/components/ForceLightMode";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AISearch>
      <Script
        id="force-light-home"
        strategy="beforeInteractive"
      >{`document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light'`}</Script>
      <ForceLightMode />
      <Banner />
      <Navbar />
      {children}
      <FloatingAskAIButton />
    </AISearch>
  );
}
