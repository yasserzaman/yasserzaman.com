// Client-side Groq caller for the website assistant.
//
// Groq's free tier needs no credit card (e.g. llama-3.3-70b-versatile: ~30
// requests/min, 1000/day) and its OpenAI-compatible endpoint supports browser
// calls — a clean alternative to Gemini that avoids the billing/quota step.
//
// The key is read from GROQ_API_KEY / VITE_GROQ_API_KEY (injected by Vite's
// define — see vite.config.ts). As with any client-side key it is PUBLIC in the
// bundle: use a dedicated free key and rotate it if abused.

import { SYSTEM_PROMPT } from "./assistantPersona";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

declare const __GROQ_API_KEY__: string | undefined;
declare const __GROQ_MODEL__: string | undefined;

const API_KEY = (
  (typeof __GROQ_API_KEY__ !== "undefined" && __GROQ_API_KEY__) ||
  (import.meta.env.VITE_GROQ_API_KEY as string | undefined) ||
  ""
).trim();
const MODEL = (
  (typeof __GROQ_MODEL__ !== "undefined" && __GROQ_MODEL__) ||
  (import.meta.env.VITE_GROQ_MODEL as string | undefined) ||
  "llama-3.3-70b-versatile"
).trim();

export function groqConfigured(): boolean {
  return API_KEY.length > 0;
}

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// OpenAI-style messages: system prompt first, then the conversation as-is.
// (Unlike Gemini, there's no "must start with a user turn" constraint.)
export function toGroqMessages(messages: ChatMessage[]): GroqMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];
}

export function classifyGroqError(status: number): string {
  if (status === 401 || status === 403) return "auth_error";
  if (status === 404) return "model_not_found";
  if (status === 429) return "rate_limited";
  if (status === 400) return "bad_request";
  return `upstream_${status}`;
}

export async function chatWithGroq(messages: ChatMessage[]): Promise<string> {
  if (!API_KEY) throw new Error("not_configured");

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: toGroqMessages(messages),
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.95,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    console.error("[assistant] Groq API error", resp.status, detail.slice(0, 300));
    throw new Error(classifyGroqError(resp.status));
  }

  const data = (await resp.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty_reply");
  return text;
}
