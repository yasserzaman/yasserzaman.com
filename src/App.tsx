import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import MissionVision from "./components/MissionVision";
import Work from "./components/Work";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Offerings from "./components/Offerings";
import ChatWidget from "./components/ChatWidget";

// Import compiled high-end editorial local assets
import heroPortrait from "./assets/images/yasser_hero_portrait.jpg";
import officePortrait from "./assets/images/yasser_office_portrait.jpg";
import journeyPortrait from "./assets/images/yasser_journey_portrait.jpg";
import ceoPortrait from "./assets/images/the_ceoShot.jpg";

const DEFAULT_LINKS = {
  hero: heroPortrait,
  office: officePortrait,
  journey: journeyPortrait,
  ceo: ceoPortrait
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  const images = DEFAULT_LINKS;

  // Track scroll position to update navigation active highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "work", "offerings", "mission", "journey", "contact"];
      const scrollPos = window.scrollY + 200; // Offset for triggers

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll implementation
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };


  return (
    <div className="relative min-h-screen bg-[#10100F] text-[#F4F4F3] selection:bg-[#F4F4F3] selection:text-[#10100F]">
      
      {/* 0-100% Fullscreen Sequential Monospace Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Primary Application Nodes */}
      {!showPreloader && (
        <div className="animate-fade-in relative">
          
          {/* Framed Core borders & locked monospace menus */}
          <Navigation 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
          />

          {/* Page segments split clearly according to guidelines */}
          <main className="md:px-12 xl:px-12 pb-16">
            
            {/* HERO SEGMENT */}
            <Hero 
              onExploreClick={() => scrollToSection("work")} 
              imageUrl={images.hero} 
            />

            {/* INTEGRATED SOFTWARE WORK & CONSULTING PRODUCTS SEGMENT */}
            <Work />

            {/* NEW OFFERINGS SECTION - CONSULTATION & PARTNERSHIPS */}
            <Offerings />

            {/* CORE TRUST - ASYMMETRICAL MISSION & VISION split layout with executive office portrait */}
            <MissionVision officePortraitUrl={images.office} />

            {/* INCEPTION & TRAJECTORY - PERSISTENT JOURNEY GRID WITH PARK PORTRAIT & CEO SHOT */}
            <Journey journeyPortraitUrl={images.journey} ceoPortraitUrl={images.ceo} />

            {/* CONTACT ENGINE - REACH OUT BENTO SETUP */}
            <Contact />

          </main>

          {/* Floating AI assistant / gatekeeper */}
          <ChatWidget />

        </div>
      )}
    </div>
  );
}
