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
    { path: "/", label: "Home", icon: <LuHouse size={20} /> },
    { path: "/samarpan/about", icon: <LuUser size={20} />, label: "About" },
    {
      path: "/samarpan/skills&projects",
      icon: <LuLightbulb size={20} />,
      label: "skills & projects",
    },
    {
      path: "/samarpan/contact",
      icon: <LuPhone size={20} />,
      label: "Contact",
    },
    {
      path: "/samarpan/admin/login",
      icon: <LuLock size={20} />,
      label: "Admin",
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          SS
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={
                "flex items-center space-x-2 text-sm font-medium transition-colors duration-300"
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
          </button>
          <button
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setNav(!nav)}
          >
            {nav ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>

        <div
          className={`fixed inset-y-0 right-0 w-64 bg-slate-900/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out border-l border-white/10 ${nav ? "translate-x-0" : "translate-x-full"} md:hidden`}
        >
          <div className="flex flex-col h-full pt-20 px-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setNav(false)}
                className={
                  "flex items-center space-x-4 text-lg font-medium transition-colors duration-300"
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
