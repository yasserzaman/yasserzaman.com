// Provider facade for the website assistant.
//
// Picks whichever LLM provider is configured — Groq first (free tier, no
// billing), then Gemini as a fallback. The widget only imports from here, so
// switching providers is just a matter of which API key is set in .env.

import { chatWithGroq, groqConfigured } from "./groq";
import { chatWithAssistant as chatWithGemini, assistantConfigured as geminiConfigured } from "./gemini";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type Provider = "groq" | "gemini" | "none";

export function activeProvider(): Provider {
  if (groqConfigured()) return "groq";
  if (geminiConfigured()) return "gemini";
  return "none";
}

export async function chatWithAssistant(messages: ChatMessage[]): Promise<string> {
  const provider = activeProvider();
  if (provider === "groq") return chatWithGroq(messages);
  if (provider === "gemini") return chatWithGemini(messages);
  throw new Error("not_configured");
}
