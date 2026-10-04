import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";

export function getGeminiApiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    process.env.AI_API_KEY ??
    ""
  ).trim();
}

export function createAiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "google-gemini",
    baseURL: process.env.AI_BASE_URL ?? GEMINI_BASE_URL,
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}

export function getAiModel() {
  return process.env.AI_CHAT_MODEL ?? "gemini-3.8-flash";
}
