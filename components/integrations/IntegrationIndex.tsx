// TODO: Reimplement using fumadocs source.getPages() to list integration pages by category.
// Previously used getPagesUnderRoute("/integrations/...") from Nextra which no longer exists.

import { Cards, Card } from "fumadocs-ui/components/card";
import {
  nativeIntegrationsMeta,
  dataPlatformIntegrationsMeta,
} from "@/lib/data/integrations-meta";

/**
 * Transforms meta config entries into integration page objects
 */
function additionalLinksFromMeta(metaConfig: Record<string, any>) {
  return Object.entries(metaConfig)
    .filter(([_, config]) => config.href)
    .map(([_, config]) => ({
      route: config.href,
      frontMatter: { title: config.title, logo: config.logo },
      title: config.title,
    }));
}

type ProcessedIntegrationPage = {
  route: string;
  frontMatter: Record<string, any>;
  title: string;
};

const categoryConfig: Record<
  string,
  {
    title: string;
    description?: string;
    additionalLinks?: ProcessedIntegrationPage[];
    featuredLinks?: ProcessedIntegrationPage[];
  }
> = {
  native: {
    title: "Native",
    description: "Native integrations with Langfuse",
    additionalLinks: additionalLinksFromMeta(nativeIntegrationsMeta),
  },
  frameworks: {
    title: "Frameworks",
    description: "Integrate with popular AI frameworks",
    featuredLinks: [
      {
        route: "/integrations/frameworks/langchain",
        frontMatter: {
          title: "LangChain & LangGraph",
          logo: "/images/integrations/langchain_icon.png",
        },
        title: "LangChain & LangGraph",
      },
      {
        route: "/integrations/model-providers/openai-py",
        frontMatter: {
          title: "OpenAI (Python)",
          logo: "/images/integrations/openai_icon.svg",
        },
        title: "OpenAI (Python)",
      },
      {
        route: "/integrations/frameworks/vercel-ai-sdk",
        frontMatter: {
          title: "Vercel AI SDK",
          logo: "/images/integrations/vercel_ai_sdk_icon.png",
        },
        title: "Vercel AI SDK",
      },
      {
        route: "/integrations/frameworks/google-adk",
        frontMatter: {
          title: "Google ADK",
          logo: "/images/integrations/google_adk_icon.png",
        },
        title: "Google ADK",
      },
      {
        route: "/integrations/frameworks/pydantic-ai",
        frontMatter: {
          title: "Pydantic AI",
          logo: "/images/integrations/pydantic_ai_icon.svg",
        },
        title: "Pydantic AI",
      },
      {
        route: "/integrations/frameworks/openai-agents",
        frontMatter: {
          title: "OpenAI Agents",
          logo: "/images/integrations/openai_icon.svg",
        },
        title: "OpenAI Agents",
      },
    ],
  },
  "model-providers": {
    title: "Model Providers",
    description: "Direct integrations with AI model providers",
  },
  gateways: {
    title: "Gateways",
    description: "Connect through API gateways and proxies",
  },
  "no-code": {
    title: "No-Code",
    description: "No-code agent builders and tools",
  },
  analytics: {
    title: "Analytics",
    description:
      "Analytics tools that can visualize Langfuse traces and metrics",
  },
  data: {
    title: "Data Platform",
    description:
      "Use Langfuse data and metrics in your own application and data platform",
    additionalLinks: additionalLinksFromMeta(dataPlatformIntegrationsMeta),
  },
  other: {
    title: "Other",
    description: "Other integrations",
  },
};

export const IntegrationIndex = () => {
  // TODO: Fetch integration pages from fumadocs source for each category,
  // merge with additionalLinks/featuredLinks, and render categorized cards.
  // For now, only render categories that have hardcoded additionalLinks or featuredLinks.

  const categoryOrder = Object.keys(categoryConfig);

  return (
    <>
      {categoryOrder
        .filter((category) => {
          const config = categoryConfig[category];
          const hasAdditional =
            config.additionalLinks && config.additionalLinks.length > 0;
          const hasFeatured =
            config.featuredLinks && config.featuredLinks.length > 0;
          return hasAdditional || hasFeatured;
        })
        .map((category) => {
          const config = categoryConfig[category];
          const featured = config.featuredLinks || [];
          const additional = config.additionalLinks || [];
          const allPages = [...featured, ...additional];

          return (
            <div key={category} className="my-10">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-2xl">
                    {config.title}
                  </h3>
                  {config.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {config.description}
                    </p>
                  )}
                </div>
              </div>
              <Cards>
                {allPages.map((page) => (
                  <Card
                    href={page.route}
                    key={page.route}
                    title={page.title}
                    icon={
                      page.frontMatter?.logo ? (
                        <div className="w-6 h-6 dark:bg-white rounded-sm p-1 flex items-center justify-center">
                          <img
                            src={page.frontMatter.logo}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : undefined
                    }
                  >
                    {""}
                  </Card>
                ))}
              </Cards>
            </div>
          );
        })}
    </>
  );
};
