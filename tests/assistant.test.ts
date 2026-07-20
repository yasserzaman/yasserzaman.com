// Assistant chatbot test suite.
//
// Runs in Node (no browser): bundle with esbuild, then `node`. See
// scripts/run-assistant-tests.sh. Covers the pure logic (Gemini content
// mapping, error classification, lead detection, name extraction), the
// chatWithAssistant fetch flow with a mocked fetch, and persona invariants
// (must contain key facts; must NOT contain private data).

import assert from "node:assert/strict";
import {
  toGeminiContents,
  classifyGeminiError,
  chatWithAssistant,
  type ChatMessage,
} from "../src/lib/gemini";
import { detectLead, extractName, digitsCount } from "../src/lib/lead";
import { SYSTEM_PROMPT } from "../src/lib/assistantPersona";
import { toGroqMessages, classifyGroqError, chatWithGroq } from "../src/lib/groq";
import { activeProvider, chatWithAssistant as chatViaFacade } from "../src/lib/assistant";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void | Promise<void>): Promise<void> {
  return (async () => {
    try {
      await fn();
      passed++;
      console.log(`  ✓ ${name}`);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      failures.push(`${name}: ${msg}`);
      console.log(`  ✗ ${name}\n      ${msg}`);
    }
  })();
}

type FetchArgs = { url: string; body: any };
function mockFetch(response: {
  ok: boolean;
  status: number;
  json?: any;
  text?: string;
}): { calls: FetchArgs[] } {
  const calls: FetchArgs[] = [];
  (globalThis as any).fetch = async (url: string, opts: any) => {
    calls.push({ url, body: opts?.body ? JSON.parse(opts.body) : undefined });
    return {
      ok: response.ok,
      status: response.status,
      json: async () => response.json ?? {},
      text: async () => response.text ?? "",
    };
  };
  return { calls };
}

