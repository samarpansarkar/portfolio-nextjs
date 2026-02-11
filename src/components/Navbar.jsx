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
    { path: "/", label: "HOME", icon: <LuHouse size={18} /> },
    { path: "/samarpan/about", icon: <LuUser size={18} />, label: "ABOUT" },
    {
      path: "/samarpan/skills&projects",
      icon: <LuLightbulb size={18} />,
      label: "SKILLS",
    },
    {
      path: "/samarpan/contact",
      icon: <LuPhone size={18} />,
      label: "CONTACT",
    },
    {
      path: "/samarpan/admin/login",
      icon: <LuLock size={18} />,
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-2" : "glass-heavy py-3"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Arcade Score Bar */}
        <div className="flex justify-between items-center mb-2">
          <div className="font-terminal text-phosphor-green text-xs md:text-sm tracking-wider">
            PLAYER 1
          </div>
          <div className="font-terminal text-accent-tertiary text-xs md:text-sm tracking-wider">
            HIGH SCORE: 999999
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="group relative"
          >
            <div className="font-pixel text-lg md:text-xl text-gradient animate-glow-pulse hover:scale-110 transition-transform">
              <span className="text-accent-primary">S</span>
              <span className="text-accent-secondary">S</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group relative px-4 py-2"
              >
                <div className="flex items-center space-x-2 font-pixel text-xs text-text-primary group-hover:text-accent-primary transition-colors duration-200">
                  <span className="text-accent-secondary group-hover:text-accent-primary transition-colors">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            ))}

            {/* Theme Toggle - Arcade Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-3 pixel-border-yellow bg-bg-secondary hover:bg-accent-tertiary hover:text-bg-primary transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 pixel-border bg-bg-secondary text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />}
            </button>
            <button
              className="p-2 pixel-border-pink bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all duration-200"
              onClick={() => setNav(!nav)}
              aria-label="Toggle Menu"
            >
              {nav ? <LuX size={20} /> : <LuMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Arcade Style */}
      <div
        className={`fixed inset-y-0 right-0 w-72 pixel-border-pink bg-bg-secondary transform transition-transform duration-300 ease-in-out ${nav ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="flex flex-col h-full pt-24 px-6 space-y-2">
          {/* Menu Title */}
          <div className="font-pixel text-center text-accent-primary text-sm mb-6 pb-4 border-b-2 border-accent-primary">
            === MENU ===
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setNav(false)}
              className="group pixel-border p-4 bg-bg-primary hover:bg-accent-primary hover:text-bg-primary transition-all duration-200"
            >
              <div className="flex items-center space-x-4 font-pixel text-xs text-text-primary group-hover:text-bg-primary">
                <span className="text-accent-primary group-hover:text-bg-primary">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </div>
            </Link>
          ))}

          {/* Footer */}
          <div className="mt-auto pb-8 font-terminal text-phosphor-green text-center text-sm">
            <p>▲ SELECT OPTION ▲</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {nav && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setNav(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
