import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Frame } from "@/components/Frame";
import { Video } from "@/components/Video";
import { AvailabilityBanner } from "@/components/availability";
import { LangTabs } from "@/components/LangTabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Frame,
    Tab,
    Tabs,
    Step,
    Steps,
    LangTabs,
    AvailabilityBanner,
    Video,
    ...components,
  };
}
