import { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

// Persistent logging for chat conversations using Vercel KV (Redis).
// Each log entry is stored as a separate key with a TTL of 90 days.
// A sorted set tracks all log IDs for efficient querying.

interface LogPayload {
  sessionId: string;
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

const TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days
const LOGS_SORTED_SET = "chat:logs:index"; // Sorted set of log IDs (sorted by timestamp)
const LOG_KEY_PREFIX = "chat:log:"; // Individual log entries

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload: LogPayload = req.body;

    // Validate minimal payload.
    if (!payload.sessionId || !payload.userMessage) {
      return res.status(400).json({ error: "Missing sessionId or userMessage" });
    }

    // Generate unique log ID based on session and timestamp.
    const logId = `${payload.sessionId}:${Date.now()}`;
    const logKey = `${LOG_KEY_PREFIX}${logId}`;

    // Parse timestamp to score (milliseconds since epoch for sorting).
    const score = new Date(payload.timestamp).getTime();

    try {
      // Store the log entry with TTL.
      await kv.setex(logKey, TTL_SECONDS, JSON.stringify(payload));

      // Add to sorted set for fast querying (sorted by timestamp desc).
      await kv.zadd(LOGS_SORTED_SET, { score, member: logId });
    } catch (kvErr) {
      console.warn("[log] Failed to write to KV:", kvErr);
      // Don't fail the request — logging is best-effort.
    }

    // Log to Vercel console for debugging.
    console.log("[chat-log]", {
      sessionId: payload.sessionId,
      visitor: payload.visitorEmail || "anonymous",
      hasError: !!payload.errorCode,
      messageLength: payload.userMessage.length,
      replyLength: payload.assistantReply.length,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[log] Unexpected error:", err);
    // Don't fail the request — logging failures should not break the chat.
    return res.status(200).json({ ok: true });
  }
}
