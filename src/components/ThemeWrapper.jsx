"use client";
import { createContext, useContext, useState, useEffect } from "react";
import TerminalDrawer from "./TerminalDrawer";
import BiosBootScreen from "./BiosBootScreen";

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

  // Global key listener for terminal toggle (backtick key ` ` `)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Trigger toggle when backtick (`) is pressed, but ignore when inside input fields
      if (e.key === "`" || e.key === "Backquote") {
        const activeElem = document.activeElement;
        if (activeElem && (activeElem.tagName === "INPUT" || activeElem.tagName === "TEXTAREA" || activeElem.isContentEditable)) {
          return;
        }
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
