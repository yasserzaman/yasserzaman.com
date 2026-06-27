import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(dotTimer);
  }, []);

  useEffect(() => {
    let start = 0;
    const intervalTime = 20; // swift smooth increments
    
    const timer = setInterval(() => {
      start += 1.5 + Math.random() * 3.5;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            onComplete();
          }, 1000); // screen split animation duration
        }, 400); // short elegant pause at 100%
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="preloader-container"
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#050B08] p-8 md:p-16 preloader-clip select-none ${
        isLoaded ? "loaded" : ""
      }`}
    >
      <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center">
        {/* Elegant typography headline */}
        <p className="font-mono text-sm sm:text-base text-[#10B981] mb-6 uppercase tracking-[0.4em] flex justify-center items-center">
          <span>WINNING</span>
          <span className="inline-block text-left w-12 tracking-[0.2em] ml-2 text-[#10B981]">
            {".".repeat(dotCount)}
          </span>
        </p>
        
        {/* Giant high-end editorial numerical progression */}
        <div className="flex items-baseline justify-center gap-2 md:gap-4 mb-8">
          <h1 className="font-display text-[clamp(5rem,22vmin,12rem)] font-light text-[#ECFDF5] leading-none tracking-tighter">
            {String(progress).padStart(3, "0")}
          </h1>
          <span className="font-mono text-2xl md:text-4xl text-[#10B981]">%</span>
        </div>

        {/* Elegant thin progress bar */}
        <div className="w-full max-w-md h-[1px] bg-[#142B23] relative">
          <div 
            className="absolute left-0 top-0 h-full bg-[#10B981] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
