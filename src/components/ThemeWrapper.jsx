"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import TerminalDrawer from "./TerminalDrawer";
import BiosBootScreen from "./BiosBootScreen";
import { playSound } from "@/utils/sound";

// Create context for sharing settings and states globally
const ThemeSettingsContext = createContext({
  soundEnabled: true,
  setSoundEnabled: () => {},
  crtEnabled: true,
  setCrtEnabled: () => {},
  isTerminalOpen: false,
  setIsTerminalOpen: () => {},
});

export const useThemeSettings = () => useContext(ThemeSettingsContext);

export default function ThemeWrapper({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [hasBooted, setHasBooted] = useState(true); // Default to true, load on client mount
  const [isMounted, setIsMounted] = useState(false);

  // Refs for tracking tactile scrolling and mouse hover memory
  const lastHoveredRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  // Synchronize with sessionStorage and apply CRT body class
  useEffect(() => {
    setIsMounted(true);

    // Persisted Sound Settings - Defaults to true for all new sessions
    const localSound = sessionStorage.getItem("soundEnabled");
    if (localSound !== null) {
      setSoundEnabled(localSound === "true");
    } else {
      setSoundEnabled(true);
      sessionStorage.setItem("soundEnabled", "true");
    }

    // Persisted CRT Settings - Defaults to true for all new sessions
    const localCrt = sessionStorage.getItem("crtEnabled");
    if (localCrt !== null) {
      const active = localCrt === "true";
      setCrtEnabled(active);
      if (active) document.body.classList.add("crt-active");
    } else {
      // Default to ON for retro vibes!
      setCrtEnabled(true);
      document.body.classList.add("crt-active");
      sessionStorage.setItem("crtEnabled", "true");
    }

    // Single BIOS boot check per tab session
    const sessionBoot = sessionStorage.getItem("hasBooted");
    if (sessionBoot !== "true") {
      setHasBooted(false);
    }
  }, []);

  // Update Body class when CRT toggle changes
  useEffect(() => {
    if (!isMounted) return;
    if (crtEnabled) {
      document.body.classList.add("crt-active");
    } else {
      document.body.classList.remove("crt-active");
    }
    sessionStorage.setItem("crtEnabled", crtEnabled.toString());
  }, [crtEnabled, isMounted]);

  // Sync sound settings with sessionStorage
  useEffect(() => {
    if (!isMounted) return;
    sessionStorage.setItem("soundEnabled", soundEnabled.toString());
  }, [soundEnabled, isMounted]);

  // Helper: check if element or its parents are interactive
  const findInteractiveParent = (el) => {
    let current = el;
    while (current && current !== document.body) {
      const tagName = current.tagName;
      if (tagName === "BUTTON" || tagName === "A" || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
        return current;
      }
      if (current.getAttribute && current.getAttribute("role") === "button") {
        return current;
      }
      if (current.classList && (
        current.classList.contains("cursor-pointer") ||
        current.classList.contains("retro-btn") ||
        current.classList.contains("retro-card")
      )) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  };

  // 1. Global Click & Hover Sound Listeners
  useEffect(() => {
    if (!isMounted || !soundEnabled) return;

    const handleMouseOver = (e) => {
      const interactive = findInteractiveParent(e.target);
      if (interactive) {
        // Prevent playing multiple blips for drifting within the same element
        if (lastHoveredRef.current !== interactive) {
          lastHoveredRef.current = interactive;
          playSound("blip", true);
        }
      } else {
        lastHoveredRef.current = null;
      }
    };

    const handleClick = (e) => {
      const interactive = findInteractiveParent(e.target);
      if (interactive) {
        playSound("coin", true);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [isMounted, soundEnabled]);

  // 2. Global Scroll Wheel Tactile Ticks
  useEffect(() => {
    if (!isMounted || !soundEnabled) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - lastScrollYRef.current);
      const now = Date.now();

      // Trigger scroll mechanical click every 60px of vertical travel
      // Throttled to a maximum frequency of once per 60ms to prevent browser sound overlapping
      if (diff >= 60 && now - lastScrollTimeRef.current >= 60) {
        playSound("tick", true);
        lastScrollYRef.current = currentY;
        lastScrollTimeRef.current = now;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, soundEnabled]);

  // 3. Global Keyboard Mechanical Sounds (Tab, Enter, Space) and [ ` ] hotkey
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e) => {
      // Backtick [ ` ] key toggles Terminal Drawer
      if (e.key === "`" || e.key === "Backquote") {
        const activeElem = document.activeElement;
        if (activeElem && (activeElem.tagName === "INPUT" || activeElem.tagName === "TEXTAREA" || activeElem.isContentEditable)) {
          return;
        }
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      // Keyboard feedback triggers when sound is active
      if (!soundEnabled) return;

      // Tab mechanical key step
      if (e.key === "Tab") {
        playSound("blip", true);
      }
      // Enter key confirm click
      else if (e.key === "Enter") {
        playSound("coin", true);
      }
      // Space key blip (avoid trigger when typing in inputs/textareas)
      else if (e.key === " ") {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
          return;
        }
        playSound("blip", true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMounted, soundEnabled]);

  // Complete BIOS boot
  const handleBootComplete = () => {
    setHasBooted(true);
    sessionStorage.setItem("hasBooted", "true");
  };

  const contextValue = {
    soundEnabled,
    setSoundEnabled,
    crtEnabled,
    setCrtEnabled,
    isTerminalOpen,
    setIsTerminalOpen,
  };

  // Avoid Hydration mismatch issues by rendering children immediately on SSR, 
  // but overlaying loader screen only after client-side check.
  if (!isMounted) {
    return <div className="contents">{children}</div>;
  }

  return (
    <ThemeSettingsContext.Provider value={contextValue}>
      {!hasBooted ? (
        <BiosBootScreen onComplete={handleBootComplete} soundEnabled={soundEnabled} />
      ) : (
        <div className="contents">
          {children}
          <TerminalDrawer
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            soundEnabled={soundEnabled}
          />
        </div>
      )}
    </ThemeSettingsContext.Provider>
  );
}
