import { ProvideLinksToolSchema } from "@/lib/ai/inkeep-qa-schema";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, zodSchema } from "ai";
import type { UIMessage } from "ai";

// Type assertions below work around pnpm resolving duplicate copies of
// @ai-sdk/provider and zod, which makes structurally identical types
// appear incompatible to TypeScript.

const inkeep = createOpenAICompatible({
  name: "inkeep",
  apiKey: process.env.INKEEP_API_KEY,
  baseURL: "https://api.inkeep.com/v1",
});

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: UIMessage[] };

  const modelMessages = await (convertToModelMessages as Function)(messages, {
    ignoreIncompleteToolCalls: true,
    convertDataPart(part: { type: string; data: unknown }) {
      if (part.type === "data-client")
        return {
          type: "text" as const,
          text: `[Client Context: ${JSON.stringify(part.data)}]`,
        };
    },
  });

  const result = streamText({
    model: inkeep("inkeep-qa-sonnet-4") as unknown as Parameters<
      typeof streamText
    >[0]["model"],
    tools: {
      provideLinks: {
        inputSchema: zodSchema(ProvideLinksToolSchema as any),
      },
    },
    messages: modelMessages,
    toolChoice: "auto",
  });

  return result.toUIMessageStreamResponse();
}
