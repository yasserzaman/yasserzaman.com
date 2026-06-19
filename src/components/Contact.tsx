import React, { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "COLLECTIVE_DEV",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate elite secure pipeline transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // Add secure storage log
      const log = {
        ...formData,
        timestamp: new Date().toISOString(),
      };
      const existingLogs = JSON.parse(localStorage.getItem("yasser_zaman_inbound_communications") || "[]");
      localStorage.setItem("yasser_zaman_inbound_communications", JSON.stringify([...existingLogs, log]));
      
      // Clean form on success
      setFormData({ name: "", email: "", topic: "COLLECTIVE_DEV", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 lg:py-28 px-6 md:px-16 lg:px-24 bg-[#050B08] relative flex flex-col border-b border-[#142B23]"
    >
      <div className="absolute inset-0 bg-[#050B08] opacity-15 pointer-events-none" />

      {/* Viewport coordinate line anchor */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#142B23]/20 hidden xl:block" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column (Metadata details & Connection info from Yasser's HTML) */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#10B981] uppercase tracking-[0.3em] block">
              REACH OUT
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#ECFDF5] leading-none">
              Let's build something <span className="italic text-[#10B981]">that serves.</span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base leading-relaxed text-[#7E9F94] font-light max-w-sm">
            Consulting, collaboration, or meaningful work — the fastest way to reach me is WhatsApp. I read everything.
          </p>

          {/* Core Actions buttons from Yasser's HTML */}
          <div className="flex flex-col gap-3 max-w-xs pt-4">
            <a
              href="https://wa.me/+966538443736"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-[#10B981] text-[#050B08] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-transparent hover:text-[#10B981] border border-[#10B981] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.5-.1 1.2Z"/>
              </svg>
              <span>Init_WhatsApp</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/yasirminhaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-transparent text-[#10B981] border border-[#142B23] hover:border-[#10B981] font-mono text-xs uppercase tracking-widest transition-all duration-300 block"
            >
              LinkedIn_Connect
            </a>

            <a
              href="https://github.com/yassarminhaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-transparent text-[#10B981] border border-[#142B23] hover:border-[#10B981] font-mono text-xs uppercase tracking-widest transition-all duration-300 block"
            >
              GitHub_Proof
            </a>
          </div>

          {/* Core Info details mapping from template */}
          <div className="space-y-6 pt-8 border-t border-[#142B23] max-w-xs">
            <div>
              <span className="block font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider mb-1">
                Contact_Email
              </span>
              <a
                href="mailto:yassar.minhaj@gmail.com"
                className="font-mono text-xs text-[#ECFDF5] hover:text-[#10B981] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#10B981]" />
                <span>yassar.minhaj@gmail.com</span>
              </a>
            </div>

            <div>
              <span className="block font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider mb-1">
                Base_Of_Operations
              </span>
              <span className="font-mono text-xs text-[#ECFDF5]">
                Riyadh, KSA // Global_Active
              </span>
            </div>

            <div>
              <span className="block font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider mb-1">
                Response_Mode
              </span>
              <span className="font-mono text-xs text-[#10B981] uppercase">
                WhatsApp_Primary // 24-48H
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (High contrast dark brutalist form) */}
        <div className="lg:col-span-7">
          <div className="bg-[#091410] border border-[#142B23] p-8 md:p-12 relative">
            
            <div className="absolute top-4 right-4 font-mono text-[9px] text-[#7E9F94] select-none tracking-widest uppercase">
              REVELATION_INBOUND_COMM_PIPELINE
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              
              {/* Submission status feedback handles */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-950/35 border border-green-700/60 text-emerald-300 font-mono text-xs flex items-center gap-3">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>COMMUNICATION LOGGED SUCCESSFULLY. SYSTEMS SYNCED. THANK YOU.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-950/35 border border-red-700/60 text-red-300 font-mono text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>FAILED VERIFICATION. SECURE REGISTRATION DEMANDS ALL FIELDS.</span>
                </div>
              )}

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-[10px] text-[#ECFDF5] uppercase tracking-wider">
                    SENDER_NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050B08] border border-[#142B23] px-4 py-3 text-[#ECFDF5] font-mono text-xs focus:outline-none focus:border-[#10B981] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-[10px] text-[#ECFDF5] uppercase tracking-wider">
                    EMAIL_ADDRESS *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#050B08] border border-[#142B23] px-4 py-3 text-[#ECFDF5] font-mono text-xs focus:outline-none focus:border-[#10B981] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Topic Segment Dropdown */}
              <div className="space-y-2">
                <label htmlFor="topic" className="block font-mono text-[10px] text-[#ECFDF5] uppercase tracking-wider">
                  INITIATIVE_TOPIC
                </label>
                <select
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#050B08] border border-[#142B23] px-4 py-3 text-[#ECFDF5] font-mono text-xs focus:outline-none focus:border-[#10B981] transition-colors cursor-pointer appearance-none"
                >
                  <option value="COLLECTIVE_DEV">COLLECTIVE DEVELOPMENT & TECH</option>
                  <option value="MENTOR_STRAT">EVERGREEN MENTORSHIP & TALENT</option>
                  <option value="TRAVEL_NOM">SPATIAL JOURNEYS & TRAVEL ARCHIVE</option>
                  <option value="PHILOS_ALIGN">PHILOSOPHICAL SYSTEM DESIGNS</option>
                </select>
              </div>

              {/* Message Block */}
              <div className="space-y-2">
                <label htmlFor="message" className="block font-mono text-[10px] text-[#ECFDF5] uppercase tracking-wider">
                  TRANSMISSION_BODY *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#050B08] border border-[#142B23] px-4 py-3 text-[#ECFDF5] font-mono text-xs focus:outline-none focus:border-[#10B981] transition-colors resize-none"
                  placeholder="Draft your philosophical or technical proposal..."
                />
              </div>

              {/* Submission Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#10B981] text-[#050B08] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-transparent hover:text-[#10B981] border border-[#10B981] transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "TRANSMITTING..." : "LOG_TRANSMISSION ➔"}
                </button>
              </div>

            </form>

            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#10B981] pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
