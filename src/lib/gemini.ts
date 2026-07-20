// Client-side Gemini caller for the website assistant.
//
// Runs entirely in the browser, so it works under `npm run dev` and on any
// static host — no serverless function required. The API key is read from
// VITE_GEMINI_API_KEY, which Vite inlines into the client bundle. That means
// the key is PUBLIC: use a dedicated key restricted to the Generative Language
// API + your domain (HTTP referrer) with a sensible daily quota cap.

import { SYSTEM_PROMPT } from "./assistantPersona";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Injected by Vite's `define` (see vite.config.ts) from GEMINI_API_KEY or
// VITE_GEMINI_API_KEY. `typeof` guards keep this safe if the global is absent
// (e.g. under test), falling back to the VITE_ env var.
declare const __GEMINI_API_KEY__: string | undefined;
declare const __GEMINI_MODEL__: string | undefined;

const API_KEY = (
  (typeof __GEMINI_API_KEY__ !== "undefined" && __GEMINI_API_KEY__) ||
  (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ||
  ""
).trim();
const MODEL = (
  (typeof __GEMINI_MODEL__ !== "undefined" && __GEMINI_MODEL__) ||
  (import.meta.env.VITE_GEMINI_MODEL as string | undefined) ||
  "gemini-2.0-flash"
).trim();

export function assistantConfigured(): boolean {
  return API_KEY.length > 0;
}

export interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

// Map chat history to Gemini's content format and drop any leading model turns
// (Gemini rejects a leading model turn; the UI greeting is a model turn).
export function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  const contents: GeminiContent[] = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  while (contents.length && contents[0].role === "model") contents.shift();
  return contents;
}

// Translate an HTTP status from the Gemini API into an actionable error code.
export function classifyGeminiError(status: number): string {
  if (status === 400 || status === 401 || status === 403) return "auth_error";
  if (status === 404) return "model_not_found";
  if (status === 429) return "rate_limited";
  return `upstream_${status}`;
}

export async function chatWithAssistant(messages: ChatMessage[]): Promise<string> {
  if (!API_KEY) throw new Error("not_configured");

  const contents = toGeminiContents(messages);
  if (!contents.length) throw new Error("empty_conversation");

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}` +
    `:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 600, topP: 0.95 },
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    console.error("[assistant] Gemini API error", resp.status, detail.slice(0, 300));
    throw new Error(classifyGeminiError(resp.status));
  }

  const data = (await resp.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
    promptFeedback?: { blockReason?: string };
  };

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("").trim();
  if (!text) {
    if (data.promptFeedback?.blockReason) throw new Error("blocked");
    throw new Error("empty_reply");
  }
  return text;
}
