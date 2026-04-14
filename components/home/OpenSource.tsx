import { HomeSection } from "@/components/home/HomeSection";
import { CornerBox, Heading, TextHighlight } from "@/components/ui";
import { IntegrationLabel } from "@/components/ui/integration-label";
import { Text } from "@/components/ui/text";
import { BulletList } from "./BulletList";

const cards = [
  {
    title: "Self-host at Scale",
    labels: [
      "Docker Compose",
      "Kubernetes (Helm)",
      "AWS (Terraform)",
      "GCP (Terraform)",
      "Azure (Terraform)",
    ],
  },
  {
    title: "MIT License",
    bullets: [
      { label: "All product features MIT licensed", href: "/self-hosting" },
      { label: "Scales to billions of monthly events", href: "/self-hosting/configuration/scaling" },
      { label: "Fork, modify, contribute", href: "https://github.com/langfuse/langfuse" },
    ],
  },
  {
    title: "APIs & Exports",
    bullets: [
      { label: "REST APIs for everything", href: "/docs/api-and-data-platform/features/public-api" },
      { label: "Query SDK", href: "/docs/api-and-data-platform/features/query-via-sdk" },
      { label: "S3 blob storage Export", href: "/docs/api-and-data-platform/features/export-to-blob-storage" },
    ],
  },
  {
    title: "Active OSS Community",
    bullets: [
      { label: "22,000+ GitHub stars", href: "https://github.com/langfuse/langfuse" },
      { label: "5,000+ Discord members", href: "https://langfuse.com/discord" },
      { label: "Weekly releases and community hours", href: "/changelog" },
    ],
  },
];

export const OpenSource = () => {
  return (
    <HomeSection id="open-source" className="pt-[120px]">
      <div className="flex flex-col gap-4 items-start mb-10">
        <Heading className="text-left max-w-[12ch] sm:max-w-none">
          <TextHighlight>Open Platform.</TextHighlight> Open Source.
        </Heading>
        <Text className="text-left max-w-[48ch]">
          We are huge fans of open standards and data portability. Langfuse won&apos;t lock in your data, ever.
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards.map((card) => {
          return (
            <CornerBox
              key={card.title}
              hoverStripes
              className="flex flex-col gap-1 p-3 -mt-px -ml-px sm:p-4"
            >
              <Text className="font-medium text-left text-text-secondary">
                {card.title}
              </Text>
              {card.labels ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {card.labels.map((label) => (
                    <IntegrationLabel
                      key={label}
                      label={label}
                      className="flex-1 justify-start"
                    />
                  ))}
                </div>
              ) : (
                <BulletList items={card.bullets} />
              )}
            </CornerBox>
          );
        })}
      </div>
    </HomeSection>
  );
};
