"use client";
import { useEffect } from "react";
import SarkarOS from "@/components/SarkarOS";

// Sarkar OS lives at its own dedicated /os route
// SarkarOS is fixed inset-0 z-[9995] so it covers Navbar and everything else
export default function OSPage() {
  // Lock body scroll while on the OS page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <SarkarOS
      isOpen={true}
      onClose={() => { window.location.href = "/"; }}
      triggerTerminal={() => { window.location.href = "/"; }}
      onEnterPortfolio={() => { window.location.href = "/"; }}
    />
  );
}
