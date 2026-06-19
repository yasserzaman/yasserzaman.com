import { motion } from "motion/react";
import { Play, Sparkles, CheckCircle2, ShieldEllipsis, Layers, Compass } from "lucide-react";

export default function Offerings() {
  const offerings = [
    {
      num: "OFF_01",
      title: "Quality Strategy & Architecture",
      desc: "Designing end-to-end defect lifecycles, test strategy parameters, and test data management structures to prevent bottlenecks prior to system releases.",
      icon: <Layers className="w-5 h-5 text-[#10B981]" />
    },
    {
      num: "OFF_02",
      title: "API Design & Coverage",
      desc: "Validating API contracts, handling mock-to-prod context routing, and verifying database integrations for absolute correctness under load.",
      icon: <Sparkles className="w-5 h-5 text-[#10B981]" />
    },
    {
      num: "OFF_03",
      title: "Partnering & Launch Leadership",
      desc: "UAT command, workflows improvement, and hands-on guidance for technical founders looking to establish robust quality maturity before shipping.",
      icon: <Compass className="w-5 h-5 text-[#10B981]" />
    }
  ];

  const capabilityPills = [
    "Test Strategy Team Design",
    "Defect Lifecycle Modeling",
    "API Testing Contract Rules",
    "Test Data Management Systems",
    "User Acceptance Testing (UAT)",
    "Root-Cause Bug Workflows",
    "Release Assurance Control",
    "Database Flow Validation",
    "Continuous Quality Architecture"
  ];

  return (
    <section 
      id="offerings" 
      className="py-16 md:py-24 lg:py-28 px-6 md:px-16 lg:px-24 bg-[#050B08] border-b border-[#142B23] relative flex flex-col"
    >
      {/* Design Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#142B23_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      
      {/* Side structural coordinates rails */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#142B23]/10 hidden lg:block pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto space-y-10 z-10 relative">
        
        {/* Responsive Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs text-[#10B981] block uppercase tracking-[0.3em]">
            CONSULTATION & PARTNERSHIPS
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[#ECFDF5] leading-tight">
            Quality is not a phase. It is how systems <span className="italic text-[#10B981]">earn trust.</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#7E9F94] leading-relaxed font-light">
            Bringing fintech-grade rigor to technical founders. I design quality architecture, model secure defect workflows, and direct comprehensive test plans to protect system integrity prior to customer delivery.
          </p>
        </div>

        {/* 3 Col Offerings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offerings.map((off, idx) => (
            <div 
              key={idx}
              className="bg-[#091410] border border-[#142B23] p-6 relative overflow-hidden group hover:border-[#10B981]/40 transition-colors duration-300"
            >
              {/* Sleek Corner Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#10B981]/35 group-hover:border-[#10B981]/80 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#10B981]/35 group-hover:border-[#10B981]/80 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#10B981]/35 group-hover:border-[#10B981]/80 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#10B981]/35 group-hover:border-[#10B981]/80 transition-colors" />
              
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#10B981] tracking-[0.2em] block uppercase font-bold">
                    {off.num}
                  </span>
                  <div className="p-1.5 bg-[#050B08] border border-[#142B23] rounded-sm text-[#10B981]">
                    {off.icon}
                  </div>
                </div>
                
                <h4 className="font-display text-xl font-light text-[#ECFDF5]">
                  {off.title}
                </h4>
                <p className="font-sans text-[11px] md:text-xs text-[#7E9F94] leading-relaxed font-light">
                  {off.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capability Pill Box */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-widest text-[#7E9F94] uppercase">TECHNICAL CAPABILITIES // SYSTEMATIC COVERAGE</span>
            <div className="h-[1px] bg-[#142B23] flex-1" />
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {capabilityPills.map((cap, idx) => (
              <span 
                key={idx}
                className="font-mono text-[9px] tracking-widest text-[#7E9F94] bg-[#050B08] uppercase border border-[#142B23] px-3 py-1.5 transition-all duration-300 hover:text-[#10B981] hover:border-[#10B981]"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
