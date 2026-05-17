"use client";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import Image from "next/image";
import { LuUser } from "react-icons/lu";
import { aboutData } from "@/database/AboutSection";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-[calc(100vh-100px)] py-12 space-y-16 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
        
        {/* LEFT COLUMN: Stage Identity & Hacker Bio */}
        <div className="w-full md:w-1/2 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Retro Stage Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 pixel-border bg-bg-secondary text-accent-primary font-pixel text-xs">
            <LuUser className="text-accent-primary" size={14} />
            <span className="tracking-widest uppercase">STAGE 02 // ABOUT ME</span>
          </div>

          {/* BIOS Heading */}
          <div className="space-y-3">
            <h1 className="font-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed">
              {aboutData.heading1} <br />
              <span className="text-accent-secondary animate-glow-pulse">
                {aboutData.heading2}
              </span>
              <br />
              <span className="font-terminal text-accent-tertiary text-lg sm:text-xl font-bold uppercase tracking-wider">
                {aboutData.heading3}
              </span>
            </h1>
            <div className="h-1.5 w-24 pixel-border bg-accent-secondary"></div>
          </div>

          {/* Decrypted Log Details */}
          <p className="font-terminal text-text-secondary text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line border-l-4 border-phosphor-green/20 pl-4">
            {aboutData.description}
          </p>

          {/* Snake Contribution Screen */}
          <div className="hidden md:block p-3 pixel-border bg-bg-secondary/90 hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-phosphor-green/25 font-terminal text-[10px] text-phosphor-green select-none">
              <span>SYSTEM CONTRIBUTION FEED</span>
              <span className="animate-blink">● ONLINE</span>
            </div>
            <Image
              src="/icons/github-contribution-grid-snake.svg"
              width={100}
              height={100}
              alt="GitHub Contributions"
              className="w-full opacity-80 hover:opacity-100 transition-opacity pixel-art"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: BIOS System Parameters Table */}
        <div className="w-full md:w-1/3 space-y-6 pixel-border-pink p-5 md:p-6 bg-bg-secondary/90 backdrop-blur-sm hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
          
          {/* Header */}
          <div className="border-b-2 border-accent-secondary pb-3 mb-2">
            <p className="font-pixel text-[10px] text-accent-secondary tracking-widest font-bold text-center">
              [ SYSTEM LOG CONFIG ]
            </p>
          </div>

          {/* Languages Readout */}
          <div className="space-y-3">
            <h3 className="font-terminal text-phosphor-green text-sm sm:text-base tracking-wider font-bold uppercase flex items-center gap-2">
              <span className="text-[10px] animate-bounce">▶</span> 0x01. LANGUAGES
            </h3>
            <div className="h-[2px] w-full bg-phosphor-green/20"></div>
            <ul className="grid grid-cols-2 gap-2 font-mono text-xs sm:text-sm text-text-secondary pl-3">
              {aboutData.languages.map((lang) => (
                <li
                  key={lang}
                  className="flex items-center space-x-2 hover:text-phosphor-green transition-colors"
                >
                  <span className="text-accent-secondary font-bold font-terminal">&gt;</span>
                  <span>{lang}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nationality Readout */}
          <div className="space-y-3 pt-2">
            <h3 className="font-terminal text-phosphor-green text-sm sm:text-base tracking-wider font-bold uppercase flex items-center gap-2">
              <span className="text-[10px]">▶</span> 0x02. NATIONALITY
            </h3>
            <div className="h-[2px] w-full bg-phosphor-green/20"></div>
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-text-secondary pl-3 hover:text-phosphor-green transition-colors">
              <span className="text-accent-secondary font-bold font-terminal">&gt;</span>
              <span>{aboutData.nationality}</span>
            </div>
          </div>

          {/* Hobbies Readout */}
          <div className="space-y-3 pt-2">
            <h3 className="font-terminal text-phosphor-green text-sm sm:text-base tracking-wider font-bold uppercase flex items-center gap-2">
              <span className="text-[10px] animate-bounce">▶</span> 0x03. HOBBIES
            </h3>
            <div className="h-[2px] w-full bg-phosphor-green/20"></div>
            <ul className="grid grid-cols-2 gap-2 font-mono text-xs sm:text-sm text-text-secondary pl-3">
              {aboutData.hobbies.map((hobby) => (
                <li
                  key={hobby}
                  className="flex items-center space-x-2 hover:text-phosphor-green transition-colors"
                >
                  <span className="text-accent-secondary font-bold font-terminal">&gt;</span>
                  <span>{hobby}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      
      {/* Decoupled Retro Sections */}
      <GitHubStats username={aboutData.githubUsername} />
      <Experience />
    </section>
  );
};

export default AboutSection;
