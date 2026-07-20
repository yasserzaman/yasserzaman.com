// Vercel serverless function: POST /api/contact
// Receives contact-form submissions and relays them via Zoho SMTP.
//
// Required environment variables (set in Vercel → Project Settings →
// Environment Variables, and in a local .env for `vercel dev`):
//   EMAIL_HOST    e.g. smtp.zoho.in
//   EMAIL_PORT    e.g. 465
//   EMAIL_SECURE  "true" for port 465 (implicit TLS)
//   EMAIL_USER    SMTP login, e.g. info@altajtours.com
//   EMAIL_PASS    SMTP password (never commit this)
//   EMAIL_FROM    display From, e.g. "Al-Taj Tours <info@altajtours.com>"
//   EMAIL_TO      inbox that receives submissions, e.g. yassar.minhaj@gmail.com
//
// NOTE: these are intentionally NOT prefixed with VITE_ — they must stay
// server-side and never be bundled into the client.

import nodemailer from "nodemailer";

// Minimal structural types for Vercel's Node runtime (avoids depending on
// @vercel/node just for type definitions).
interface ApiRequest {
  method?: string;
  body?: unknown;
}
interface ApiResponse {
  status(code: number): ApiResponse;
  json(data: unknown): void;
  setHeader(name: string, value: string): ApiResponse | void;
}

export const maxDuration = 15;

const TOPIC_LABELS: Record<string, string> = {
  SOFTWARE_QA: "Software & QA Consulting",
  TRAVEL_ALTAJ: "Travel & AL-Taj Tours",
  MENTORSHIP: "Mentorship & Career Advice",
  GENERAL: "General Inquiry",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strip CR/LF and other control chars — defense against header injection. */
function clean(value: string, maxLen: number): string {
  return value.replace(/[\r\n\t\v\f\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLen);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, EMAIL_TO } =
    process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    // Surfaced by the client as the honest "pipeline not configured" state.
    return res.status(503).json({ error: "not_configured" });
  }

  const body = (typeof req.body === "object" && req.body !== null ? req.body : {}) as Record<
    string,
    unknown
  >;

  // Honeypot: real visitors never see or fill this field. Bots do.
  // Pretend success so the bot moves on.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  const name = typeof body.name === "string" ? clean(body.name, 100) : "";
  const email = typeof body.email === "string" ? clean(body.email, 200) : "";
  const topicKey = typeof body.topic === "string" ? clean(body.topic, 50) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  // "chatbot" leads are relayed by the assistant, not typed into the form by the
  // visitor — so we skip the auto-confirmation to avoid emailing a parsed address.
  const source = typeof body.source === "string" ? clean(body.source, 30) : "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "invalid_input" });
  }

  const topic = TOPIC_LABELS[topicKey] ?? "General";

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 465,
    secure: EMAIL_SECURE !== "false", // implicit TLS on 465
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  const from = EMAIL_FROM || EMAIL_USER;

  try {
    // 1) Notification to Yasser — Reply-To set to the visitor so a normal
    //    reply lands in their inbox.
    await transporter.sendMail({
      from,
      to: EMAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio inquiry — ${topic} — ${name}`,
      text: [
        `New message from yasserzaman.com`,
        ``,
        `Name:  ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("contact: notification send failed:", err);
    return res.status(502).json({ error: "send_failed" });
  }

  // 2) Confirmation to the visitor. Deliberately generic — it does not echo
  //    the message body back, so the form can't be abused to send arbitrary
  //    content to third-party addresses. Failure here is non-fatal.
  //    Skipped for chatbot-relayed leads (the address was parsed from chat, not
  //    entered by the visitor, so we shouldn't auto-email it).
  if (source !== "chatbot") {
    try {
      await transporter.sendMail({
        from,
        to: email,
        replyTo: EMAIL_TO,
        subject: "Your message has been received — Yasser Zaman",
        text: [
          `Salaam ${name},`,
          ``,
          `Thank you for reaching out through yasserzaman.com. Your message on`,
          `"${topic}" has been logged and I read everything personally.`,
          ``,
          `Expect a response within 24–48 hours. If it's urgent, WhatsApp is the`,
          `fastest channel: https://wa.me/+966538443736`,
          ``,
          `— Yasser Zaman`,
          `Co-founder, Al-Taj Tours & Travels`,
          `https://yasserzaman.com`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("contact: confirmation send failed (non-fatal):", err);
    }
  }

  return res.status(200).json({ ok: true });
}
