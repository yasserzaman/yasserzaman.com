import nodemailer from "nodemailer";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, EMAIL_TO } = process.env;

if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
  console.error("Missing EMAIL_* env vars. Fill .env from .env.example");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT) || 465,
  secure: EMAIL_SECURE !== "false",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

(async () => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_USER,
      to: EMAIL_TO,
      subject: "Test email from myz-portfolio",
      text: "This is a test email sent from the repository test script.",
    });
    console.log("Message sent:", info.messageId);
    process.exit(0);
  } catch (err) {
    console.error("Send failed:", err);
    process.exit(2);
  }
})();
