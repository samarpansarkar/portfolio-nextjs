"use client";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuHouse,
  LuLightbulb,
  LuLock,
  LuMenu,
  LuMoon,
  LuPhone,
  LuSun,
  LuUser,
  LuX,
} from "react-icons/lu";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { path: "/", label: "HOME", icon: <LuHouse size={16} /> },
    { path: "/samarpan/about", icon: <LuUser size={16} />, label: "ABOUT" },
    {
      path: "/samarpan/skills&projects",
      icon: <LuLightbulb size={16} />,
      label: "SKILLS",
    },
    {
      path: "/samarpan/contact",
      icon: <LuPhone size={16} />,
      label: "CONTACT",
    },
    {
      path: "/samarpan/admin/login",
      icon: <LuLock size={16} />,
      label: "ADMIN",
    },
  ];

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
        {/* Arcade Score Bar */}
        <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-accent-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-phosphor-green animate-glow-pulse"></div>
            <span className="font-terminal text-phosphor-green text-xs md:text-sm tracking-widest">
              1UP
            </span>
          </div>
          <div className="font-terminal text-accent-primary text-xs md:text-sm tracking-widest score-display">
            {scrolled ? "SCROLLING..." : "READY"}
          </div>
          <div className="font-terminal text-accent-tertiary text-xs md:text-sm tracking-widest">
            HI 999999
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex justify-between items-center">
          {/* Logo - Enhanced */}
          <Link href="/" className="group relative">
            <div className="flex items-center gap-2">
              <div className="font-pixel text-lg md:text-xl text-gradient animate-glow-pulse hover:scale-110 transition-transform duration-200">
                <span className="text-accent-primary">S</span>
                <span className="text-accent-secondary">S</span>
              </div>
              <div className="hidden md:block">
                <div className="font-terminal text-phosphor-green text-xs">
                  DEV.EXE
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-1 bg-linear-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                className="group relative"
              >
                {/* Pixel Button Container */}
                <div className="relative px-2.5 py-1.5 bg-bg-secondary border-2 border-accent-primary/30 hover:border-accent-primary transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                  <div className="flex items-center gap-2 font-pixel text-[10px] text-text-secondary group-hover:text-accent-primary transition-colors duration-200">
                    <span className="text-accent-secondary group-hover:text-accent-primary transition-colors">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>

                  {/* Scanline effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>

                {/* Pixel shadow effect */}
                <div className="absolute inset-0 bg-accent-primary/20 translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}

            {/* Theme Toggle - Enhanced Arcade Button */}
            <button
              onClick={toggleTheme}
              className="relative ml-2 p-2 bg-bg-secondary border-3 border-accent-tertiary hover:bg-accent-tertiary hover:text-bg-primary transition-all duration-200 hover:-translate-y-1 active:translate-y-0 group"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <LuSun size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <LuMoon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              )}
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent-tertiary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </button>
          </div>

          {/* Mobile Controls - Enhanced */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-accent-primary bg-bg-secondary text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
            </button>
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

      {/* Mobile Menu - Enhanced Arcade Style */}
      <div
        className={`fixed inset-y-0 right-0 w-80 border-l-4 border-accent-secondary bg-bg-primary transform transition-transform duration-300 ease-in-out ${nav ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-6 bg-bg-secondary border-b-4 border-accent-primary">
            <div className="font-pixel text-center text-accent-primary text-sm mb-2">
              ═══ MENU ═══
            </div>
            <div className="font-terminal text-phosphor-green text-center text-xs">
              SELECT STAGE
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setNav(false)}
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
                  {/* Pixel indicator */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-secondary group-hover:bg-bg-primary opacity-0 group-hover:opacity-100 transition-opacity animate-blink"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 bg-bg-secondary border-t-4 border-accent-primary">
            <div className="font-terminal text-phosphor-green text-center text-sm space-y-1">
              <p className="animate-blink">▲ ▼ SELECT</p>
              <p className="text-xs text-accent-primary">PRESS START</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Enhanced */}
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
