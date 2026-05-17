"use client";
import { useEffect, useState } from "react";
import { playSound } from "@/utils/sound";

const BiosBootScreen = ({ onComplete, soundEnabled }) => {
  const [lines, setLines] = useState([]);
  const [showPressStart, setShowPressStart] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const bootScript = [
    { text: "AMIBIOS (C) 1989 American Megatrends, Inc.", delay: 100 },
    { text: "PORTFOLIO_OS V4.2.0 (C) 2026 Developer Edition", delay: 150 },
    { text: "--------------------------------------------------", delay: 50 },
    { text: "CPU: Intel(R) Core(TM) i9-14900K @ 6.00GHz", delay: 100 },
    { text: "RAM TEST: 640KB BASE MEMORY", delay: 120 },
    { text: "          32768MB EXTENDED RAM... OK", delay: 250 },
    { text: "CACHE MEMORY L1: 1024KB / L2: 32MB... OK", delay: 100 },
    { text: "", delay: 50 },
    { text: "DETECTING HARD DRIVES...", delay: 200 },
    { text: "  PRIMARY MASTER: SSD_NVME_1TB (RESOLVED)", delay: 150 },
    { text: "  SECONDARY MASTER: CLOUD_MONGODB_ATLAS (ONLINE)", delay: 200 },
    { text: "", delay: 80 },
    { text: "LOADING SYSTEM DRIVERS...", delay: 120 },
    { text: "  NEXT.JS 16 ENGINE............. [ SUCCESS ]", delay: 80 },
    { text: "  TAILWIND CSS GRAPHICS......... [ READY ]", delay: 80 },
    { text: "  REDUX TOOLKIT DISPATCHER...... [ ONLINE ]", delay: 100 },
    { text: "", delay: 50 },
    { text: "INITIALIZING DATABASE CONNECTIVITY...", delay: 300 },
    { text: "  GET /api/skills: STATUS 200 OK (12 SKILLS RESOLVED)", delay: 150 },
    { text: "  GET /api/projects: STATUS 200 OK (4 PROJECTS RESOLVED)", delay: 150 },
    { text: "", delay: 50 },
    { text: "SYSTEM DIAGNOSTICS: 100% HEALTHY", delay: 100 },
    { text: "BOOT SEQUENCE INITIATED.", delay: 200 },
  ];

  // Auto-scroll the script lines
  useEffect(() => {
    let currentIdx = 0;
    let timer;

    const printNextLine = () => {
      if (currentIdx < bootScript.length) {
        const line = bootScript[currentIdx];
        setLines((prev) => [...prev, line.text]);
        
        // Play subtle click sound for diagnostic outputs
        if (line.text && !line.text.startsWith("-")) {
          playSound("blip", soundEnabled);
        }

        currentIdx++;
        timer = setTimeout(printNextLine, line.delay);
      } else {
        setShowPressStart(true);
      }
    };

    timer = setTimeout(printNextLine, 200);

    return () => clearTimeout(timer);
  }, [soundEnabled]);

  // Click / Enter interaction to complete boot
  const handleProceed = () => {
    if (!showPressStart || isFading) return;
    
    setIsFading(true);
    playSound("power-up", soundEnabled);

    // Request fullscreen on this user gesture — earliest valid opportunity
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch (_) {}

    // Fade out time
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleProceed();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPressStart, isFading]);

  return (
    <div
      onClick={handleProceed}
      className={`fixed inset-0 bg-[#02050e] font-terminal text-[11px] sm:text-xs md:text-sm p-4 md:p-6 z-[99999] flex flex-col justify-between select-none transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 cursor-pointer"
      }`}
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(51, 255, 51, 0.03) 0px,
          rgba(51, 255, 51, 0.03) 2px,
          transparent 2px,
          transparent 4px
        )`,
      }}
    >
      {/* Upper Logo / Metadata Section */}
      <div className="flex justify-between items-start select-none gap-2">
        <div className="space-y-1 text-text-secondary">
          <p className="text-accent-secondary font-bold font-pixel text-[10px] sm:text-xs tracking-wider">AMIBIOS</p>
          <p className="text-[9px] sm:text-[11px]">PORTFOLIO CONSOLE SET-UP UTIL</p>
        </div>
        <div className="border border-phosphor-green/30 px-2 py-1 sm:px-3 sm:py-1.5 bg-bg-secondary text-right select-none">
          <p className="font-pixel text-[8px] sm:text-[10px] text-phosphor-green">ENERGY STAR</p>
          <p className="text-[8px] sm:text-[10px] text-accent-tertiary">ECOLOGY SAVER</p>
        </div>
      </div>

      {/* Main Print Console Log */}
      <div className="flex-1 my-4 md:my-6 overflow-y-auto space-y-1 text-[#88ff88] leading-relaxed max-w-4xl scrollbar-thin scrollbar-thumb-phosphor-green/10">
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap breakdown-words">
            {line}
          </div>
        ))}
        {showPressStart && (
          <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-4 text-center py-3 sm:py-4 border-2 border-dashed border-phosphor-green/30 bg-[#071407]">
            <p className="font-pixel text-accent-primary animate-glow-pulse text-[10px] sm:text-xs md:text-sm tracking-widest insert-coin">
              ▼ SYSTEM IS INITIALIZED AND READY ▼
            </p>
            <p className="font-pixel text-phosphor-green text-[8px] sm:text-[10px] md:text-xs tracking-wide animate-blink">
              PRESS ENTER OR CLICK ANYWHERE TO START
            </p>
          </div>
        )}
      </div>

      {/* Lower Setup / Diagnostics Status bar */}
      <div className="flex justify-between items-center border-t border-phosphor-green/20 pt-3 md:pt-4 text-text-secondary text-[9px] sm:text-[11px] select-none gap-2">
        <div>
          <span>RESCUE DRIVER: ONLINE</span>
        </div>
        <div>
          <span className="text-right">PORT: 3000 (LOCAL) • STATUS: BOOTING</span>
        </div>
      </div>
    </div>
  );
};

export default BiosBootScreen;
