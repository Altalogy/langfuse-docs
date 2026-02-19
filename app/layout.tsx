import { RootProvider } from "fumadocs-ui/provider/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./global.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import FooterMenu from "@/components/FooterMenu";

export const metadata: Metadata = {
  metadataBase: new URL("https://langfuse.com"),
  title: {
    default: "Langfuse - Open Source LLM Engineering Platform",
    template: "%s - Langfuse",
  },
  description:
    "Open source LLM engineering platform. Traces, evals, prompt management and metrics to debug and improve your LLM application.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "Langfuse",
    url: "https://langfuse.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@langfuse",
  },
  other: {
    "theme-color": "#000",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
          <footer className="border-t border-border/50 mt-auto">
            <div className="container max-w-6xl mx-auto px-4 py-10">
              <FooterMenu />
            </div>
          </footer>
        </RootProvider>
      </body>
    </html>
  );
}
