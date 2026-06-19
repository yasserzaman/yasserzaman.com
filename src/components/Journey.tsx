import { useState } from "react";
import { motion } from "motion/react";
import { Compass, ShieldCheck, Cpu, Milestone, Sunrise, HelpCircle } from "lucide-react";

interface JourneyProps {
  journeyPortraitUrl?: string;
}

export default function Journey({ journeyPortraitUrl }: JourneyProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#142B23] pb-4">
          <div>
            <span className="font-mono text-xs text-[#10B981] block mb-1 uppercase tracking-[0.3em]">
              THE INITIATION & EVOLUTION
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-[#ECFDF5]">
              PERSISTENT_JOURNEY
            </h2>
          </div>
          <div className="max-w-xs font-mono text-[10px] text-[#7E9F94] leading-relaxed">
            [ RECORD_ID #2026_TRANSIT ] — EXPLORATION OF THE LONG PATH TRAVERSED AND SYSTEMS UNDERSTOOD.
          </div>
        </div>

        {/* Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Image representing initial days & long path */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-[#10B981] tracking-[0.3em] uppercase">
              JOURNEY // ORIGINS
            </div>

            <div className="aspect-[3/4] border border-[#142B23] bg-[#091410] p-4 relative group select-none">
              <div className="absolute top-6 left-6 font-mono text-[9px] tracking-widest text-[#10B981] bg-[#050B08]/90 px-2 py-1 border border-[#142B23]/50 z-10">
                PLATE_04 // INITIAL_CAREER_DAYS
              </div>

              <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-widest text-[#ECFDF5] bg-[#050B08]/90 px-2 py-1 border border-[#142B23]/50 z-10">
                LONDON_REG // PARK_BENCH
              </div>

              <div className="w-full h-full bg-[#050B08] relative overflow-hidden border border-[#142B23]">
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30 z-0 text-center select-none">
                  <span className="text-left font-mono text-[8px] text-[#7E9F94]">[ TRAJECTORY_STUDY ]</span>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-light text-white italic">Initial Days</p>
                    <p className="font-mono text-[8px] tracking-widest text-[#10B981] uppercase">
                      The Long Forested Path
                    </p>
                  </div>
                  <span className="text-right font-mono text-[8px] text-[#7E9F94]">[ EST_LONG_TERM ]</span>
                </div>

                {!imageError ? (
                  <img
                    src={activeJourneyPortraitUrl}
                    alt="Yasser sitting on park bench - initial career days"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover scale-100 hover:scale-[1.03] transition-all duration-1000 relative z-10 cursor-pointer ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      console.info("Journey portrait load failed. Displaying custom pipeline backup.");
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-[#050B08] z-10 border border-[#142B23]/70">
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

              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#10B981] pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#10B981] pointer-events-none" />
            </div>

            <div className="p-4 bg-[#091410] border border-[#142B23] space-y-2">
              <span className="font-mono text-[9px] text-[#10B981] uppercase block">
                [ STRUCTURAL REFLECTION ]
              </span>
              <p className="font-sans text-xs text-[#7E9F94] leading-relaxed font-light">
                This image captures Yasser in London during his early QA and design consulting tenure. From an environment where deep precision is paramount, it outlines the long path of digital creation and business building.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative + Detailed Log Timeline */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4 font-sans text-xs md:text-sm text-[#7E9F94] leading-relaxed font-light">
              <p>
                I spent years as a <strong className="text-[#ECFDF5] font-normal">QA consultant in fintech</strong>, where an omitted edge case is not just a bug ticket—it represents real collateral and systems integrity. That period instilled a fierce architectural discipline: study the blueprints before trusting the structure, define the tests before compiling the modules, and hold absolute respect for the data.
              </p>
              <p>
                Over the years, simple questions about testing naturally grew into holistic concerns: <span className="text-[#10B981] italic">Why does this workflow exist? Can we engineer a cleaner model?</span> Quality thinking evolved into product strategy, and product strategy became a commitment to active building.
              </p>
              <p>
                Today, I operate independently: consulting on software quality, releasing open-source automation utility code, and establishing ventures in travel and structured knowledge. This is not a pivot—it is a continuous path guided by a wider intent.
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
