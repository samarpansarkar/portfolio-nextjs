"use client";
import API from "@/utils/AxiosInstance";
import { useEffect } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

const AboutSection = dynamic(() => import("@/components/AboutSection"));
const SkillsProjectsSection = dynamic(() => import("@/components/SkillsProjectsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));

const Home = () => {
  useEffect(() => {
    console.log(
      "%c╔═══════════════════════════════════════════╗",
      "color: #33ff33; font-size: 16px; font-family: monospace;",
    );
    console.log(
      "%c║  🎮 RETRO PORTFOLIO V1.0 - PLAYER 1 🎮  ║",
      "color: #ff3333; font-size: 16px; font-family: monospace; font-weight: bold;",
    );
    console.log(
      "%c╚═══════════════════════════════════════════╝",
      "color: #33ff33; font-size: 16px; font-family: monospace;",
    );
    console.log(
      "%c> SYSTEM INITIALIZED...",
      "color: #33ff33; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> LOADING DEVELOPER PROFILE...",
      "color: #33ff33; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> TECH STACK: React | Next.js | Node.js | Full Stack",
      "color: #33ff33; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> READY TO CONNECT: samarpansarkar209@gmail.com",
      "color: #33ff33; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> Easter Egg: Try pressing ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #ff3333; font-size: 12px; font-style: italic;",
    );
  }, []);

  useEffect(() => {
    const alreadyChecked = sessionStorage.getItem("backendHealthChecked");

    if (alreadyChecked) return;
    async function checkBackend() {
      try {
        let res = await API.get("/");
        if (res) {
          toast.success("🎮 Backend connection successful!");
          sessionStorage.setItem("backendHealthChecked", "true");
        }
      } catch (error) {
        toast.error("❌ Backend offline!", error.message);
      }
    }
    checkBackend();
  }, []);

  return (
    <>
      <div className=''>
        <HeroSection />
        <AboutSection />
        <SkillsProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
