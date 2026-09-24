import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createAiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "sanjeevni-ai",
    baseURL: process.env.AI_BASE_URL ?? "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
