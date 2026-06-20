import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const stringTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
      });
      setCurrentTime(`${stringTime} UTC`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "01. Work", id: "work" },
    { label: "02. Partnering", id: "offerings" },
    { label: "03. Mission", id: "mission" },
    { label: "04. Journey", id: "journey" },
    { label: "05. Reach out", id: "contact" },
  ];

  return (
    <>
      {/* Viewport Frame Borders */}
      <div id="v-border-top" className="fixed top-0 left-0 right-0 h-[1px] bg-[#142B23] z-45 hidden md:block" />
      <div id="v-border-bottom" className="fixed bottom-0 left-0 right-0 h-[1px] bg-[#142B23] z-45 hidden md:block" />
      <div id="v-border-left" className="fixed top-0 bottom-0 left-12 w-[1px] bg-[#142B23] z-45 hidden xl:block pointer-events-none" />
      <div id="v-border-right" className="fixed top-0 bottom-0 right-12 w-[1px] bg-[#142B23] z-45 hidden xl:block pointer-events-none" />

      {/* Top Header Navigation bar */}
      <header id="main-header" className="fixed top-0 left-0 right-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 xl:px-16 bg-[#050B08]/90 backdrop-blur-md border-b border-[#142B23] z-40">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => {
              scrollToSection("hero");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-sm border border-[#10B981]/50 bg-[#07130E] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#10B981] group-hover:bg-[#10B981] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-300">
              <span className="font-mono text-[9px] sm:text-[10px] font-black text-[#10B981] group-hover:text-[#050B08] leading-none tracking-tight select-none z-10 transition-colors duration-300">
                MYZ
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/10 to-transparent opacity-80 group-hover:opacity-0 transition-opacity" />
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#10B981]/40 group-hover:border-[#050D0A]" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#10B981]/40 group-hover:border-[#050D0A]" />
            </div>
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#10B981] group-hover:text-[#ECFDF5] transition-colors duration-300 whitespace-nowrap">
              [ YASSER ZAMAN ]
            </span>
          </button>
          <span className="hidden lg:inline-block font-mono text-[10px] text-[#10B981] bg-[#091410] px-2 py-0.5 border border-[#142B23] whitespace-nowrap">
            EST. 2026
          </span>
        </div>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-mono text-xs tracking-widest text-[#7E9F94]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer hover:text-[#10B981] transition-colors relative py-1 uppercase text-[11px] lg:text-xs whitespace-nowrap ${
                activeSection === item.id ? "text-[#10B981]" : ""
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#10B981]" />
              )}
            </button>
          ))}
        </nav>

        {/* Time Indicator & Status */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs text-[#7E9F94]">
          <span className="hidden xl:inline text-[#7E9F94]">{currentTime}</span>
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="hidden lg:inline text-[#ECFDF5] tracking-widest uppercase text-[10px] whitespace-nowrap">
              ONLINE_PORTFOLIO
            </span>
          </div>
          
          {/* Mobile hamburger toggle trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-[#10B981] border border-[#142B23] rounded bg-[#091410] hover:text-[#ECFDF5] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bg-[#050B08]/95 border-b border-[#142B23]/90 backdrop-blur-md z-30 flex flex-col p-6 space-y-6 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto font-mono"
          >
            <nav className="flex flex-col gap-3 font-mono text-xs tracking-widest text-[#7E9F94]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left cursor-pointer hover:text-[#10B981] transition-colors py-2 uppercase border-b border-[#142B23]/40 ${
                    activeSection === item.id ? "text-[#10B981] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Quotes Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="border border-[#10B981]/30 bg-[#07130F] p-4 rounded-sm space-y-4"
            >
              <div className="flex justify-between items-center border-b border-[#142B23] pb-2 text-[10px] tracking-[0.25em] text-[#10B981] uppercase font-bold select-none">
                <span>✦ WINNING PROTOCOL</span>
                <span className="animate-pulse">Active</span>
              </div>
              
              <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex gap-2.5 items-start"
                >
                  <span className="text-[#10B981] font-bold text-[10px] bg-[#0A1D16] border border-[#142B23] px-1.5 py-0.5 rounded-[2px] select-none">01</span>
                  <p className="italic text-[#ECFDF5] font-sans text-xs">"One good thing about passion is that passion is the cause of passion."</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex gap-2.5 items-start border-t border-[#142B23]/50 pt-3"
                >
                  <span className="text-[#10B981] font-bold text-[10px] bg-[#0A1D16] border border-[#142B23] px-1.5 py-0.5 rounded-[2px] select-none">02</span>
                  <p className="italic text-[#ECFDF5] font-sans text-xs">"Champions are not born, they are not made, they become."</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex gap-2.5 items-start border-t border-[#142B23]/50 pt-3"
                >
                  <span className="text-[#10B981] font-bold text-[10px] bg-[#0A1D16] border border-[#142B23] px-1.5 py-0.5 rounded-[2px] select-none">03</span>
                  <p className="italic text-[#10B981] font-sans text-xs font-semibold">"Winning has 1 rule, don't give up!"</p>
                </motion.div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-2 text-[10px] text-[#7E9F94] border-t border-[#142B23]/60 pt-4">
              <div className="flex justify-between">
                <span>SYSTEM_TIME:</span>
                <span className="text-[#ECFDF5]">{currentTime}</span>
              </div>
              <div className="flex justify-between">
                <span>METRIC_PORTAL:</span>
                <span className="text-[#10B981]">ONLINE_ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>SIGNALS:</span>
                <span>EST_2026 // STABLE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Rotated Borders - Left Margin text */}
      <div className="fixed top-20 bottom-10 left-0 w-12 hidden xl:flex flex-col justify-center items-center z-30 bg-[#050B08] font-mono select-none border-r border-[#142B23]">
        <div className="transform -rotate-90 origin-center text-[10px] tracking-[0.2em] text-[#10B981] whitespace-nowrap uppercase font-semibold flex items-center gap-3 hover:text-[#ECFDF5] transition-colors duration-300 pointer-events-auto cursor-help">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
          <span>"One good thing about passion is that passion is the cause of passion."</span>
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
        </div>
      </div>

      {/* Side Rotated Borders - Right Margin text */}
      <div className="fixed top-20 bottom-10 right-0 w-12 hidden xl:flex flex-col justify-center items-center z-30 bg-[#050B08] font-mono select-none border-l border-[#142B23]">
        <div className="transform rotate-90 origin-center text-[10px] tracking-[0.2em] text-[#10B981] whitespace-nowrap uppercase font-semibold flex items-center gap-3 hover:text-[#ECFDF5] transition-colors duration-300 pointer-events-auto cursor-help">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
          <span>"Champions are not born, they are not made, they become."</span>
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
        </div>
      </div>

      {/* Bottom Sticky bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 hidden xl:flex items-center justify-between px-16 bg-[#050B08] border-t border-[#142B23] z-30 font-mono text-[10px] text-[#7E9F94] tracking-[0.2em] uppercase">
        <div>
          <span>WORK REMAINS • IMPROVED CONTINUOUSLY</span>
        </div>
        <div className="flex items-center gap-3 text-[#ECFDF5] font-semibold bg-[#0A1A14] px-4 py-1 border border-[#10B981]/30 rounded-sm animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="text-[#10B981] font-bold">✦</span>
          <span className="text-[10px] tracking-[0.15em]">"Winning has 1 rule, don't give up!"</span>
          <span className="text-[#10B981] font-bold">✦</span>
        </div>
        <div className="flex gap-4">
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection("work"); }} className="hover:text-[#10B981] transition-colors pointer-events-auto">
            WORK // ENGINEER_PROOF
          </a>
          <span className="text-[#10B981]">[ PERSISTENCE_OF_PURPOSE ]</span>
        </div>
      </footer>
    </>
  );
}
