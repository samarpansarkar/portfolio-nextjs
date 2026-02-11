"use client";
import Github from "@/components/Github";
import Resume from "@/components/Resume";
import { useTypewriter } from "@/hooks/useTypewriter";
import API from "@/utils/AxiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuInstagram, LuLinkedin } from "react-icons/lu";

const Home = () => {
  const [showInsertCoin, setShowInsertCoin] = useState(true);

  useEffect(() => {
    console.log(
      "%c╔═══════════════════════════════════════════╗",
      "color: #00f0ff; font-size: 16px; font-family: monospace;",
    );
    console.log(
      "%c║  🎮 RETRO PORTFOLIO V1.0 - PLAYER 1 🎮  ║",
      "color: #ff006e; font-size: 16px; font-family: monospace; font-weight: bold;",
    );
    console.log(
      "%c╚═══════════════════════════════════════════╝",
      "color: #00f0ff; font-size: 16px; font-family: monospace;",
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
      "%c> EXPERIENCE LEVEL: 9-10 YEARS",
      "color: #ffbe0b; font-size: 14px; font-family: 'VT323', monospace; font-weight: bold;",
    );
    console.log(
      "%c> TECH STACK: React | Next.js | Node.js | Full Stack",
      "color: #33ff33; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> READY TO CONNECT: samarpansarkar209@gmail.com",
      "color: #00f0ff; font-size: 14px; font-family: 'VT323', monospace;",
    );
    console.log(
      "%c> Easter Egg: Try pressing ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #ff006e; font-size: 12px; font-style: italic;",
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

  const terminalText = `> INITIALIZING DEVELOPER PROFILE...
> NAME: SAMARPAN SARKAR
> ROLE: FULL STACK DEVELOPER
> EXPERIENCE: 9+ YEARS
> STATUS: READY FOR NEW CHALLENGES
> _`;

  const { displayText, isComplete } = useTypewriter(terminalText, 30);

  return (
    <div className='flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-100px)] gap-8'>
      {/* LEFT SECTION - Hero Content */}
      <div className='w-full md:w-1/2 space-y-6 text-center md:text-left animate-slide-up-pixel'>
        {/* INSERT COIN Blink */}
        <div className='text-center md:text-left mb-4'>
          <span className='font-pixel text-sm md:text-base text-accent-secondary insert-coin'>
            ▶ INSERT COIN ◀
          </span>
        </div>

        {/* Arcade Title Box */}
        <div className='pixel-border p-6 bg-bg-secondary/90 backdrop-blur-sm'>
          <div className='space-y-3'>
            <p className='font-terminal text-accent-primary text-lg md:text-xl tracking-wider'>
              === PLAYER 1 START ===
            </p>
            <h1 className='font-pixel text-3xl md:text-5xl lg:text-6xl text-gradient animate-glow-pulse leading-relaxed'>
              SAMARPAN
              <br />
              SARKAR
            </h1>
            <div className='flex items-center justify-center md:justify-start gap-2 mt-4'>
              <span className='font-terminal text-phosphor-green text-xl md:text-2xl score-display'>
                LVL 9-10
              </span>
              <span className='font-terminal text-accent-tertiary text-lg'>
                [ELITE STATUS]
              </span>
            </div>
          </div>
        </div>

        {/* CRT Terminal */}
        <div className='crt-frame'>
          <div className='crt-screen bg-bg-primary p-6'>
            <div className='flex items-center gap-2 mb-4 pb-3 border-b-2 border-phosphor-green/30'>
              <div className='flex gap-2'>
                <div className='w-3 h-3 rounded-full bg-accent-secondary animate-glow-pulse'></div>
                <div className='w-3 h-3 rounded-full bg-accent-tertiary'></div>
                <div className='w-3 h-3 rounded-full bg-accent-primary'></div>
              </div>
              <span className='font-terminal text-phosphor-green text-sm ml-2'>
                ~/developer.exe
              </span>
            </div>

            <div className='font-terminal text-phosphor-green text-sm md:text-base whitespace-pre-wrap'>
              {displayText}
              {!isComplete && (
                <span className='animate-blink text-accent-primary'>█</span>
              )}
            </div>

            {/* XP Bar */}
            <div className='mt-4 pt-4 border-t-2 border-phosphor-green/30'>
              <div className='flex justify-between font-terminal text-xs text-accent-primary mb-1'>
                <span>XP</span>
                <span>9850 / 10000</span>
              </div>
              <div className='h-4 pixel-border bg-bg-secondary'>
                <div
                  className='h-full bg-linear-to-r from-accent-primary via-accent-secondary to-accent-tertiary animate-glow-pulse'
                  style={{ width: "98.5%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Arcade Control Panel - Social Links */}
        <div className='pixel-border-pink p-4 bg-bg-secondary/90 backdrop-blur-sm'>
          <p className='font-pixel text-xs text-center text-accent-secondary mb-3'>
            [ CONNECT ]
          </p>
          <div className='flex justify-center md:justify-start gap-4'>
            {[
              {
                icon: <FaXTwitter size={24} />,
                href: "https://x.com/Samarpan_209",
                color: "cyan",
              },
              {
                icon: <LuLinkedin size={24} />,
                href: "https://www.linkedin.com/in/samarpan-sarkar-",
                color: "pink",
              },
              {
                icon: <LuInstagram size={24} />,
                href: "https://www.instagram.com/samarpan_209/",
                color: "yellow",
              },
              {
                icon: <LuFacebook size={24} />,
                href: "https://www.facebook.com/samrpan.sarkar/",
                color: "cyan",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`
                  p-3 rounded-lg
                  ${social.color === "cyan" ? "pixel-border hover:neon-glow-cyan" : ""}
                  ${social.color === "pink" ? "pixel-border-pink hover:neon-glow-pink" : ""}
                  ${social.color === "yellow" ? "pixel-border-yellow hover:text-accent-tertiary" : ""}
                  bg-bg-primary text-text-primary
                  hover:bg-bg-secondary
                  transition-all duration-200
                  hover:-translate-y-1
                  active:translate-y-0
                `}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center'>
          <Resume />
          <Github />
        </div>
      </div>

      {/* RIGHT SECTION - Pixel Art Avatar */}
      <div className='w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end relative animate-pixel-fade-in'>
        <div className='relative'>
          {/* Arcade Cabinet Frame */}
          <div className='absolute -inset-6 rounded-3xl bg-linear-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-tertiary/20 blur-2xl animate-glow-pulse'></div>

          {/* Character Display */}
          <div className='relative crt-frame w-72 h-72 md:w-96 md:h-96'>
            <div className='crt-screen h-full flex items-center justify-center bg-bg-primary/50'>
              {/* Pixel Grid Effect */}
              <div
                className='absolute inset-0 opacity-10'
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, .05) 25%, rgba(0, 240, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, .05) 75%, rgba(0, 240, 255, .05) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0, 240, 255, .05) 25%, rgba(0, 240, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, .05) 75%, rgba(0, 240, 255, .05) 76%, transparent 77%, transparent)
                  `,
                  backgroundSize: "8px 8px",
                }}></div>

              <Image
                src='/icons/picofme.png'
                width={280}
                height={280}
                loading='eager'
                alt='Samarpan Sarkar - Level 9-10 Developer'
                className='relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl pixel-art pixel-border-pink shadow-neon-pink hover:scale-105 transition-transform duration-300'
              />

              {/* Floating Badges */}
              <div className='absolute -top-4 -right-4 font-pixel text-xs bg-accent-tertiary text-bg-primary px-3 py-2 rounded pixel-border-yellow animate-glow-pulse'>
                ⭐ ELITE
              </div>
              <div className='absolute -bottom-4 -left-4 font-terminal text-sm bg-phosphor-green text-bg-primary px-3 py-2 rounded pixel-border animate-bounce'>
                9+ YRS XP
              </div>
            </div>
          </div>

          {/* Press Start Indicator */}
          <div className='mt-6 text-center'>
            <p className='font-pixel text-sm text-accent-primary insert-coin'>
              ▼ PRESS START ▼
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
