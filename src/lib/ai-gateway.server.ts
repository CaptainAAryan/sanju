import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";
const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

export function getGeminiApiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    process.env.AI_API_KEY ??
    ""
  ).trim();
}

export function createAiProvider(apiKey: string) {
  // Sanjeevni is a Gemini app. Do not let an old AI_BASE_URL setting
  // silently redirect requests to another provider.
  return createOpenAICompatible({
    name: "google-gemini",
    baseURL: GEMINI_BASE_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "x-goog-api-client": "project-sanjeevni/1.0",
    },
  });
}

export function getAiModel() {
  // Only accept a Gemini model override. This prevents a legacy value such
  // as "gpt-4o-mini" from being sent to Google's endpoint.
  const configured = process.env.GEMINI_CHAT_MODEL?.trim();
  return configured?.startsWith("gemini-") ? configured : DEFAULT_GEMINI_MODEL;
}