async function run() {
  console.log("\nGemini content mapping");
  await test("maps roles and strips the leading assistant (greeting) turn", () => {
    const msgs: ChatMessage[] = [
      { role: "assistant", content: "greeting" },
      { role: "user", content: "hi" },
      { role: "assistant", content: "reply" },
      { role: "user", content: "more" },
    ];
    const contents = toGeminiContents(msgs);
    assert.equal(contents.length, 3);
    assert.equal(contents[0].role, "user");
    assert.equal(contents[0].parts[0].text, "hi");
    assert.equal(contents[1].role, "model");
    assert.equal(contents[2].role, "user");
  });
  await test("drops multiple leading model turns", () => {
    const contents = toGeminiContents([
      { role: "assistant", content: "a" },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
    ]);
    assert.equal(contents.length, 1);
    assert.equal(contents[0].parts[0].text, "c");
  });

  console.log("\nError classification");
  await test("maps HTTP statuses to actionable codes", () => {
    assert.equal(classifyGeminiError(400), "auth_error");
    assert.equal(classifyGeminiError(401), "auth_error");
    assert.equal(classifyGeminiError(403), "auth_error");
    assert.equal(classifyGeminiError(404), "model_not_found");
    assert.equal(classifyGeminiError(429), "rate_limited");
    assert.equal(classifyGeminiError(500), "upstream_500");
    assert.equal(classifyGeminiError(503), "upstream_503");
  });

  console.log("\nLead detection");
  await test("returns null with no contact details", () => {
    assert.equal(detectLead(["hello", "I need help with a booking site"]), null);
  });
  await test("returns null with email but no phone", () => {
    assert.equal(detectLead(["reach me at sara@example.com"]), null);
  });
  await test("captures a lead with email + phone", () => {
    const lead = detectLead(["I'm Sara", "sara@example.com and +966 55 123 4567"]);
    assert.ok(lead);
    assert.equal(lead!.email, "sara@example.com");
    assert.ok(digitsCount(lead!.phone) >= 7);
    assert.equal(lead!.name, "Sara");
  });
  await test("rejects a too-short digit run as a phone", () => {
    // "12345" is only 5 digits -> not a phone
    assert.equal(detectLead(["mail me at a@b.co", "ref 12345"]), null);
  });

  console.log("\nName extraction");
  await test("extracts names from common phrasings", () => {
    assert.equal(extractName("my name is Ahmed Khan"), "Ahmed Khan");
    assert.equal(extractName("Hi, I'm Muzaina"), "Muzaina");
    assert.equal(extractName("this is Omar from Acme"), "Omar");
    assert.equal(extractName("no name here"), "");
  });

  console.log("\nchatWithAssistant (mocked fetch)");
  await test("returns the model text on success", async () => {
    const { calls } = mockFetch({
      ok: true,
      status: 200,
      json: { candidates: [{ content: { parts: [{ text: "Hello from Yasser's assistant." }] } }] },
    });
    const reply = await chatWithAssistant([
      { role: "assistant", content: "greeting" },
      { role: "user", content: "hi" },
    ]);
    assert.equal(reply, "Hello from Yasser's assistant.");
    // request shape: system prompt present, leading greeting stripped
    assert.equal(calls.length, 1);
    assert.ok(calls[0].body.system_instruction.parts[0].text.includes("Yasser Zaman"));
    assert.equal(calls[0].body.contents.length, 1);
    assert.equal(calls[0].body.contents[0].role, "user");
  });
  await test("throws rate_limited on 429", async () => {
    mockFetch({ ok: false, status: 429, text: "quota" });
    await assert.rejects(
      () => chatWithAssistant([{ role: "user", content: "hi" }]),
      /rate_limited/,
    );
  });
  await test("throws auth_error on 401", async () => {
    mockFetch({ ok: false, status: 401, text: "unauth" });
    await assert.rejects(() => chatWithAssistant([{ role: "user", content: "hi" }]), /auth_error/);
  });
  await test("throws empty_reply when no candidates", async () => {
    mockFetch({ ok: true, status: 200, json: { candidates: [] } });
    await assert.rejects(() => chatWithAssistant([{ role: "user", content: "hi" }]), /empty_reply/);
  });
  await test("throws model_not_found on 404", async () => {
    mockFetch({ ok: false, status: 404, text: "no model" });
    await assert.rejects(() => chatWithAssistant([{ role: "user", content: "hi" }]), /model_not_found/);
  });
  await test("throws upstream_500 on server error", async () => {
    mockFetch({ ok: false, status: 500, text: "oops" });
    await assert.rejects(() => chatWithAssistant([{ role: "user", content: "hi" }]), /upstream_500/);
  });
  await test("throws blocked when response is safety-blocked", async () => {
    mockFetch({ ok: true, status: 200, json: { promptFeedback: { blockReason: "SAFETY" } } });
    await assert.rejects(() => chatWithAssistant([{ role: "user", content: "hi" }]), /blocked/);
  });
  await test("throws empty_conversation when history is all model turns", async () => {
    await assert.rejects(
      () => chatWithAssistant([{ role: "assistant", content: "greeting only" }]),
      /empty_conversation/,
    );
  });

  console.log("\nGroq provider");
  await test("prepends the system prompt and preserves the conversation", () => {
    const m = toGroqMessages([
      { role: "assistant", content: "greeting" },
      { role: "user", content: "hi" },
    ]);
    assert.equal(m[0].role, "system");
    assert.ok(m[0].content.includes("Yasser Zaman"));
    assert.equal(m[1].role, "assistant");
    assert.equal(m[2].role, "user");
  });
  await test("classifies Groq HTTP statuses", () => {
    assert.equal(classifyGroqError(401), "auth_error");
    assert.equal(classifyGroqError(403), "auth_error");
    assert.equal(classifyGroqError(404), "model_not_found");
    assert.equal(classifyGroqError(429), "rate_limited");
    assert.equal(classifyGroqError(400), "bad_request");
    assert.equal(classifyGroqError(500), "upstream_500");
  });
  await test("returns the assistant message on success", async () => {
    const { calls } = mockFetch({
      ok: true,
      status: 200,
      json: { choices: [{ message: { content: "Hi, I'm Yasser's assistant." } }] },
    });
    const reply = await chatWithGroq([
      { role: "assistant", content: "greeting" },
      { role: "user", content: "hello" },
    ]);
    assert.equal(reply, "Hi, I'm Yasser's assistant.");
    assert.ok(calls[0].url.includes("api.groq.com"));
    assert.equal(calls[0].body.messages[0].role, "system");
  });
  await test("throws rate_limited on 429", async () => {
    mockFetch({ ok: false, status: 429, text: "quota" });
    await assert.rejects(() => chatWithGroq([{ role: "user", content: "hi" }]), /rate_limited/);
  });
  await test("throws empty_reply when no choices", async () => {
    mockFetch({ ok: true, status: 200, json: { choices: [] } });
    await assert.rejects(() => chatWithGroq([{ role: "user", content: "hi" }]), /empty_reply/);
  });

  console.log("\nProvider facade");
  await test("prefers Groq when a Groq key is configured", () => {
    // Both keys are injected in the test bundle, so Groq wins.
    assert.equal(activeProvider(), "groq");
  });
  await test("facade routes to the active provider", async () => {
    mockFetch({
      ok: true,
      status: 200,
      json: { choices: [{ message: { content: "routed via groq" } }] },
    });
    const reply = await chatViaFacade([{ role: "user", content: "hi" }]);
    assert.equal(reply, "routed via groq");
  });

  console.log("\nPersona invariants");
  await test("includes key professional facts", () => {
    for (const fact of [
      "Al-Taj",
      "Madina",
      "14+",
      "Tawrid",
      "Bank Al Jazira",
      "n8n",
      "offshore",
      "June 2025",
      "May 2018",
      "February 2024",
      "Vision 2030",
      "235M+",
      "contact form",
    ]) {
      assert.ok(SYSTEM_PROMPT.includes(fact), `persona should mention "${fact}"`);
    }
  });
  await test("contains NO private data", () => {
    for (const secret of ["538443736", "yassar.minhaj", "Sulaimaniya", "2316", "gmail.com"]) {
      assert.ok(!SYSTEM_PROMPT.includes(secret), `persona must NOT contain "${secret}"`);
    }
  });
  await test("instructs the assistant to protect privacy and route to contact form", () => {
    assert.ok(/never reveal/i.test(SYSTEM_PROMPT));
    assert.ok(/contact form/i.test(SYSTEM_PROMPT));
  });

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) {
    console.log("FAILURES:");
    for (const f of failures) console.log("  - " + f);
    process.exit(1);
  }
}

run();
