import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Stagger text fade-ins on scroll into view
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

      <div className="w-full max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-10">

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
      </div>
    </section>
  );
}
