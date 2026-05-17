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
  isFullscreen: false,
  toggleFullscreen: () => {},
});

export const useThemeSettings = () => useContext(ThemeSettingsContext);

export default function ThemeWrapper({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [hasBooted, setHasBooted] = useState(true); // Default to true, load on client mount
  const [isMounted, setIsMounted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle fullscreen helper
  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.() ||
          document.documentElement.webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
      }
    } catch (_) {}
  };

  // Track actual fullscreen state from browser events
  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFSChange);
    document.addEventListener("webkitfullscreenchange", onFSChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFSChange);
      document.removeEventListener("webkitfullscreenchange", onFSChange);
    };
  }, []);

  // Refs for tracking tactile scrolling and mouse hover memory
  const lastHoveredRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  // Listen to hashchange page jumps for retro teleportation static
  useEffect(() => {
    if (!isMounted) return;

    const handleHashChange = (e) => {
      // Only glitch when staying on the same page (same pathname), not cross-page nav
      try {
        const oldPath = new URL(e.oldURL).pathname;
        const newPath = new URL(e.newURL).pathname;
        if (oldPath !== newPath) return;
      } catch (_) {}

      setIsGlitching(true);
      playSound("laser", soundEnabled);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 180);
      return () => clearTimeout(timer);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isMounted, soundEnabled]);

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

      if (diff >= 60 && now - lastScrollTimeRef.current >= 60) {
        playSound("tick", true);
        lastScrollYRef.current = currentY;
        lastScrollTimeRef.current = now;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, soundEnabled]);

  // 3. Global Keyboard Mechanical Sounds + hotkeys
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e) => {
      // F11 fullscreen toggle
      if (e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

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

      if (!soundEnabled) return;

      if (e.key === "Tab") {
        playSound("blip", true);
      } else if (e.key === "Enter") {
        playSound("coin", true);
      } else if (e.key === " ") {
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

  // Complete BIOS boot — redirect to /os (dedicated Sarkar OS page)
  const handleBootComplete = () => {
    setHasBooted(true);
    sessionStorage.setItem("hasBooted", "true");
    window.location.href = "/os";
  };

  const contextValue = {
    soundEnabled,
    setSoundEnabled,
    crtEnabled,
    setCrtEnabled,
    isTerminalOpen,
    setIsTerminalOpen,
    isFullscreen,
    toggleFullscreen,
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
        <div className={`contents ${isGlitching ? "glitch-active" : ""}`}>
          {children}
          <TerminalDrawer
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            soundEnabled={soundEnabled}
            onLaunchDesktop={() => {
              setIsTerminalOpen(false);
              window.location.href = "/os";
            }}
          />
        </div>
      )}
    </ThemeSettingsContext.Provider>
  );
}
