import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MissionVisionProps {
  thobePortraitUrl?: string;
}

export default function MissionVision({ thobePortraitUrl }: MissionVisionProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerImageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  const activeThobePortraitUrl = thobePortraitUrl || "";

  useEffect(() => {
    // GSAP scroll anim triggered specifically on container mount
    const container = containerRef.current;
    if (!container) return;

    // Pin or smooth motion of the image relative to viewport scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Reveal image with clip-path reveal
    if (triggerImageRef.current) {
      tl.fromTo(
        triggerImageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.4,
          ease: "power4.inOut",
        }
      );
    }

    // Parallax scroll on the inner img tag
    if (imageRef.current) {
      if (imageRef.current.complete) {
        setImageLoaded(true);
      }
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15, scale: 1.05 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Stagger text fade-ins
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
      },
    });

    if (textRef1.current && textRef2.current) {
      textTl.fromTo(
        [textRef1.current, textRef2.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: "power3.out" }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="mission"
      ref={containerRef}
      className="py-16 md:py-24 lg:py-28 px-6 md:px-16 lg:px-24 bg-[#050B08] border-b border-[#142B23] relative flex flex-col"
    >
      {/* Decorative vertical coordinates line */}
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#142B23]/30 hidden xl:block" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
        
        {/* Left Column (Asymmetrical wider split context) - The Brand Philosophy Texts */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
          
          {/* Mission Block */}
          <div ref={textRef1} className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#7E9F94]">01 // PURPOSE</span>
              <div className="h-[1px] w-12 bg-[#142B23]" />
              <span className="font-mono text-xs tracking-widest text-[#10B981] uppercase">
                THE CORE MISSION
              </span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light leading-snug text-[#ECFDF5]">
              "At the center of my work is a simple belief: <span className="italic font-normal text-[#10B981]">life is a trust</span>, ability is a responsibility, and good work should serve more than the self."
            </h2>
            
            <p className="font-sans text-xs md:text-sm leading-relaxed text-[#7E9F94] font-light max-w-2xl pl-4 border-l-2 border-[#10B981]">
              I want to use what I have been given to build, improve, and contribute in ways that benefit people.
            </p>
          </div>

          {/* Vision Block */}
          <div ref={textRef2} className="space-y-4 pt-6 border-t border-[#142B23]">
            <div className="flex items-center gap-4">
               <span className="font-mono text-xs text-[#7E9F94]">02 // ECOSYSTEMS</span>
              <div className="h-[1px] w-12 bg-[#142B23]" />
              <span className="font-mono text-xs tracking-widest text-[#10B981] uppercase">
                THE CONTINUOUS VISION
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light leading-snug text-[#ECFDF5]">
              "My vision is to build an <span className="italic font-normal text-[#10B981]">ecosystem of products</span> and services that help people work better, travel better, learn better, and live with more purpose."
            </h2>

            <p className="font-sans text-xs md:text-sm leading-relaxed text-[#7E9F94] font-light max-w-2xl pl-4 border-l-2 border-[#10B981]">
              A candle lights another candle, work remains and is improved continuously.
            </p>
          </div>
        </div>

        {/* Right Column (Narrower card split mapping) - Yasser Thobe Portrait */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-sm flex flex-col space-y-4">
            
            <div
              ref={triggerImageRef}
              className="w-full aspect-[4/5] border border-[#142B23] bg-[#091410] p-4 relative overflow-hidden group select-none"
            >
              {/* Outer corner marks */}
              <div className="absolute top-2 left-2 font-mono text-[8px] text-[#10B981] z-10">
                PLATE_02 // VALUES_STUDY
              </div>
              
              <div className="absolute bottom-2 left-2 font-mono text-[8px] text-[#10B981] z-10 uppercase">
                YASSER // ARAB_THOBE
              </div>

              {/* Absolute coordinates */}
              <div className="absolute top-2 right-2 font-mono text-[8px] text-[#ECFDF5] z-10 uppercase">
                CO_VAL.2026
              </div>

              {/* Inner wrapper */}
              <div className="w-full h-full bg-[#050B08] relative overflow-hidden border border-[#142B23]">
                {/* Behind-image text in case load is blocked */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-35 z-0 text-center select-none">
                  <div className="text-left font-mono text-[9px] text-[#7E9F94]">CORE_STUDY_ALIGN</div>
                  
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-light text-white">Yasser Portrait</p>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-[#10B981]">
                      Thobe Portrait Specimen
                    </p>
                  </div>
                  
                  <div className="text-right font-mono text-[9px] text-[#7E9F94]">VAL_ALIGN_100_STB</div>
                </div>

                 {!imageError ? (
                   <img
                    ref={imageRef}
                    src={activeThobePortraitUrl}
                    alt="Mohammed Yasser Zaman Thobe Portrait"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover scale-100 relative z-10 hover:scale-[1.03] transition-all duration-1000 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      console.info("Thobe Portrait load failed. Displaying minimalist pipeline fallback.");
                      setImageError(true);
                    }}
                  />
                 ) : (
                   <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-[#050B08] z-10 border border-[#142B23]/70">
                     <div className="w-12 h-12 rounded-full border border-[#10B981]/50 flex items-center justify-center text-[#10B981] mb-3 bg-[#091410]">
                       <HelpCircle className="w-5 h-5 text-[#10B981]" />
                     </div>
                     <span className="font-mono text-[9px] uppercase tracking-widest text-[#10B981] mb-1 font-bold">PIPELINE_HOLD</span>
                     <p className="font-mono text-[8px] text-[#7E9F94] max-w-[200px] text-center leading-relaxed">
                       Access restricts direct display. Use the <strong className="text-[#10B981]">ASSETS_PIPELINE</strong> config at page bottom to sync.
                     </p>
                   </div>
                 )}

                 {/* Edge Vignette Overlay to darken cluttered corners and build dramatic focal contrast */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,11,8,0)_40%,rgba(5,11,8,0.8)_100%)] z-20 pointer-events-none mix-blend-multiply" />
              </div>
            </div>

            {/* Captions demonstrating architectural honesty */}
            <div className="flex justify-between items-start pt-2 px-2 font-mono text-[10px] tracking-wider text-[#7E9F94] uppercase">
              <span>FIG_02: THOBE_CHRONOGRAPH</span>
              <span className="text-right text-[#10B981]">DURABLE VALUES SEED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
