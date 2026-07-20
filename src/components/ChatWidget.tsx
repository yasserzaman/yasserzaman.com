import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles } from "lucide-react";
import { chatWithAssistant, type ChatMessage } from "../lib/assistant";
import { detectLead } from "../lib/lead";

// The launcher lives in the header (Navigation) and opens this panel by
// dispatching a window event, so the two components stay decoupled.
export const OPEN_CHAT_EVENT = "myz:open-chat";

type Msg = ChatMessage;

const GREETING =
  "Assalamu alaikum, and welcome. I'm Yasser's assistant. Before we dive in, may I have your name, email, and phone number? That way Yasser can personally follow up with you. And what brings you here today?";

const FALLBACK =
  "I'm having a little trouble responding right now. You can still reach Yasser through the contact form just below, and he'll get back to you personally.";

const NOT_CONFIGURED =
  "I'm not fully switched on yet, but I don't want to keep you waiting — please drop your details in the contact form just below and Yasser will personally reach out.";

// Best-effort lead relay. Reuses the existing /api/contact mailer so Yasser is
// notified when a visitor shares their details. Works in production (and locally
// under the dev API plugin); silently no-ops if the endpoint isn't reachable.
async function submitLead(messages: Msg[], email: string, phone: string, name: string) {
  try {
    const transcript = messages
      .map((m) => `${m.role === "assistant" ? "Assistant" : "Visitor"}: ${m.content}`)
      .join("\n");
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || "Website visitor",
        email,
        topic: "COLLECTIVE_DEV",
        message: `New chatbot lead from the website assistant.\nPhone: ${phone}\n\n--- Conversation ---\n${transcript}`,
        company: "",
        source: "chatbot",
      }),
    });
  } catch (err) {
    console.warn("[assistant] lead relay failed (non-fatal):", err);
  }
}

const MAX_INPUT = 4000;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  // Synchronous latches — refs update immediately, so two fast Enter presses
  // can't fire two API calls or two lead emails (state updates are async).
  const sendingRef = useRef(false);
  const leadSentRef = useRef(false);

  // Auto-scroll to the newest message, but don't yank the view if the visitor
  // has scrolled up to read earlier messages.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [messages, isSending]);

  // Open when the header launcher (or anything) dispatches the open event.
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    // Escape closes the panel.
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const maybeCaptureLead = (convo: Msg[]) => {
    if (leadSentRef.current) return;
    const userMessages = convo.filter((m) => m.role === "user").map((m) => m.content);
    const lead = detectLead(userMessages);
    if (lead) {
      leadSentRef.current = true;
      void submitLead(convo, lead.email, lead.phone, lead.name);
    }
  };

  const send = async () => {
    if (sendingRef.current) return;
    const text = input.trim().slice(0, MAX_INPUT);
    if (!text) return;
    sendingRef.current = true;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    maybeCaptureLead(nextMessages);

    try {
      const reply = await chatWithAssistant(nextMessages.slice(-24));
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "error";
      console.error("[assistant] reply failed:", msg);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: msg === "not_configured" ? NOT_CONFIGURED : FALLBACK },
      ]);
    } finally {
      setIsSending(false);
      sendingRef.current = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Chat panel (launcher lives in the header — see Navigation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 bg-[#050B08] border border-[#142B23] shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col
                       bottom-0 right-0 left-0 h-[85svh] rounded-t-lg
                       sm:bottom-5 sm:right-5 sm:left-auto sm:w-[400px] sm:h-[640px] sm:max-h-[80svh] sm:rounded-lg
                       xl:bottom-16 xl:right-16"
            role="dialog"
            aria-modal="true"
            aria-label="Yasser's assistant chat"
          >
            {/* Brutalist corner accents */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#142B23] bg-[#091410]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-sm border border-[#10B981]/50 bg-[#07130E] flex items-center justify-center">
                  <span className="font-mono text-[10px] font-black text-[#10B981] leading-none tracking-tight select-none">
                    MYZ
                  </span>
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#ECFDF5] tracking-widest uppercase font-semibold">
                      Yasser&apos;s Assistant
                    </span>
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                  </div>
                  <span className="font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider">
                    Sales &amp; delivery desk
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 text-[#7E9F94] hover:text-[#10B981] border border-transparent hover:border-[#142B23] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-[#10B981] text-[#050B08] rounded-lg rounded-br-sm"
                        : "bg-[#091410] text-[#ECFDF5] border border-[#142B23] rounded-lg rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <span className="sr-only">Assistant is typing</span>
                  <div className="bg-[#091410] border border-[#142B23] rounded-lg rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-[#142B23] bg-[#050B08] p-3">
              <div className="flex items-end gap-2 bg-[#091410] border border-[#142B23] focus-within:border-[#10B981] transition-colors px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={MAX_INPUT}
                  aria-label="Type your message to Yasser's assistant"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-[#ECFDF5] font-sans text-[13px] placeholder:text-[#7E9F94] focus:outline-none resize-none max-h-28 leading-relaxed"
                />
                <button
                  onClick={send}
                  disabled={isSending || input.trim() === ""}
                  aria-label="Send message"
                  className="p-2 bg-[#10B981] text-[#050B08] hover:bg-transparent hover:text-[#10B981] border border-[#10B981] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-2">
                <Sparkles className="w-3 h-3 text-[#7E9F94]" />
                <span className="font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider">
                  AI assistant &middot; details shared reach Yasser directly
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
