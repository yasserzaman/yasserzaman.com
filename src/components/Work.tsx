import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ArrowUpRight, HelpCircle, Activity, ShieldCheck, Cpu, Milestone, Sunrise, Layers, Sparkles, Compass } from "lucide-react";

interface Project {
  group: "core" | "ongoing" | "dream";
  title: string;
  status: "Active" | "Ongoing" | "Dream";
  type: string;
  ref: string;
  summary: string;
  tags: string[];
  initials: string;
  link: { label: string; url: string } | null;
  detail: {
    why: string;
    proves: string;
    stack: string;
  };
}

const PROJECTS: Project[] = [
  {
    group: "core",
    title: "Agentic Sales Report",
    status: "Active",
    type: "Autonomous AI reporting agent",
    ref: "REF_01 // AGENTIC_SALES",
    summary: "An autonomous agent that turns raw AL-Taj invoices into a reconciled sales report — matching supplier, customer, and payment records and flagging discrepancies with almost no human input.",
    tags: ["AI Agents", "Invoice Reconciliation", "Codex", "Open Source"],
    initials: "AS",
    link: { label: "View on GitHub", url: "https://github.com/yassarminhaj/agentic-sales-report" },
    detail: {
      why: "AL-Taj's monthly sales reporting meant manually reconciling supplier invoices, customer-raised invoices, and payment records by hand. This agent ingests the raw PDFs from three folders, matches them, and surfaces discrepancies for a quick human sign-off before finalizing the report — replacing a manual fintech-QA-grade reconciliation task with a lightweight autonomous workflow.",
      proves: "Runs on just 3 markdown routing files — no fine-tuning, no framework — for roughly 10,000–15,000 GPT-5.5 tokens per report. Open-sourced for reuse. Live proof that fintech-grade rigor and agentic AI engineering plug directly into a real operating business: this same agent runs AL-Taj's own books.",
      stack: "Codex-orchestrated agent · markdown-defined routing (AGENTS.md) · PDF invoice ingestion · auto-generated HTML report output"
    }
  },
  {
    group: "core",
    title: "Defect Tracker",
    status: "Active",
    type: "Software quality platform",
    ref: "REF_02 // DEFECT_TRACKER",
    summary: "A backend-led defect lifecycle platform designed to bring structure, visibility, and testability into software quality workflows.",
    tags: ["API Design", "Quality Engineering", "Defect Lifecycle", "Test Coverage"],
    initials: "DT",
    link: { label: "View on GitHub", url: "https://github.com/yassarminhaj/DefectTrackerUI-Backend" },
    detail: {
      why: "Quality teams lose defects in chat threads and spreadsheets. This platform gives the defect lifecycle a real home — workflow transitions, history, attachments, comments, and dashboards.",
      proves: "42 live API endpoints across 12 modules, 121 planned Phase-1 test cases, a 14-table schema, JWT auth, and Test/Prod/All data-context switching via X-Data-Context header.",
      stack: "Backend-led architecture · OpenAPI contract · database-backed workflow modeling · automation-ready API design"
    }
  },
  {
    group: "core",
    title: "dbCockpit",
    status: "Active",
    type: "Database maintenance utility",
    ref: "REF_03 // DB_COCKPIT",
    summary: "A local desktop console for safe database maintenance, backup, restore, reset, test data loading, and smoke-test orchestration.",
    tags: ["Tooling", "Operational Safety", "Backups", "Smoke Tests"],
    initials: "DC",
    link: { label: "View on GitHub", url: "https://github.com/yassarminhaj/dbCockpit" },
    detail: {
      why: "Database maintenance scripts are dangerous when run by hand. dbCockpit wraps them in a safe, profile-based desktop console that works even when the web app is down.",
      proves: "Project profiles, connection prerequisite validation, and one-click backup, restore, clean-data, reset, test-data load, and smoke-test runs.",
      stack: "Local desktop utility · reusable profile architecture · upload-file maintenance · independent of the web stack"
    }
  },
  {
    group: "core",
    title: "SpecWriter",
    status: "Active",
    type: "AI product discovery tool",
    ref: "REF_04 // SPEC_WRITER",
    summary: "An AI-assisted product discovery tool that helps convert rough ideas into clear requirements, architecture, and implementation-ready plans.",
    tags: ["Product Discovery", "Requirements", "AI-assisted Planning", "Business Analysis"],
    initials: "SW",
    link: { label: "Open in ChatGPT", url: "https://chatgpt.com/g/g-6a1dee702cf081919016f130010b5f14-spec-writer" },
    detail: {
      why: "Most products fail before code is written — in vague requirements. SpecWriter turns rough ideas into structured product plans, architecture diagrams, and stakeholder-friendly explainers.",
      proves: "Requirements architecture, workflow improvement, and structured documentation thinking — this very website was specified with it.",
      stack: "Custom GPT · product discovery frameworks · requirements + architecture generation"
    }
  },
  {
    group: "ongoing",
    title: "Altajtours",
    status: "Ongoing",
    type: "Spiritual travel venture",
    ref: "REF_05 // ALTAJ_TOURS",
    summary: "A travel venture shaping journeys around logistics, meaning, reflection, and transformation.",
    tags: ["Travel Design", "Umrah & Ziyarah", "Itineraries", "Service Design"],
    initials: "AT",
    link: { label: "Visit altajtours.com", url: "https://altajtours.com/" },
    detail: {
      why: "Rihla — the journey, and its telling. Altajtours designs transformative journeys: Umrah packages, Iraq and Jordan Ziyarah, visas, flights, hotels, and custom itineraries.",
      proves: "Travel product thinking, booking and itinerary workflows, and founder execution in the Middle East travel space.",
      stack: "Co-founded brand · live public website · end-to-end travel services"
    }
  },
  {
    group: "ongoing",
    title: "IMprove Software Labs",
    status: "Ongoing",
    type: "Advanced engineering incubator",
    ref: "REF_06 // IMPROVE_SOFTWARE_LABS",
    summary: "A premium software engineering and quality research lab building high-utility developer tools, automated test systems, and custom digital pipelines.",
    tags: ["QA Automation", "Developer Tools", "Systems Design", "Incident Control"],
    initials: "IM",
    link: null,
    detail: {
      why: "Engineering teams lose velocity dealing with release uncertainty and untested database schemas. IMprove Software Labs designs reliable, self-healing developer pipelines and structural validations.",
      proves: "The architectural center and official crucible behind Defect Tracker, dbCockpit, and premium commercial-grade automation systems.",
      stack: "Co-founded studio · developer utility lab · system lifecycle engineering"
    }
  },
  {
    group: "ongoing",
    title: "Corporate Travel Desk",
    status: "Ongoing",
    type: "Travel operations product",
    ref: "REF_07 // TRAVEL_DESK",
    summary: "An ongoing travel-operations concept for organizing corporate travel requests, approvals, bookings, and service visibility.",
    tags: ["Approval Flows", "Request Tracking", "B2B Service", "Operations"],
    initials: "TD",
    link: null,
    detail: {
      why: "Business travel runs on email chains and lost approvals. This desk structures requests, approvals, bookings, and traveler communication into one operational view.",
      proves: "Business workflow thinking and corporate service design, with future integration into flight, hotel, visa, and itinerary workflows.",
      stack: "In progress · workflow & approval modeling · builds on Altajtours operations"
    }
  },
  {
    group: "dream",
    title: "DarsBooks",
    status: "Ongoing",
    type: "Knowledge platform",
    ref: "REF_08 // DARS_BOOKS",
    summary: "A knowledge platform concept for transforming meaningful content into structured, searchable, and useful learning experiences.",
    tags: ["Knowledge Architecture", "Structured Learning", "Content Platform"],
    initials: "DB",
    link: null,
    detail: {
      why: "Meaningful knowledge often stays locked in long texts. DarsBooks structures it into accessible, searchable learning — the 'learn better' pillar made real.",
      proves: "Knowledge architecture and long-term mission alignment: educational, reflective, structured.",
      stack: "In progress · content modeling · learning workflow design"
    }
  },
  {
    group: "dream",
    title: "RaqsPerfumes",
    status: "Dream",
    type: "Lifestyle & fragrance brand",
    ref: "REF_09 // RAQS_PERFUMES",
    summary: "A dream fragrance venture exploring beauty, memory, culture, and meaningful lifestyle products.",
    tags: ["Lifestyle", "Fragrance", "Brand", "Culture"],
    initials: "RP",
    link: null,
    detail: {
      why: "Scent is memory. A future brand shaped by culture and meaning — held as an idea, deliberately, until its time comes.",
      proves: "The 'live with more purpose' pillar: beauty and craft as part of the same ecosystem as software and travel.",
      stack: "Dream stage · concept and identity only"
    }
  },
  {
    group: "dream",
    title: "AyahMinAyahtillah",
    status: "Dream",
    type: "Reflection & signs project",
    ref: "REF_10 // AYAH_SIGNS",
    summary: "A dream project for reflective content, journeys, and observations that help people notice meaning in the world around them.",
    tags: ["Reflection", "Travel", "Observation", "Meaning"],
    initials: "AM",
    link: null,
    detail: {
      why: "A future space for reflection, travel, and signs worth noticing — content that slows people down long enough to see.",
      proves: "The reflective thread that runs through every other project, given its own home.",
      stack: "Dream stage · editorial concept"
    }
  }
];

