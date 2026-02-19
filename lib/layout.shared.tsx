import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/components/logo";
import { HiringBadge } from "@/components/HiringBadge";
import { GithubMenuBadge } from "@/components/GitHubBadge";
import { ToAppButton } from "@/components/ToAppButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-4">
          <Logo />
          <HiringBadge />
        </div>
      ),
      transparentMode: "top",
      children: (
        <div className="flex items-center gap-2">
          <a
            className="p-1 hidden lg:inline-block hover:opacity-80"
            target="_blank"
            href="https://x.com/langfuse"
            aria-label="Langfuse X formerly known as Twitter"
            rel="nofollow noreferrer"
          >
            <svg
              aria-label="X formerly known as Twitter"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 22"
            >
              <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" />
            </svg>
          </a>
          <GithubMenuBadge />
          <Button
            size="xs"
            asChild
            className="whitespace-nowrap"
            variant="outline"
          >
            <Link href="/talk-to-us">Get Demo</Link>
          </Button>
          <ToAppButton />
        </div>
      ),
    },
    links: [
      {
        type: "menu",
        text: "Product",
        items: [
          {
            text: "Overview",
            url: "/docs",
            description: "Introduction to Langfuse",
          },
          {
            text: "LLM Observability",
            url: "/docs/observability/overview",
            description: "Trace and debug your LLM applications",
          },
          {
            text: "Prompt Management",
            url: "/docs/prompt-management/overview",
            description: "Version and manage your prompts",
          },
          {
            text: "Evaluation",
            url: "/docs/evaluation/overview",
            description: "Evaluate and improve LLM outputs",
          },
        ],
      },
      {
        type: "menu",
        text: "Resources",
        items: [
          {
            text: "Blog",
            url: "/blog",
            description: "Latest updates from Langfuse",
          },
          {
            text: "Changelog",
            url: "/changelog",
            description: "Product updates",
          },
          {
            text: "Roadmap",
            url: "/docs/roadmap",
            description: "What we're building",
          },
          {
            text: "Customers",
            url: "/customers",
            description: "Customer stories",
          },
          {
            text: "Walkthroughs",
            url: "/watch-demo",
            description: "Watch product demos",
          },
          {
            text: "Support",
            url: "/support",
            description: "Get help",
          },
        ],
      },
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "Pricing",
        url: "/pricing",
      },
      {
        text: "Security",
        url: "/security",
        active: "nested-url",
      },
    ],
    githubUrl: "https://github.com/langfuse/langfuse",
  };
}
