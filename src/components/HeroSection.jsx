"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroData } from "@/database/page";
import { useTypewriter } from "@/hooks/useTypewriter";
import Resume from "./Resume";
import Github from "./Github";

const HeroSection = () => {
  const { displayText, isComplete } = useTypewriter(heroData.terminalText, 30);

  // RPG Customizer states
  const [rpgClass, setRpgClass] = useState("developer");
  const [rpgAccessory, setRpgAccessory] = useState("none");

  const classConfig = {
    developer: { label: "Developer", glow: "border-accent-primary", text: "text-accent-primary", shadow: "0 0 16px var(--accent-primary)" },
    hacker:    { label: "Hacker",    glow: "border-accent-secondary", text: "text-accent-secondary", shadow: "0 0 16px var(--accent-secondary)" },
    ninja:     { label: "Cyber-Ninja", glow: "border-accent-tertiary",  text: "text-accent-tertiary",  shadow: "0 0 16px var(--accent-tertiary)" },
  };

  // Calculate dynamic progress synced with the typewriter text length
  const progressPercent = heroData.terminalText ? Math.round((displayText.length / heroData.terminalText.length) * 100) : 0;
  const currentXP = Math.round(progressPercent * 98.5); // Scales from 0 to 9850 XP!

  return (
    <section id="home" className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[calc(100vh-110px)] gap-6 xl:gap-12 py-3 md:py-6 max-w-7xl mx-auto w-full px-2 sm:px-4">

      {/* LEFT COLUMN: Player Status & Developer Shell Console */}
      <div className="w-full lg:w-[55%] xl:w-[58%] flex flex-col space-y-3 sm:space-y-4 text-center lg:text-left animate-slide-up-pixel justify-center">

        {/* Insert Coin Indicator */}
        <div className="text-center lg:text-left">
          <span className="font-pixel text-[10px] sm:text-xs text-accent-secondary insert-coin tracking-widest">
            ▶ INSERT COIN ◀
          </span>
        </div>

        {/* Player Status Display */}
        <div className="pixel-border p-3 sm:p-4 bg-bg-secondary/90 backdrop-blur-sm w-full">
          <div className="space-y-1.5 md:space-y-2">
            <p className="font-terminal text-accent-primary text-xs sm:text-sm md:text-base tracking-wider font-bold">
              === PLAYER 1 START ===
            </p>
            <h1
              className="font-pixel text-lg sm:text-xl md:text-3xl lg:text-2xl xl:text-3xl neon-glow-cyan leading-relaxed text-white"
              dangerouslySetInnerHTML={{ __html: heroData.playerName.replace("\n", "<br />") }}
            />
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-1.5 md:mt-2">
              <span className="font-terminal text-phosphor-green text-sm sm:text-base md:text-lg score-display">
                {heroData.level}
              </span>
              <span className="font-terminal text-accent-tertiary text-[10px] sm:text-xs tracking-wider font-bold">
                [ELITE STATUS]
              </span>
            </div>
          </div>
        </div>

        {/* CRT Retro Typewriter Terminal Screen */}
        <div className="crt-frame w-full">
          <div className="crt-screen bg-bg-primary p-3.5 sm:p-4 md:p-5">

            {/* Terminal Top Window Bar */}
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b-2 border-phosphor-green/20">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent-secondary animate-glow-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-accent-tertiary"></div>
                <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
              </div>
              <span className="font-terminal text-phosphor-green text-[10px] ml-2 opacity-80 select-none">
                ~/developer.exe
              </span>
            </div>

            {/* Typewriter Output Buffer */}
            <div className="font-terminal text-phosphor-green text-xs sm:text-sm md:text-base whitespace-pre-wrap min-h-[75px] sm:min-h-[90px] lg:min-h-[105px] leading-relaxed text-left">
              {displayText}
              {!isComplete && (
                <span className="animate-blink text-accent-primary font-bold">█</span>
              )}
            </div>

            {/* Experience Points Bar */}
            <div className="mt-3 pt-2 border-t-2 border-phosphor-green/20">
              <div className="flex justify-between font-terminal text-[10px] sm:text-xs text-accent-primary mb-1">
                <span className="font-bold">XP PROGRESS</span>
                <span className="font-mono">{currentXP} / 10000</span>
              </div>
              <div className="h-3.5 pixel-border bg-bg-secondary overflow-hidden">
                <div
                  className="h-full animate-glow-pulse transition-all duration-75 ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundImage: "linear-gradient(to right, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))"
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Primary Action Buttons (CV and Github) */}
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start items-center pt-1">
          <Resume />
          <Github />
        </div>

      </div>

      {/* RIGHT COLUMN: Profile Picture, Socials Box, Press Start */}
      <div className="w-full lg:w-[45%] xl:w-[38%] flex flex-col items-center justify-center space-y-4 sm:space-y-5 animate-pixel-fade-in py-2">

          {/* Profile Picture Frame (Optimized Dimensions) */}
        <div className="relative">
          <div
            className="absolute -inset-3 rounded-3xl blur-xl animate-glow-pulse"
            style={{ background: `radial-gradient(ellipse, ${classConfig[rpgClass].shadow.replace("0 0 16px ", "")}, transparent 70%)`, opacity: 0.4 }}
          />

          <div
            className={`relative crt-frame w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-60 lg:h-60 xl:w-68 xl:h-68 flex items-center justify-center border-4 transition-all duration-300 ${classConfig[rpgClass].glow}`}
            style={{ boxShadow: classConfig[rpgClass].shadow }}
          >
            <div className="crt-screen h-full w-full flex items-center justify-center bg-bg-primary/50 relative p-3">

              {/* Virtual Raster Matrix Overlay */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, transparent 24%, rgba(51, 255, 51, .05) 25%, rgba(51, 255, 51, .05) 26%, transparent 27%, transparent 74%, rgba(51, 255, 51, .05) 75%, rgba(51, 255, 51, .05) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(51, 255, 51, .05) 25%, rgba(51, 255, 51, .05) 26%, transparent 27%, transparent 74%, rgba(51, 255, 51, .05) 75%, rgba(51, 255, 51, .05) 76%, transparent 77%, transparent)
                  `,
                  backgroundSize: "8px 8px",
                }}
              />

              <Image
                src="/icons/picofme.png"
                width={220}
                height={220}
                priority={true}
                alt="Samarpan Sarkar"
                className="relative w-40 h-40 sm:w-50 sm:h-50 md:w-56 md:h-56 lg:w-50 lg:h-50 xl:w-56 xl:h-56 object-cover rounded-2xl pixel-art pixel-border-pink shadow-neon-pink hover:scale-105 transition-transform duration-300"
              />

              {/* 🕶️ Accessory Overlays */}
              {rpgAccessory === "shades" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-28 sm:w-36" style={{ marginTop: "-15%" }}>
                    <div className="flex gap-1 items-center justify-center">
                      <div className="w-10 sm:w-12 h-5 sm:h-6 bg-black/80 border-2 border-accent-primary rounded-sm" style={{ boxShadow: "0 0 8px var(--accent-primary)" }} />
                      <div className="w-2 h-0.5 bg-accent-primary" />
                      <div className="w-10 sm:w-12 h-5 sm:h-6 bg-black/80 border-2 border-accent-primary rounded-sm" style={{ boxShadow: "0 0 8px var(--accent-primary)" }} />
                    </div>
                  </div>
                </div>
              )}
              {rpgAccessory === "laser" && (
                <div className="absolute inset-0 flex items-center pointer-events-none" style={{ marginTop: "-10%" }}>
                  <div className="relative w-full flex justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary animate-glow-pulse" style={{ boxShadow: "0 0 12px var(--accent-secondary), 0 0 24px var(--accent-secondary)", marginLeft: "20%" }} />
                    <div className="absolute h-0.5 bg-accent-secondary opacity-80 animate-pulse" style={{ width: "60px", top: "50%", left: "40%", boxShadow: "0 0 6px var(--accent-secondary)" }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary animate-glow-pulse" style={{ boxShadow: "0 0 12px var(--accent-secondary), 0 0 24px var(--accent-secondary)", marginLeft: "10%" }} />
                  </div>
                </div>
              )}

              {/* Status Tags */}
              <div className={`absolute -top-1.5 -right-1.5 font-pixel text-[8px] bg-accent-tertiary text-bg-primary px-2 py-1 rounded pixel-border-yellow animate-glow-pulse font-bold select-none`}>
                ⭐ {classConfig[rpgClass].label.toUpperCase()}
              </div>
              <div className="absolute bottom-2 left-2 font-terminal text-[9px] sm:text-[10px] bg-phosphor-green text-bg-primary px-2 py-1 rounded pixel-border animate-bounce font-bold select-none">
                Samarpan Sarkar
              </div>
            </div>
          </div>
        </div>

        {/* Press Start / Navigation Link */}
        <div className="text-center w-full">
          <Link href="/arcade" className="font-pixel text-[10px] sm:text-xs text-accent-primary insert-coin tracking-widest block">
            ▼ PRESS START ▼
          </Link>

          {/* Glowing Animated Tickers */}
          <div className="mt-2 flex justify-center gap-1.5 items-center h-4">
            {[0, 150, 300, 450, 600].map((delay, index) => {
              const colors = ["bg-accent-primary", "bg-accent-secondary", "bg-accent-tertiary", "bg-phosphor-green", "bg-accent-primary"];
              return (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 ${colors[index]} animate-bounce`}
                  style={{
                    animationDelay: `${delay}ms`,
                    animationDuration: "1.5s",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Social Connections Dock */}
        <div className="pixel-border-pink p-2.5 bg-bg-secondary/90 backdrop-blur-sm w-full max-w-[240px] sm:max-w-xs">
          <p className="font-pixel text-[8px] sm:text-[9px] text-center text-accent-secondary mb-2 tracking-wider font-bold">
            [ CONNECT SOCIALS ]
          </p>
          <div className="flex justify-center gap-2.5">
            {heroData.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  p-2 sm:p-2.5 rounded-lg
                  ${social.color === "cyan" ? "pixel-border hover:neon-glow-cyan" : ""}
                  ${social.color === "pink" ? "pixel-border-pink hover:neon-glow-pink" : ""}
                  ${social.color === "yellow" ? "pixel-border-yellow hover:text-accent-tertiary" : ""}
                  bg-bg-primary text-text-primary
                  hover:bg-bg-secondary
                  transition-all duration-200
                  hover:-translate-y-1
                  active:translate-y-0
                `}
              >
                {React.cloneElement(social.icon, { size: 16 })}
              </a>
            ))}
          </div>
        </div>

        {/* 🎮 RPG Character Customizer Panel */}
        <div className="pixel-border p-2.5 bg-bg-secondary/90 backdrop-blur-sm w-full max-w-[240px] sm:max-w-xs">
          <p className="font-pixel text-[8px] sm:text-[9px] text-center text-accent-primary mb-2.5 tracking-wider font-bold">
            [ CHARACTER CONFIG ]
          </p>

          {/* CLASS selector */}
          <div className="mb-2">
            <p className="font-terminal text-[9px] text-accent-tertiary mb-1 tracking-wider">CLASS:</p>
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(classConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setRpgClass(key)}
                  className={`font-terminal text-[8px] px-2 py-0.5 border font-bold transition-all duration-150 ${
                    rpgClass === key
                      ? `${cfg.text} border-current bg-bg-primary`
                      : "text-text-secondary border-text-secondary/30 hover:border-accent-primary hover:text-accent-primary"
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* ACCESSORY selector */}
          <div>
            <p className="font-terminal text-[9px] text-accent-tertiary mb-1 tracking-wider">ACCESSORY:</p>
            <div className="flex gap-1.5">
              {[{key:"none",label:"None"},{key:"shades",label:"🕶 Shades"},{key:"laser",label:"⚡ Lasers"}].map(acc => (
                <button
                  key={acc.key}
                  onClick={() => setRpgAccessory(acc.key)}
                  className={`font-terminal text-[8px] px-2 py-0.5 border font-bold transition-all duration-150 ${
                    rpgAccessory === acc.key
                      ? "text-accent-secondary border-accent-secondary bg-bg-primary"
                      : "text-text-secondary border-text-secondary/30 hover:border-accent-secondary hover:text-accent-secondary"
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