const PILLARS = [
  {
    ref: "SYS_PIL_01",
    title: "Work_Better",
    desc: "Software quality, structured delivery, and tools that respect people's time.",
    bullets: ["Agentic Sales Report", "Defect Tracker", "dbCockpit", "SpecWriter", "IMprove Software Labs"]
  },
  {
    ref: "SYS_PIL_02",
    title: "Travel_Better",
    desc: "Journeys designed around logistics, meaning, and transformation.",
    bullets: ["Altajtours", "Corporate Travel Desk"]
  },
  {
    ref: "SYS_PIL_03",
    title: "Learn_Better",
    desc: "Knowledge shaped into structured, accessible, useful learning.",
    bullets: ["DarsBooks", "AyahMinAyahtillah"]
  },
  {
    ref: "SYS_PIL_04",
    title: "Live_Purpose",
    desc: "Meaningful creation, beauty, service, and long-term work.",
    bullets: ["RaqsPerfumes", "The founder journey"]
  }
];

export default function Work() {
  const [activeTab, setActiveTab] = useState<"core" | "ventures" | "pillars">("core");
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // Filter projects depending on active view
  const coreProjects = PROJECTS.filter(p => p.group === "core");
  const ongoingAndDreamProjects = PROJECTS.filter(p => p.group === "ongoing" || p.group === "dream");

  // Selection syncer for desktop
  const handleProjectSelect = (p: Project) => {
    setSelectedProject(p);
  };

  const handleTabChange = (tab: "core" | "ventures" | "pillars") => {
    setActiveTab(tab);
    if (tab === "core") {
      setSelectedProject(coreProjects[0]);
    } else if (tab === "ventures") {
      setSelectedProject(ongoingAndDreamProjects[0]);
    }
  };

  // Status badge config
  const statusConfig = {
    Active: "bg-[#10B981] text-[#050B08] border-[#10B981]",
    Ongoing: "border-[#10B981] text-[#10B981] bg-transparent",
    Dream: "border-[#FBBF24] text-[#FBBF24] bg-transparent"
  };

  return (
    <section 
      id="work" 
      className="py-16 md:py-24 lg:py-28 px-6 md:px-16 lg:px-24 bg-[#10100F] border-b border-[#142B23] relative flex flex-col"
    >
      {/* Design Elements */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto space-y-6 z-10 relative flex flex-col py-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-[#142B23]/60">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#10B981] block uppercase tracking-[0.3em]">
              SELECTED WORK & EXPERIMENTAL VENTURES
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-[#ECFDF5]">
              Proof first. <span className="italic text-[#10B981]">Vision alongside.</span>
            </h2>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex bg-[#050B08] border border-[#142B23] p-1 font-mono text-[10px] uppercase tracking-wider">
            <button
              onClick={() => handleTabChange("core")}
              className={`px-4 py-2 transition-all cursor-pointer ${
                activeTab === "core" 
                  ? "bg-[#10B981] text-[#050B08] font-bold" 
                  : "text-[#7E9F94] hover:text-[#ECFDF5]"
              }`}
            >
              01// Core_Proof
            </button>
            <button
              onClick={() => handleTabChange("ventures")}
              className={`px-4 py-2 transition-all cursor-pointer ${
                activeTab === "ventures" 
                  ? "bg-[#10B981] text-[#050B08] font-bold" 
                  : "text-[#7E9F94] hover:text-[#ECFDF5]"
              }`}
            >
              02// Ventures_&_Ideas
            </button>
            <button
              onClick={() => handleTabChange("pillars")}
              className={`px-4 py-2 transition-all cursor-pointer ${
                activeTab === "pillars" 
                  ? "bg-[#10B981] text-[#050B08] font-bold" 
                  : "text-[#7E9F94] hover:text-[#ECFDF5]"
              }`}
            >
              03// Shared_Pillars
            </button>
          </div>
        </div>

        {/* ================= DESKTOP SUB-VIEWPORT PANEL (Viewport and space locked) ================= */}
        {/* List/Spec tabs stay height-locked for the scrolling layout; Pillars sizes to its content so cards don't stretch and gap. */}
        <div className={`hidden md:grid grid-cols-12 gap-6 items-stretch ${activeTab === "pillars" ? "" : "h-[56vh] min-h-[500px] xl:min-h-[560px] overflow-hidden"}`}>
          
          {/* Tab 1: Core Proof / Tab 2: Ventures & Ideas List Panel (4 columns) */}
          {(activeTab === "core" || activeTab === "ventures") && (
            <>
              <div className="col-span-4 flex flex-col gap-2.5 h-full overflow-y-auto pr-2 scrollbar-thin">
                {(activeTab === "core" ? coreProjects : ongoingAndDreamProjects).map((p, idx) => {
                  const isSelected = selectedProject.title === p.title;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleProjectSelect(p)}
                      className={`w-full text-left p-4 border transition-all duration-300 flex flex-col justify-between gap-3 shrink-0 relative overflow-hidden group cursor-pointer ${
                        isSelected 
                          ? "bg-[#091410] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.06)]" 
                          : "bg-[#050B08] border-[#142B23] hover:border-[#10B981]/40"
                      }`}
                    >
                      {/* Interactive indicator bracket */}
                      {isSelected && (
                        <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#10B981]" />
                      )}
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center gap-2">
                          <span className="font-mono text-[9px] text-[#10B981] tracking-widest uppercase">
                            {p.ref.split(" // ")[0]}
                          </span>
                          <span className={`font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-semibold scale-90 ${statusConfig[p.status]}`}>
                            {p.status}
                          </span>
                        </div>
                        
                        <h4 className="font-display text-lg font-light text-[#ECFDF5] transition-colors group-hover:text-[#10B981]">
                          {p.title}
                        </h4>
                        
                        <p className="font-sans text-[11px] text-[#7E9F94] line-clamp-2 leading-relaxed font-light">
                          {p.summary}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="font-mono text-[9px] text-[#7E9F94] tracking-tight">
                          {p.type}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 text-[#10B981] transition-transform ${
                          isSelected ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Technical Spec Blueprint Panel (8 columns) */}
              <div className="col-span-8 bg-[#091410]/50 border border-[#142B23] flex flex-col justify-between overflow-hidden relative">
                {/* Background matrix mesh for vector vibe */}
                <div className="absolute inset-0 bg-[radial-gradient(#142B23_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
                
                {/* Top Blueprint ID Rail */}
                <div className="border-b border-[#142B23]/85 bg-[#050B08]/90 px-6 py-3 flex justify-between items-center pointer-events-none z-10">
                  <span className="font-mono text-[9px] text-[#10B981] tracking-[0.2em] font-bold">
                    SYSTEM_BLUEPRINT_SPEC // {selectedProject.ref}
                  </span>
                  <span className="font-mono text-[9px] text-[#7E9F94] tracking-tight lowercase">
                    node_status: connected({selectedProject.status.toLowerCase()})
                  </span>
                </div>

                {/* Main Dynamic Blueprint Body */}
                <div className="p-6 flex-1 overflow-y-auto space-y-6 z-10 relative scrollbar-thin">
                  
                  {/* Technical Vector Representation or Title */}
                  <div className="border-b border-[#142B23] pb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest">[ SUB_SYSTEM ]</span>
                      <h3 className="font-display text-2xl lg:text-3xl font-light text-[#ECFDF5]">
                        {selectedProject.title}
                      </h3>
                      <p className="font-sans text-xs text-[#7E9F94] italic font-light">
                        {selectedProject.type}
                      </p>
                    </div>

                    {/* Vector Icon Custom renders */}
                    {selectedProject.title === "IMprove Software Labs" ? (
                      <div className="h-10 w-28 opacity-90 border border-[#142B23] bg-[#050B08] p-1 rounded-sm flex items-center justify-center">
                        <svg viewBox="0 0 450 180" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <text x="50" y="110" fontFamily='"Plus Jakarta Sans", sans-serif' fontWeight="800" fontSize="90" fill="#FFFFFF">IM</text>
                          <text x="180" y="110" fontFamily='"Plus Jakarta Sans", sans-serif' fontWeight="400" fontSize="90" fill="#C084FC">prove</text>
                        </svg>
                      </div>
                    ) : selectedProject.title === "Altajtours" ? (
                      <div className="h-10 w-28 opacity-90 border border-[#142B23] bg-[#050B08] p-1 rounded-sm flex items-center justify-center">
                        <span className="font-display font-light text-[10px] text-[#FBBF24] tracking-widest uppercase">AL - TAJ TOURS</span>
                      </div>
                    ) : (
                      <div className="h-10 w-12 rounded-sm border border-[#142B23] bg-[#050B08] text-white font-display font-light italic flex items-center justify-center text-lg">
                        {selectedProject.initials}
                      </div>
                    )}
                  </div>

                  {/* Standard Spec Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1 text-xs">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <h5 className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest font-semibold">
                          // 01. THE PROBLEM & PURPOSE
                        </h5>
                        <p className="font-sans text-[#7E9F94] leading-relaxed font-light">
                          {selectedProject.detail.why}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h5 className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest font-semibold">
                          // 02. PROOF OF WORK & OUTCOME
                        </h5>
                        <p className="font-sans text-[#7E9F94] leading-relaxed font-light">
                          {selectedProject.detail.proves}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-[#142B23] pt-4 lg:pt-0 lg:pl-6">
                      <div className="space-y-1.5">
                        <h5 className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest font-semibold">
                          // 03. SYSTEM IMPLEMENTATION
                        </h5>
                        <p className="font-sans text-[#7E9F94] leading-relaxed font-light">
                          {selectedProject.detail.stack}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest font-semibold">
                          // 04. CLASSIFICATIONS
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedProject.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="font-mono text-[8px] tracking-wider text-[#7E9F94] bg-[#050B08] border border-[#142B23] px-2 py-0.5 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Spec Footer Controls */}
                <div className="border-t border-[#142B23] bg-[#050B08]/90 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 z-10">
                  <div className="font-mono text-[9px] text-[#7E9F94] tracking-tight">
                    INTEGRITY_INDEX: [ 100_STB_METRIC ] · LICENSED OPERATIONAL UNIT
                  </div>

                  {selectedProject.link ? (
                    <a
                      href={selectedProject.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-[#10B981] hover:text-[#ECFDF5] border border-[#10B981]/30 hover:border-[#10B981] px-4 py-2 uppercase font-medium bg-[#10B981]/5 hover:bg-[#10B981]/20 transition-all duration-300 rounded-sm"
                    >
                      <span>{selectedProject.link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-[9px] tracking-widest text-[#7E9F94]/70 italic uppercase">
                      [ SPEC_LOCK_PENDING_RELEASE ]
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Tab 3: Ecosystem Pillars Panel */}
          {activeTab === "pillars" && (
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
              {PILLARS.map((pil, idx) => (
                <div
                  key={idx}
                  className="bg-[#091410] border border-[#142B23] hover:border-[#10B981]/30 p-6 flex flex-col gap-6 transition-all duration-300 relative group"
                >
                  {/* Subtle hover accent corner highlights */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#10B981]/0 group-hover:border-[#10B981]/60 transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#10B981]/0 group-hover:border-[#10B981]/60 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#10B981]/0 group-hover:border-[#10B981]/60 transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#10B981]/0 group-hover:border-[#10B981]/60 transition-all duration-300" />
                  
                  <div className="space-y-4">
                    <span className="font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider block">
                      {pil.ref}
                    </span>
                    <h4 className="font-mono text-[13px] tracking-widest text-[#10B981] uppercase font-bold">
                      {pil.title}
                    </h4>
                    <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">
                      {pil.desc}
                    </p>
                  </div>

                  <ul className="border-t border-[#142B23] pt-4 flex flex-col gap-1.5 font-mono text-[10px] text-[#ECFDF5] font-medium tracking-wide">
                    {pil.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1">
                        <span className="text-[#10B981] font-mono">//</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ================= MOBILE EXPANDABLE DISPLAY PANEL (Fluid and vertical) ================= */}
        <div className="md:hidden space-y-4">
          {activeTab === "core" && (
            <div className="space-y-3">
              {coreProjects.map((p, idx) => {
                const isExpanded = mobileExpanded === `core-${idx}`;
                return (
                  <div key={idx} className="bg-[#091410] border border-[#142B23] p-5 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-mono text-[8px] text-[#10B981] block mb-1">{p.ref.split(" // ")[0]}</span>
                        <h4 className="font-display text-lg text-[#ECFDF5] font-light">{p.title}</h4>
                      </div>
                      <span className={`font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-semibold ${statusConfig[p.status]}`}>
                        {p.status}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">{p.summary}</p>

                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="font-mono text-[8px] tracking-wider text-[#7E9F94] bg-[#050B08] border border-[#142B23] px-1.5 py-0.5 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : `core-${idx}`)}
                      className="w-full text-center py-2 bg-[#050B08] border border-[#142B23] text-[#10B981] font-mono text-[9px] uppercase tracking-widest transition-colors hover:text-white"
                    >
                      {isExpanded ? "[ Hide System Spec ]" : "[ View System Spec ]"}
                    </button>

                    {isExpanded && (
                      <div className="pt-4 border-t border-[#142B23] space-y-4 text-[11px] font-sans text-[#7E9F94] leading-relaxed font-light">
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">THE PROBLEM:</span>
                          <p>{p.detail.why}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">THE PROOF:</span>
                          <p>{p.detail.proves}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">IMPLEMENTATION:</span>
                          <p>{p.detail.stack}</p>
                        </div>
                        {p.link && (
                          <div className="pt-2">
                            <a
                              href={p.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full justify-center items-center gap-2 font-mono text-[9px] text-[#050B08] bg-[#10B981] py-2 px-3 tracking-wider font-semibold uppercase"
                            >
                              <span>{p.link.label}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "ventures" && (
            <div className="space-y-3">
              {ongoingAndDreamProjects.map((p, idx) => {
                const isExpanded = mobileExpanded === `ventures-${idx}`;
                return (
                  <div key={idx} className="bg-[#091410] border border-[#142B23] p-5 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-mono text-[8px] text-[#10B981] block mb-1">{p.ref.split(" // ")[0]}</span>
                        <h4 className="font-display text-lg text-[#ECFDF5] font-light">{p.title}</h4>
                      </div>
                      <span className={`font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-semibold ${statusConfig[p.status]}`}>
                        {p.status}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">{p.summary}</p>

                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : `ventures-${idx}`)}
                      className="w-full text-center py-2 bg-[#050B08] border border-[#142B23] text-[#10B981] font-mono text-[9px] uppercase tracking-widest transition-colors hover:text-white"
                    >
                      {isExpanded ? "[ Hide System Spec ]" : "[ View System Spec ]"}
                    </button>

                    {isExpanded && (
                      <div className="pt-4 border-t border-[#142B23] space-y-4 text-[11px] font-sans text-[#7E9F94] leading-relaxed font-light">
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">THE PROBLEM:</span>
                          <p>{p.detail.why}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">THE PROOF:</span>
                          <p>{p.detail.proves}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-[#10B981] block font-bold">IMPLEMENTATION:</span>
                          <p>{p.detail.stack}</p>
                        </div>
                        {p.link && (
                          <div className="pt-2">
                            <a
                              href={p.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full justify-center items-center gap-2 font-mono text-[9px] text-[#050B08] bg-[#10B981] py-2 px-3 tracking-wider font-semibold uppercase"
                            >
                              <span>{p.link.label}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "pillars" && (
            <div className="space-y-3">
              {PILLARS.map((pil, idx) => (
                <div key={idx} className="bg-[#091410] border border-[#142B23] p-5 space-y-4">
                  <span className="font-mono text-[8px] text-[#7E9F94] block uppercase tracking-wider">{pil.ref}</span>
                  <h4 className="font-mono text-xs tracking-wider text-[#10B981] uppercase font-bold">{pil.title}</h4>
                  <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">{pil.desc}</p>
                  
                  <div className="border-t border-[#142B23] pt-3 flex flex-wrap gap-1.5">
                    {pil.bullets.map((bullet, bIdx) => (
                      <span key={bIdx} className="font-mono text-[8px] text-[#ECFDF5] bg-[#050B08] border border-[#142B23] px-2 py-0.5">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quote Footer (Compact and visible inside the viewport) */}
        <div className="text-center pt-2 hidden md:block">
          <p className="font-sans text-xs text-[#7E9F94] font-light italic">
            "A candle lights another candle — <span className="text-[#10B981]/80 font-normal">work remains and is improved continuously.</span>"
          </p>
        </div>

      </div>
    </section>
  );
}
