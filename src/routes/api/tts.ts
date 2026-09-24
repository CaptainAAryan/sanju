import { createFileRoute } from "@tanstack/react-router";

type Body = { text?: string; langName?: string };

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { text, langName } = (await request.json()) as Body;
        if (!text?.trim()) return new Response("text required", { status: 400 });
        const key = process.env.AI_API_KEY;
        if (!key) return new Response("Missing AI_API_KEY", { status: 500 });

        const res = await fetch(`${process.env.AI_BASE_URL ?? "https://api.openai.com/v1"}/audio/speech`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.AI_TTS_MODEL ?? "gpt-4o-mini-tts",
            input: text.slice(0, 2000),
            voice: "alloy",
            response_format: "mp3",
            instructions: langName
              ? `Speak naturally in ${langName} with a warm, caring, clear tone.`
              : "Speak warmly and clearly.",
          }),
        });
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          return new Response(`TTS failed: ${body}`, { status: res.status });
        }
        return new Response(res.body, { headers: { "Content-Type": "audio/mpeg" } });
      },
    },
  },
});
