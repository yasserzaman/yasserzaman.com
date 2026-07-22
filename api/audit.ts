import { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

interface LogEntry {
  sessionId: string;
  timestamp: string;
  visitorName?: string;
  visitorEmail?: string;
  userMessage: string;
  assistantReply: string;
  model: string;
  errorCode?: string;
  tokens?: {
    total: number;
  };
}

const LOGS_SORTED_SET = "chat:logs:index";
const LOG_KEY_PREFIX = "chat:log:";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Optional: Add a simple auth check. For now, only allow from localhost or via a secret.
  const secret = req.query.secret as string | undefined;
  const expectedSecret = process.env.AUDIT_SECRET || "dev-only";

  if (secret !== expectedSecret && process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    let logs: LogEntry[] = [];

    // Fetch the last 50 log IDs from the sorted set (newest first).
    const logIds = await kv.zrevrange(LOGS_SORTED_SET, 0, 49);

    // Fetch each log entry from KV.
    for (const logId of logIds) {
      const logKey = `${LOG_KEY_PREFIX}${logId}`;
      const logData = await kv.get(logKey);

      if (logData) {
        try {
          logs.push(JSON.parse(logData as string) as LogEntry);
        } catch {
          // Ignore parse errors.
        }
      }
    }

    // If JSON requested, return raw data.
    if (req.query.format === "json") {
      return res.status(200).json(logs);
    }

    // Otherwise, return HTML table.
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chat Audit Log</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .stat {
      background: #1e293b;
      padding: 15px;
      border-radius: 8px;
      flex: 1;
      min-width: 150px;
    }
    .stat-label {
      font-size: 12px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #60a5fa;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #1e293b;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 20px;
    }
    th {
      background: #0f172a;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: #94a3b8;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #334155;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #334155;
      font-size: 13px;
    }
    tr:hover {
      background: #334155;
    }
    .timestamp {
      color: #94a3b8;
      font-size: 12px;
    }
    .visitor {
      color: #60a5fa;
      font-weight: 500;
    }
    .message {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .error {
      color: #f87171;
      font-weight: 500;
    }
    .success {
      color: #4ade80;
      font-size: 12px;
    }
    .tokens {
      color: #cbd5e1;
      font-size: 12px;
    }
    .empty {
      text-align: center;
      padding: 40px 20px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Chat Audit Log</h1>
    <div class="stats">
      <div class="stat">
        <div class="stat-label">Showing (last 50)</div>
        <div class="stat-value">${logs.length}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Errors</div>
        <div class="stat-value">${logs.filter((l) => l.errorCode).length}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Success Rate</div>
        <div class="stat-value">${((((logs.length - logs.filter((l) => l.errorCode).length) / logs.length) || 0) * 100).toFixed(0)}%</div>
      </div>
      <div class="stat">
        <div class="stat-label">Auto-Refresh</div>
        <div class="stat-value">Every 10s</div>
      </div>
    </div>

    ${
      logs.length === 0
        ? '<div class="empty">No logs yet. Chat with the bot to see messages here.</div>'
        : `
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Visitor</th>
          <th>User Message</th>
          <th>Bot Reply</th>
          <th>Status</th>
          <th>Tokens</th>
        </tr>
      </thead>
      <tbody>
        ${logs
          .map(
            (log) => `
        <tr>
          <td class="timestamp">${new Date(log.timestamp).toLocaleString()}</td>
          <td class="visitor">${log.visitorEmail || log.visitorName || "anonymous"}</td>
          <td class="message" title="${log.userMessage}">${escapeHtml(log.userMessage)}</td>
          <td class="message" title="${log.assistantReply}">${escapeHtml(log.assistantReply)}</td>
          <td>${
            log.errorCode
              ? `<span class="error">${log.errorCode}</span>`
              : '<span class="success">✓ OK</span>'
          }</td>
          <td class="tokens">${log.tokens?.total || "—"}</td>
        </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    `
    }
  </div>

  <script>
    // Auto-refresh every 10 seconds.
    setTimeout(() => location.reload(), 10000);
  </script>
</body>
</html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);
  } catch (err) {
    console.error("[audit] Error:", err);
    return res.status(500).json({ error: "Failed to read logs" });
  }
}

// Escape HTML to prevent injection.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
