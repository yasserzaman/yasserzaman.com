# Vercel KV Setup Guide

Your chatbot now uses **Vercel KV (Redis)** for persistent chat logs. Logs survive deployments and remain queryable via the audit dashboard.

## What Changed

- **Before:** Logs stored in `/tmp` (wiped after each function invocation)
- **After:** Logs stored in Vercel KV (persists indefinitely, TTL = 90 days per entry)

## Setup (5 minutes)

### 1. Create a Vercel KV Database

Go to your Vercel Dashboard:
- **Project** → Select your portfolio project
- **Storage** tab → **Create Database** → **Vercel KV**
- Name it `chat-logs` (or whatever)
- Accept the connection

Vercel automatically injects the connection string as `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars in your project.

### 2. Deploy

Push your changes to Vercel:
```bash
git add .
git commit -m "feat: persistent chat logs with Vercel KV"
git push
```

Vercel builds and deploys. The `@vercel/kv` package is already in `package.json`.

### 3. Test

1. Open your live site (https://your-domain.com)
2. Send a test message to the chatbot
3. Visit the audit dashboard:
   ```
   https://your-domain.com/api/audit?secret=dev-only
   ```
   You should see your test message in the table.

4. Refresh the page—message persists (proof it's in KV, not `/tmp`)

### 4. Set AUDIT_SECRET (Production)

In Vercel Dashboard → Project Settings → Environment Variables:

- **Variable:** `AUDIT_SECRET`
- **Value:** Something strong (e.g., `openssl rand -hex 32`)
- **Environments:** Production

Then update your audit URL to use the secret:
```
https://your-domain.com/api/audit?secret=<your-secret>
```

## How It Works

**Client (ChatWidget):**
- User sends message → calls Groq → logs to `/api/log`

**Server (/api/log):**
- Receives log entry
- Stores in Vercel KV with key `chat:log:<sessionId>:<timestamp>`
- Adds ID to sorted set `chat:logs:index` (for fast querying)
- TTL = 90 days (auto-deletes old logs)

**Audit Dashboard (/api/audit):**
- Queries sorted set for last 50 log IDs
- Fetches each from KV
- Displays in HTML table
- Auto-refreshes every 10 sec

## Vercel KV Pricing

**Free tier:**
- 3,000 database operations/day
- 1 MB storage
- Perfect for chat logs (typical: 1 KB per exchange)

**Example:** At 1 KB per log and 500 messages/day, you'd use:
- 500 KB storage (well under 1 MB)
- 500 writes/day (under 3,000 ops)

If you exceed, Vercel charges ~$0.20 per 100K additional operations.

## Troubleshooting

### Audit dashboard shows "No logs yet" after testing
1. Check Vercel Function logs: `vercel logs api/log`
2. Ensure KV database was created and connected
3. Test the `/api/log` endpoint manually:
   ```bash
   curl -X POST https://your-domain.com/api/log \
     -H "Content-Type: application/json" \
     -d '{
       "sessionId": "test-session",
       "timestamp": "2026-07-21T10:00:00Z",
       "userMessage": "test",
       "assistantReply": "test reply",
       "model": "llama-3.3-70b-versatile"
     }'
   ```
   Should return `{"ok":true}`

4. Then visit `/api/audit?secret=dev-only` — you should see the test log

### 403 Unauthorized on audit dashboard
- Verify secret: `?secret=dev-only` for dev, or your custom secret for prod
- In production, the endpoint requires the secret to be present and correct

### High KV operation count
- KV calls: Write in `/api/log` + Read in `/api/audit`
- Each chat = 2 writes (log + sorted set) + 1 read per audit view
- If excessive, reduce audit refresh rate (change `setTimeout(location.reload, 10000)` in audit.ts)

## Next Steps (Optional)

1. **Export logs:** Add `/api/export` endpoint to download logs as CSV/JSON
2. **Search:** Add a search box to filter logs by visitor email or message text
3. **Analytics:** Dashboard showing message count/day, error rates, top visitors
4. **Alerts:** Email notification when error rate exceeds threshold

---

**You're set.** Logs now persist permanently (within 90-day TTL). Visit `/api/audit?secret=dev-only` anytime to see live chat history.
