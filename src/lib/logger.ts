// Chat conversation logger for audit and debugging.
// Sends logs to /api/log endpoint (Vercel Function).
// Designed to be fire-and-forget; does not block the UI.

export interface ChatLogEntry {
  timestamp: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  userMessage: string;
  assistantReply: string;
  model: string;
  errorCode?: string;
  errorDetail?: string;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
}

let sessionId: string | null = null;

// Generate or retrieve session ID (persists for the browser session).
export function getSessionId(): string {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }
  return sessionId;
}

// Send a log entry to the backend (non-blocking).
export async function logChat(entry: ChatLogEntry): Promise<void> {
  try {
    const payload = {
      sessionId: getSessionId(),
      ...entry,
    };

    // Fire and forget — don't await or block the UI.
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.warn("[logger] Failed to send log", err.message);
    });
  } catch (err) {
    console.warn("[logger] Error preparing log", err);
  }
}

// Log an error during chat.
export async function logChatError(
  userMessage: string,
  errorCode: string,
  errorDetail?: string
): Promise<void> {
  await logChat({
    timestamp: new Date().toISOString(),
    userMessage,
    assistantReply: "",
    model: import.meta.env.VITE_GROQ_MODEL || "llama-3.3-70b-versatile",
    errorCode,
    errorDetail,
  });
}
