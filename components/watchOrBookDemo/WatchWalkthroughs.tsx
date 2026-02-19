"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { WALKTHROUGH_TABS } from "./constants";
import { BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense, useCallback } from "react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <iframe
      width="100%"
      className="aspect-[16/9] rounded mt-3"
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export function WatchWalkthroughs({ className }: { className?: string }) {
  return (
    <Suspense fallback={<div className={cn("flex flex-col gap-8 items-center", className)} />}>
      <WatchWalkthroughsInner className={className} />
    </Suspense>
  );
}

function WatchWalkthroughsInner({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current tab from query param or default to first tab
  const activeTab = (() => {
    const tab = searchParams.get("tab");
    if (tab && WALKTHROUGH_TABS.some((t) => t.id === tab)) {
      return tab;
    }
    return WALKTHROUGH_TABS[0].id;
  })();

  // Handle tab change and update URL query param
  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className={cn("flex flex-col gap-8 items-center", className)}>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="h-auto p-2 gap-2 flex-wrap justify-center mx-auto flex-row">
          {WALKTHROUGH_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-none h-auto items-center justify-center md:gap-2 text-center whitespace-nowrap flex-row"
            >
              <tab.icon className="size-4" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {WALKTHROUGH_TABS.map((tab) => {
          return (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="mt-2 p-4 border rounded bg-card max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{tab.title}</h3>
                <p>{tab.description}</p>
              </div>
              <VideoPlayer
                videoId={tab.videoId}
                title={`Langfuse ${tab.label.toLowerCase()} video`}
              />
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href={tab.docs.href}>
                    <BookOpen size={16} />
                    {tab.docs.title}
                    <ExternalLink size={14} className="ml-auto" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
