"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuGamepad2,
  LuHouse,
  LuLightbulb,
  LuLock,
  LuMenu,
  LuPhone,
  LuUser,
  LuX,
  LuVolume2,
  LuVolumeX,
  LuTv,
  LuTerminal,
  LuMonitor,
  LuMaximize2,
  LuMinimize2,
} from "react-icons/lu";
import { navbarData } from "@/database/Navbar";
import { useThemeSettings } from "@/components/ThemeWrapper";
import { playSound } from "@/utils/sound";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    soundEnabled,
    setSoundEnabled,
    crtEnabled,
    setCrtEnabled,
    isTerminalOpen,
    setIsTerminalOpen,
    isFullscreen,
    toggleFullscreen,
  } = useThemeSettings();

  const navLinks = navbarData.navLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-1.5" : "glass-heavy py-2"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-accent-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-phosphor-green animate-glow-pulse"></div>
            <span className="font-terminal text-phosphor-green text-xs md:text-sm tracking-widest">
              {navbarData.playerText}
            </span>
          </div>
          <div className="font-terminal text-accent-primary text-xs md:text-sm tracking-widest score-display">
            {scrolled ? "SCROLLING..." : "READY"}
          </div>
          <div className="font-terminal text-accent-tertiary text-xs md:text-sm tracking-widest">
            {navbarData.highScore}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/" className="group relative">
            <div className="flex items-center gap-2">
              <div className="font-pixel text-lg md:text-xl text-gradient animate-glow-pulse hover:scale-110 transition-transform duration-200">
                <span className="text-accent-primary">{navbarData.logoText1}</span>
                <span className="text-accent-secondary">{navbarData.logoText2}</span>
              </div>
              <div className="hidden md:block">
                <div className="font-terminal text-phosphor-green text-xs">
                  {navbarData.logoSubtext}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                className="group relative"
                onMouseEnter={() => playSound("blip", soundEnabled)}
                onClick={() => playSound("coin", soundEnabled)}
              >
                <div className="relative px-2.5 py-1.5 bg-bg-secondary border-2 border-accent-primary/30 hover:border-accent-primary transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                  <div className="flex items-center gap-2 font-pixel text-[10px] text-text-secondary group-hover:text-accent-primary transition-colors duration-200">
                    <span className="text-accent-secondary group-hover:text-accent-primary transition-colors">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>

                <div className="absolute inset-0 bg-accent-primary/20 translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}

            {/* Separator line */}
            <div className="w-[2px] h-6 bg-accent-primary/25 mx-2"></div>

            {/* Terminal Drawer switch */}
            <button
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`p-2 border-2 transition-all duration-200 cursor-pointer ${
                isTerminalOpen
                  ? "border-accent-secondary bg-accent-secondary text-bg-primary"
                  : "border-accent-secondary/40 bg-bg-secondary text-accent-secondary hover:border-accent-secondary hover:text-accent-secondary"
              }`}
              title="Toggle Interactive Shell [ ` ]"
            >
              <LuTerminal size={12} className={isTerminalOpen ? "animate-blink" : ""} />
            </button>

            {/* Sarkar OS return button */}
            <button
              onClick={() => {
                playSound("power-up", soundEnabled);
                window.location.href = "/os";
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className="p-2 border-2 border-[#c0c0c0]/40 bg-bg-secondary text-[#c0c0c0] hover:border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition-all duration-200 cursor-pointer"
              title="Open Sarkar OS Desktop"
            >
              <LuMonitor size={12} />
            </button>

            {/* Fullscreen toggle button */}
            <button
              onClick={() => {
                playSound("coin", soundEnabled);
                toggleFullscreen();
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`p-2 border-2 transition-all duration-200 cursor-pointer ${
                isFullscreen
                  ? "border-accent-tertiary bg-accent-tertiary text-bg-primary"
                  : "border-accent-tertiary/40 bg-bg-secondary text-accent-tertiary hover:border-accent-tertiary hover:text-accent-tertiary"
              }`}
              title={isFullscreen ? "Exit Fullscreen [F11]" : "Enter Fullscreen [F11]"}
            >
              {isFullscreen ? <LuMinimize2 size={12} /> : <LuMaximize2 size={12} />}
            </button>

            {/* CRT Screen switcher */}
            <button
              onClick={() => {
                setCrtEnabled(!crtEnabled);
                playSound("coin", soundEnabled);
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`p-2 border-2 transition-all duration-200 cursor-pointer ${
                crtEnabled
                  ? "border-accent-primary bg-accent-primary text-bg-primary"
                  : "border-accent-primary/40 bg-bg-secondary text-accent-primary hover:border-accent-primary hover:text-accent-primary"
              }`}
              title="Toggle Retro CRT Scanlines & Curved Screen Mode"
            >
              <LuTv size={12} />
            </button>

            {/* Sound effects switcher */}
            <button
              onClick={() => {
                const target = !soundEnabled;
                setSoundEnabled(target);
                if (target) {
                  playSound("coin", true);
                }
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`p-2 border-2 transition-all duration-200 cursor-pointer ${
                soundEnabled
                  ? "border-accent-tertiary bg-accent-tertiary text-bg-primary"
                  : "border-accent-tertiary/40 bg-bg-secondary text-accent-tertiary hover:border-accent-tertiary hover:text-accent-tertiary"
              }`}
              title="Toggle Sound Effects Synth"
            >
              {soundEnabled ? <LuVolume2 size={12} /> : <LuVolumeX size={12} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 border-2 border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all duration-200"
              onClick={() => setNav(!nav)}
              aria-label="Toggle Menu"
            >
              {nav ? <LuX size={18} /> : <LuMenu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-80 border-l-4 border-accent-secondary bg-bg-primary transform transition-transform duration-300 ease-in-out ${nav ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 bg-bg-secondary border-b-4 border-accent-primary">
            <div className="font-pixel text-center text-accent-primary text-sm mb-2">
              ═══ MENU ═══
            </div>
            <div className="font-terminal text-phosphor-green text-center text-xs">
              SELECT STAGE
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                onMouseEnter={() => playSound("blip", soundEnabled)}
                onClick={() => {
                  playSound("coin", soundEnabled);
                  setNav(false);
                }}
                className="group block"
              >
                <div className="relative p-4 bg-bg-secondary border-3 border-accent-primary hover:bg-accent-primary hover:border-accent-secondary transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-pixel text-xs text-text-primary group-hover:text-bg-primary transition-colors">
                      <span className="text-accent-primary group-hover:text-bg-primary text-lg">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <span className="font-terminal text-accent-tertiary group-hover:text-bg-primary text-xs">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-secondary group-hover:bg-bg-primary opacity-0 group-hover:opacity-100 transition-opacity animate-blink"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile settings panel */}
          <div className="px-4 py-3 bg-[#0a0f26]/90 border-t-2 border-accent-secondary flex justify-around items-center gap-2 select-none">
            <button
              onClick={() => {
                setIsTerminalOpen(!isTerminalOpen);
                setNav(false);
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className="flex-1 p-2 border border-accent-secondary text-accent-secondary bg-bg-secondary font-pixel text-[8px] flex items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-transform"
            >
              <LuTerminal size={10} />
              <span>SHELL</span>
            </button>
            {/* Mobile OS return button */}
            <button
              onClick={() => {
                playSound("power-up", soundEnabled);
                sessionStorage.removeItem("osDismissed");
                setIsDesktopOpen(true);
                setNav(false);
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className="flex-1 p-2 border border-[#c0c0c0]/50 text-[#c0c0c0] bg-bg-secondary font-pixel text-[8px] flex items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-transform"
            >
              <LuMonitor size={10} />
              <span>OS</span>
            </button>
            <button
              onClick={() => {
                setCrtEnabled(!crtEnabled);
                playSound("coin", soundEnabled);
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`flex-1 p-2 border font-pixel text-[8px] flex items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-transform ${
                crtEnabled
                  ? "border-accent-primary bg-accent-primary text-bg-primary"
                  : "border-accent-primary/50 text-accent-primary bg-bg-secondary"
              }`}
            >
              <LuTv size={10} />
              <span>CRT</span>
            </button>
            <button
              onClick={() => {
                const target = !soundEnabled;
                setSoundEnabled(target);
                if (target) {
                  playSound("coin", true);
                }
              }}
              onMouseEnter={() => playSound("blip", soundEnabled)}
              className={`flex-1 p-2 border font-pixel text-[8px] flex items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-transform ${
                soundEnabled
                  ? "border-accent-tertiary bg-accent-tertiary text-bg-primary"
                  : "border-accent-tertiary/50 text-accent-tertiary bg-bg-secondary"
              }`}
            >
              {soundEnabled ? <LuVolume2 size={10} /> : <LuVolumeX size={10} />}
              <span>SOUND</span>
            </button>
          </div>

          <div className="p-6 bg-bg-secondary border-t-4 border-accent-primary">
            <div className="font-terminal text-phosphor-green text-center text-sm space-y-1">
              <p className="animate-blink">▲ ▼ SELECT</p>
              <p className="text-xs text-accent-primary">PRESS START</p>
            </div>
          </div>
        </div>
      </div>

      {nav && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-40"
          onClick={() => setNav(false)}
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 240, 255, 0.03) 0px,
              rgba(0, 240, 255, 0.03) 2px,
              transparent 2px,
              transparent 4px
            )`,
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
