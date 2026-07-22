# Chatbot Fixes: Tone, Brevity & Logging

## What Changed

### 1. System Prompt Rewrite (src/lib/assistantPersona.ts)
**Problem:** Bot was too warm, name-dropping, using filler phrases.  
**Fix:** 
- Removed "warmth of a trusted personal assistant" language
- Added hard rules: "Keep answers SHORT. 1–2 sentences is ideal."
- Banned: "I completely understand", "Is there anything else I can help you with", repeated name-dropping
- Direct, factual tone throughout
- Intake gate is now crisp (single sentence request for name/email/phone)

**Result:** Responses like the "Vatsa" example will now be:  
> "Got it. I'll let Yasser know you're interested, and he can reach out via email."  
(One sentence, name used once, no filler.)

---

### 2. Logging Layer (src/lib/logger.ts + api/log.ts)
**Problem:** No visibility into what users asked or how the bot replied.  
**Fix:** 
- New `logger.ts` module captures every chat exchange (user input, bot output, tokens, errors)
- Every Groq call is wrapped with logging (see updated groq.ts)
- Logs are sent to `/api/log` endpoint (fire-and-forget, non-blocking)
- Endpoint appends to `/tmp/chat-logs.jsonl` (JSONL format for easy parsing)

**What's logged:**
- Session ID (persists across a single browser session)
- Timestamp
- User message & bot reply
- Model used
- Token counts (prompt, completion, total)
- Error code & detail (if error occurred)
- Visitor name/email/phone (if collected during intake)

---

### 3. Audit Dashboard (api/audit.ts)
**Problem:** No way to browse chat history.  
**Fix:** New endpoint `/api/audit` displays:
- **HTML table view:** 50 most recent messages (auto-refreshes every 10 sec)
- **Stats panel:** Total messages, recent count, error rate, success rate
- **JSON export:** Add `?format=json&secret=<AUDIT_SECRET>` for programmatic access

**Access:**
```
https://your-site.com/api/audit?secret=dev-only
```

In production, set `AUDIT_SECRET` env var to a strong secret. Default is `dev-only` (dev only).

---

## Deployment Steps

### 1. Deploy to Vercel
```bash
git add .
git commit -m "feat: fix chatbot tone, add logging and audit dashboard"
git push
```

Vercel will auto-deploy. Check the build output for any errors.

### 2. Verify Logging
After deploy, open your chatbot on the live site and send a test message.  
Then visit: `https://your-site.com/api/audit?secret=dev-only`

You should see:
- A table with 1+ rows
- Your test message in the "User Message" column
- Bot's reply in the "Bot Reply" column
- Status ✓ OK

### 3. Production Security
**Before going live:**
1. Set `AUDIT_SECRET` in Vercel env vars to a real secret (e.g., `openssl rand -hex 32`)
2. Update the audit endpoint access to use that secret
3. Optional: Add an IP allowlist to `/api/audit` if you want only your IP to access logs

---

## Testing the Tone Change

### Old (bad) response:
> "No worries at all, Vatsa. I completely understand. In that case, I can still let Yasser know you're interested in connecting, and he can reach out to you via email. If you'd like to discuss something specific or learn more about his work, you can also use the contact form on this website. Yasser will be happy to get in touch with you that way. Is there anything else I can help you with, or would you like me to just let Yasser know you're interested in connecting?"

**Issues:** Name used 2x, "Yasser" used 2x, filler ("I completely understand", "Is there anything else"), 4 sentences of padding.

### New (good) response:
> "Got it. I'll let Yasser know you're interested, and he can reach out via email."

**Better:** Name used once, factual, 1 sentence, clear.

---

## Log Storage

Logs are **now persisted in Vercel KV (Redis)** with a 90-day TTL.

**Before:** `/tmp/chat-logs.jsonl` (ephemeral, wiped after each deployment)  
**After:** `KV_REST_API_URL` (permanent, survives deployments)

See `VERCEL_KV_SETUP.md` for configuration & troubleshooting.

Each log entry stored:
```json
{
  "sessionId": "session_1721568123456_abc1234",
  "timestamp": "2026-07-21T10:30:00.000Z",
  "visitorEmail": "alice@example.com",
  "userMessage": "Can Yasser help with fintech QA?",
  "assistantReply": "Yes. Yasser specializes in fintech QA/UAT governance...",
  "model": "llama-3.3-70b-versatile",
  "tokens": { "prompt": 145, "completion": 87, "total": 232 }
}
```

---

## What's NOT Changed

- Groq API key handling (still in .env, still secure)
- ChatWidget component (no UI changes)
- Contact form (still works)
- Everything else on your site

---

## Troubleshooting

### Logs not appearing in audit dashboard
1. Check Vercel Function logs: `vercel logs api/log`
2. Ensure /tmp is writable (should be on Vercel)
3. Verify bot is sending requests (check browser DevTools Network tab for `/api/log` POST calls)

### Audit dashboard shows 403 Unauthorized
- Verify `?secret=dev-only` in URL (or your custom secret)
- In production, update to your real `AUDIT_SECRET`

### High token counts
- Groq's free tier has generous limits. Monitor via audit dashboard.
- If hitting rate limits, reduce `max_tokens` in groq.ts (currently 600)

---

## Next Steps (Optional)

1. **Persistent storage:** Migrate logs to Vercel KV or a database
2. **Alerts:** Set up email alerts when error rate exceeds threshold
3. **Export:** Add a daily/weekly export of logs to S3 or email
4. **Analytics:** Build a dashboard showing trends (response time, error rates, top topics)
