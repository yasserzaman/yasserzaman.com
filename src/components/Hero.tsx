import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, HelpCircle } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  imageUrl?: string;
}

export default function Hero({ onExploreClick, imageUrl }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const activeImageUrl = imageUrl || "";

  return (
    <section
      id="hero"
      className="lg:min-h-[100svh] flex flex-col justify-between items-center relative pt-20 pb-10 lg:pt-24 lg:pb-12 xl:pb-16 px-6 md:px-16 lg:px-24 bg-[#050B08] overflow-x-clip border-b border-[#142B23]"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#142B23_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      {/* Floating Abstract Element - signature of "Artistic Flair" */}
      <div className="absolute top-24 right-24 w-32 h-32 border border-[#142B23] rounded-full flex items-center justify-center pointer-events-none animate-pulse">
        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping"></div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-[#142B23]/20 hidden lg:block" />
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-[#142B23]/20 hidden lg:block" />

      <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4 lg:py-2">
        
        {/* Left Column Text details - High contrast pairing */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[#10B981] uppercase mb-2 flex items-center gap-2"
          >
            <span className="w-2 h-[1px] bg-[#10B981]" />
            <span>MOHAMMED YASSER ZAMAN</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[50px] font-light tracking-tighter leading-tight text-[#ECFDF5]"
          >
            Building systems, products, and ventures <span className="italic font-normal text-[#10B981]">shaped by purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase text-[#7E9F94] mt-2 mb-3 sm:mb-4 font-medium"
          >
            Consultant [ Software_Solutions_Engineer ]
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-l border-[#10B981]/80 pl-4 py-1 max-w-lg mb-4 sm:mb-5"
          >
            <p className="font-sans text-xs sm:text-sm md:text-sm leading-relaxed text-[#7E9F94] font-light">
              I help improve software quality, build practical tools, and shape ideas into useful products — with a mission to create work that <span className="text-[#10B981] italic font-normal">serves beyond the self</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 items-start sm:items-center font-mono"
          >
            <button
              onClick={onExploreClick}
              className="px-6 py-3 bg-[#10B981] text-[#050B08] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-transparent hover:text-[#10B981] border border-[#10B981] transition-all duration-300 flex items-center gap-3 cursor-pointer group animate-pulse-subtle"
            >
              <span>View_Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <a
              href="#contact"
              className="px-6 py-3 bg-transparent text-[#10B981] border border-[#142B23] font-mono text-xs uppercase tracking-widest hover:border-[#10B981] transition-all duration-300"
            >
              Reach_Out
            </a>
          </motion.div>
        </div>

        {/* Right Column Image frame - London Suit Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[280px] lg:max-w-[260px] xl:max-w-[290px] aspect-[3/4] border border-[#142B23] bg-[#091410] p-3 sm:p-4 relative group"
          >
            {/* Absolute minimalist labels inside frame */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#10B981] bg-[#050B08]/85 px-2 py-1 border border-[#142B23]/50 z-10 select-none">
              REF_01 // RIYADH_PORTRAIT
            </div>
            
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#ECFDF5] bg-[#050B08]/85 px-2 py-1 border border-[#142B23]/50 z-10 select-none">
              24.7136° N, 46.6753° E
            </div>

            <div className="w-full h-full bg-[#050B08] relative overflow-hidden flex flex-col justify-center items-center border border-[#142B23]">
              
              {/* Elegant Behind-Border Text Placeholder in case image doesn't load */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 opacity-40 group-hover:opacity-60 transition-opacity z-0 pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[8px] sm:text-[10px] text-white">[ EXECUTIVE PORTRAIT ]</span>
                  <span className="font-mono text-[8px] sm:text-[10px] text-[#10B981]">2026</span>
                </div>
                
                <div className="space-y-1 sm:space-y-2 text-center my-auto">
                  <h3 className="font-display text-2xl sm:text-4xl font-light italic text-[#ECFDF5]">Yasser Zaman</h3>
                  <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#10B981]">
                    Riyadh KSA Study
                  </p>
                  <p className="font-mono text-[7px] sm:text-[8px] text-[#7E9F94] mt-2 max-w-[180px] sm:max-w-[200px] mx-auto text-center font-normal leading-normal">
                    This frame renders the live portfolio portrait under a strict executive container system.
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[7px] sm:text-[8px] text-[#7E9F94]">[ SPECIMEN_A ]</span>
                  <span className="font-mono text-[7px] sm:text-[8px] text-[#7E9F94]">[ STRATEGIC_VIEW ]</span>
                </div>
              </div>

               {/* Real user image. Elegant cinematic display centered perfectly */}
              {!imageError ? (
                <img
                  src={activeImageUrl}
                  alt="Mohammed Yasser Zaman - Executive Portrait"
                  referrerPolicy="no-referrer"
                  ref={(el) => {
                    if (el && el.complete) {
                      setImageLoaded(true);
                    }
                  }}
                  className={`w-full h-full object-cover scale-[1.12] hover:scale-[1.20] transition-all duration-700 relative z-10 mix-blend-normal [@media(hover:hover)]:mix-blend-luminosity [@media(hover:hover)]:hover:mix-blend-normal cursor-crosshair ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    console.info("Image render failed, switching to modern editorial placeholder");
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 bg-[#050B08] z-10 border border-[#142B23]/70">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#10B981]/50 flex items-center justify-center text-[#10B981] mb-2 sm:mb-3 bg-[#091410]">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981]" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#10B981] mb-1 font-bold">PIPELINE_HOLD</span>
                  <p className="font-mono text-[7px] sm:text-[8px] text-[#7E9F94] max-w-[180px] sm:max-w-[220px] text-center leading-relaxed">
                    Access restricts direct display. Use the <strong className="text-[#10B981]">ASSETS_PIPELINE</strong> config at page bottom to sync.
                  </p>
                </div>
              )}

              {/* Edge Vignette Overlay to darken cluttered corners and build dramatic focal contrast */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,11,8,0)_35%,rgba(5,11,8,0.75)_100%)] z-20 pointer-events-none mix-blend-multiply" />
            </div>

            {/* Aesthetic outer brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#10B981] pointer-events-none" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#10B981] pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* Hero Bottom Info Segment */}
      <div className="w-full max-w-6xl mt-auto py-5 md:py-6 border-t border-[#142B23]/50 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 z-10 font-mono text-[9px] sm:text-[10px] uppercase text-[#7E9F94] tracking-wider">
        <div>
          <span className="block text-[#10B981] mb-1 font-bold">Proof_Projects</span>
          <span>Agentic Sales Report // Defect Tracker</span>
        </div>
        <div>
          <span className="block text-[#10B981] mb-1 font-bold">Ventures</span>
          <span>IMprove Labs // Altajtours</span>
        </div>
        <div className="hidden md:block">
          <span className="block text-[#10B981] mb-1 font-bold">Ecosystem</span>
          <span>4 pillars // one direction</span>
        </div>
        <div className="text-right">
          <span className="block text-[#10B981] mb-1 font-bold">Status</span>
          <span>Session_Stabilized // 2026</span>
        </div>
      </div>
    </section>
  );
}
