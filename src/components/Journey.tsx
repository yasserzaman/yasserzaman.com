import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Compass, ShieldCheck, Cpu, Milestone, Sunrise, HelpCircle, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

interface JourneyProps {
  journeyPortraitUrl?: string;
  ceoPortraitUrl?: string;
}

export default function Journey({ journeyPortraitUrl, ceoPortraitUrl }: JourneyProps) {
  const [journeyError, setJourneyError] = useState(false);
  const [journeyLoaded, setJourneyLoaded] = useState(false);
  const [ceoError, setCeoError] = useState(false);
  const [ceoLoaded, setCeoLoaded] = useState(false);

  // Tactical slideshow states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotation cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const journeys = [
    {
      log: "LOG_01",
      icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
      title: "Quality Engineering, Fintech",
      period: "Early Milestones",
      desc: "Long-term software testing across products where correctness is non-negotiable — APIs, high-throughput databases, critical workflows, automated regression and UAT.",
    },
    {
      log: "LOG_02",
      icon: <Cpu className="w-4 h-4 text-[#10B981]" />,
      title: "From Testing to Product",
      period: "Structural Growth",
      desc: "QA roles widened into product design and technical strategy — turning quality thinking, defect insights, and failure models into pristine engineering specifications.",
    },
    {
      log: "LOG_03",
      icon: <Milestone className="w-4 h-4 text-[#10B981]" />,
      title: "Building in the Open",
      period: "Active Platforms",
      desc: "Concept and deployment of dbCockpit, Defect Tracker, and SpecWriter — high-utility tools born from real-world workflows and built for strict production efficiency.",
    },
    {
      log: "LOG_04",
      icon: <Compass className="w-4 h-4 text-[#10B981]" />,
      title: "Founding Altajtours",
      period: "Enterprise Creation",
      desc: "Co-founded and pioneered a highly reflective travel brand, managing complex logistics, spiritual itineraries, and immersive Middle Eastern pilgrim journeys.",
    },
    {
      log: "LOG_05",
      icon: <Sunrise className="w-4 h-4 text-[#10B981]" />,
      title: "The Ecosystem Ahead",
      period: "2026 & Beyond",
      desc: "Synchronizing software quality consulting, open-source utilities, and deep-value ventures into one unified direction. Guided by persistence of purpose under a shared trust.",
    },
  ];

  const activeJourneyPortraitUrl = journeyPortraitUrl || "";
  const activeCeoPortraitUrl = ceoPortraitUrl || "";

  return (
    <section
      id="journey"
      className="py-16 md:py-24 lg:py-28 px-6 md:px-16 lg:px-24 bg-[#050B08] border-b border-[#142B23] relative flex flex-col"
    >
      <div className="absolute inset-0 bg-[#050B08] opacity-15 pointer-events-none" />
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto space-y-8 md:space-y-12 z-10">
        
        {/* Header */}
        <div className="border-b border-[#142B23] pb-4">
          <span className="font-mono text-xs text-[#10B981] block mb-1 uppercase tracking-[0.3em]">
            THE INITIATION & EVOLUTION
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-[#ECFDF5]">
            PERSISTENT_JOURNEY
          </h2>
        </div>

        {/* Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Evolutionary Trajectory (Dynamic Cataloged Slideshow) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Unified Aspect 3/4 Frame */}
            <div className="aspect-[3/4] border border-[#142B23] bg-[#091410] p-4 relative group select-none">
              <div className="absolute top-6 left-6 font-mono text-[9px] tracking-widest text-[#10B981] bg-[#050B08]/90 px-2 py-1 border border-[#142B23]/50 z-20">
                {currentIndex === 0 ? "PLATE_04 // STRATEGIC_ALIGNMENT" : "PLATE_05 // INITIAL_FOUNDATIONS"}
              </div>

              <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-[#ECFDF5] bg-[#050B08]/90 px-2 py-1 border border-[#142B23]/50 z-20">
                {currentIndex === 0 ? "RIYADH_COURTYARD // THE_WALK" : "LONDON_REG // PARK_BENCH"}
              </div>

              <div className="w-full h-full bg-[#050B08] relative overflow-hidden border border-[#142B23]">
                {/* Embedded dynamic text structure in background when images are loaded */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30 z-0 text-center select-none">
                  <span className="text-left font-mono text-[8px] text-[#7E9F94]">
                    {currentIndex === 0 ? "[ STEWARDSHIP_STUDY ]" : "[ SYSTEM_FOUNDATIONS ]"}
                  </span>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-light text-white italic">
                      {currentIndex === 0 ? "Strategic Pacing" : "Initial Days"}
                    </p>
                    <p className="font-mono text-[8px] tracking-widest text-[#10B981] uppercase">
                      {currentIndex === 0 ? "The High-Angle Vision" : "The Long Forested Path"}
                    </p>
                  </div>
                  <span className="text-right font-mono text-[8px] text-[#7E9F94]">
                    {currentIndex === 0 ? "[ EST_SOVEREIGN ]" : "[ EST_LONG_TERM ]"}
                  </span>
                </div>

                {/* Main Plate: Strategic Walk (CEO Photo) */}
                <motion.img
                  src={activeCeoPortraitUrl}
                  alt="Yasser walking deliberately captured from executive vantage point"
                  referrerPolicy="no-referrer"
                  ref={(el) => {
                    if (el && el.complete) setCeoLoaded(true);
                  }}
                  animate={{
                    opacity: currentIndex === 0 && !ceoError && ceoLoaded ? 1 : 0,
                    scale: currentIndex === 0 ? [1.0, 1.08] : 1.00,
                  }}
                  transition={{
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: {
                      duration: currentIndex === 0 ? 6.0 : 1.2,
                      ease: "easeOut"
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10 cursor-pointer"
                  onLoad={() => setCeoLoaded(true)}
                  onError={() => setCeoError(true)}
                  style={{
                    pointerEvents: currentIndex === 0 ? "auto" : "none"
                  }}
                />

                {/* Main Plate: Origins London Bench (Journey Photo) */}
                <motion.img
                  src={activeJourneyPortraitUrl}
                  alt="Yasser sitting on park bench - initial career days in London"
                  referrerPolicy="no-referrer"
                  ref={(el) => {
                    if (el && el.complete) setJourneyLoaded(true);
                  }}
                  animate={{
                    opacity: currentIndex === 1 && !journeyError && journeyLoaded ? 1 : 0,
                    scale: currentIndex === 1 ? [1.0, 1.08] : 1.00,
                  }}
                  transition={{
                    opacity: { duration: 1.2, ease: "easeInOut" },
                    scale: {
                      duration: currentIndex === 1 ? 6.0 : 1.2,
                      ease: "easeOut"
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10 cursor-pointer pointer-events-none"
                  onLoad={() => setJourneyLoaded(true)}
                  onError={() => setJourneyError(true)}
                  style={{
                    pointerEvents: currentIndex === 1 ? "auto" : "none"
                  }}
                />

                {/* Fallbacks if error exists */}
                {((currentIndex === 0 && ceoError) || (currentIndex === 1 && journeyError)) && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-[#050B08] z-30 border border-[#142B23]/70">
                    <div className="w-12 h-12 rounded-full border border-[#10B981]/50 flex items-center justify-center text-[#10B981] mb-2 bg-[#091410]">
                      <HelpCircle className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#10B981] mb-1 font-bold">PIPELINE_HOLD</span>
                    <p className="font-mono text-[8px] text-[#7E9F94] max-w-[200px] text-center leading-relaxed">
                      Access restricts direct display. Use the <strong className="text-[#10B981]">ASSETS_PIPELINE</strong> config at page bottom to sync.
                    </p>
                  </div>
                )}

                {/* Edge Vignette Overlay to darken cluttered corners and build dramatic focal contrast */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,11,8,0)_50%,rgba(5,11,8,0.75)_100%)] z-20 pointer-events-none mix-blend-multiply" />
              </div>

              {/* Holographic Brutalist Corner Handles */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#10B981] pointer-events-none" />
            </div>

            {/* Mini Player Dashboard */}
            <div className="flex items-center justify-between font-mono text-[9px] text-[#7E9F94] bg-[#091410] border border-[#142B23] p-2.5">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                title={isPlaying ? "Pause autoplay rotation" : "Start autoplay rotation"}
              >
                {isPlaying ? (
                  <span className="flex items-center gap-1.5 text-[#10B981]">
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
                    [ PLAYBACK_ACTIVE ]
                  </span>
                ) : (
                  <span className="text-[#a1a1aa]">[ PLAYBACK_PAUSED ]</span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
                    setIsPlaying(false);
                  }}
                  className="hover:text-white border border-[#142B23] px-1.5 py-0.5 bg-[#050B08] hover:bg-[#142B23]/30 transition-all select-none lowercase"
                >
                  prev
                </button>
                <span className="text-[#10B981] tracking-widest px-1 font-bold">
                  {currentIndex + 1} / 2
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
                    setIsPlaying(false);
                  }}
                  className="hover:text-white border border-[#142B23] px-1.5 py-0.5 bg-[#050B08] hover:bg-[#142B23]/30 transition-all select-none lowercase"
                >
                  next
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Narrative + Detailed Log Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4 font-sans text-xs md:text-sm text-[#7E9F94] leading-relaxed font-light">
              <p>
                I spent years establishing high-throughput assurance standards as a <strong className="text-[#ECFDF5] font-normal">Solutions Architect and Quality Consultant</strong> within precision ecosystems. In environments where microsecond lapses translate into millions, you develop a rare, strict discipline: map the structural constraints, audit database paths, design fail-safes, and hold absolute respect for operational integrity.
              </p>
              <p>
                As systems grow, simple tactical questions naturally evolve into holistic concerns: <span className="text-[#10B981] italic">Why does this workflow exist? Can we engineer a cleaner model?</span> For me, quality engineering matured naturally into strategic stewardship, transforming technical oversight into high-level advisory value and modern sovereign ventures.
              </p>
              <p>
                Today, I operate with deliberate pacing and uncompromised autonomy—partnering on selective high-level software architectures, releasing robust modular tools like <span className="text-[#ECFDF5] font-medium">dbCockpit</span> and <span className="text-[#ECFDF5] font-medium">SpecWriter</span>, and advising on venture-level travel systems. My path is defined by a singular rule: to elevate systems and spaces, engineering with precise intent.
              </p>
            </div>

            {/* Custom Vertical Monospace log timeline */}
            <div className="pt-8 border-t border-[#142B23] space-y-8 relative">
              
              {/* Vertical timeline line */}
              <div className="absolute left-[15px] top-10 bottom-4 w-[1px] bg-gradient-to-b from-[#10B981] to-[#142B23]/20" />

              {journeys.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative pl-10 group"
                >
                  {/* Timeline Node Point */}
                  <div className="absolute left-0 top-1 w-[32px] h-[32px] rounded-full bg-[#050B08] border border-[#142B23] group-hover:border-[#10B981] flex items-center justify-center transition-colors duration-300 z-10 shadow-lg">
                    {item.icon}
                  </div>

                  <div className="bg-[#091410]/50 border border-[#142B23] hover:border-[#10B981]/40 p-5 transition-colors duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#10B981] bg-[#050B08] px-2 py-0.5 border border-[#142B23]">
                          {item.log}
                        </span>
                        <h4 className="font-display text-lg text-[#ECFDF5] font-light">
                          {item.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] text-[#7E9F94] uppercase tracking-wider">
                        {item.period}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
