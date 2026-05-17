"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { experienceData } from "@/database/Experience";
import { LuBriefcase, LuCalendar } from "react-icons/lu";

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, once: true });

  return (
    <div className="space-y-8 mt-12" ref={ref}>
      
      {/* Stage Header */}
      <div className={`flex items-center space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 pixel-border bg-bg-secondary text-accent-primary font-pixel text-xs">
          <LuBriefcase className="text-accent-primary animate-glow-pulse" size={14} />
          <span className="tracking-widest uppercase">STAGE 02.5 // XP HISTORY</span>
        </div>
      </div>

      {/* Retro Timeline */}
      <div className="relative border-l-4 border-phosphor-green/20 ml-4 md:ml-6 space-y-10">
        {experienceData.map((exp, index) => (
          <div
            key={exp.id}
            className={`relative pl-8 md:pl-12 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{ transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms' }}
          >
            {/* Blinking stage coordinates dot */}
            <div
              className={`absolute -left-[11px] top-1.5 w-4 h-4 border-2 border-bg-primary transition-colors duration-300 ${
                exp.type === "work" ? "bg-accent-primary animate-glow-pulse" : "bg-accent-secondary"
              }`}
            ></div>

            {/* Cabinet Parameter Card */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between p-5 pixel-border bg-bg-secondary/90 hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`p-1.5 border ${
                      exp.type === "work"
                        ? "border-accent-primary/30 text-accent-primary bg-bg-primary"
                        : "border-accent-secondary/30 text-accent-secondary bg-bg-primary"
                    }`}
                  >
                    {exp.icon}
                  </span>
                  <h3 className="font-pixel text-[11px] sm:text-xs text-white tracking-wide leading-relaxed uppercase">{exp.title}</h3>
                </div>
                <p className="font-terminal text-accent-primary text-sm font-bold">
                  {exp.subtitle}
                </p>
                <p className="font-terminal text-text-secondary text-xs">{exp.organization}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 min-w-fit select-none">
                <div className="flex items-center gap-2 font-terminal text-[10px] border border-accent-tertiary/30 text-accent-tertiary bg-bg-primary px-2.5 py-1">
                  <LuCalendar size={12} />
                  <span>{exp.date}</span>
                </div>
              </div>
            </div>

            <p className="mt-3 font-terminal text-text-secondary text-sm leading-relaxed pl-3 border-l-2 border-phosphor-green/30">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {/* 👾 8-Bit Pacman Chasing Ghost Simulator Loop 👾 */}
      <div className="relative w-full h-16 bg-bg-secondary/90 overflow-hidden flex items-center mt-12 border-2 border-phosphor-green/20 pixel-border select-none">
        
        {/* Terminal Label */}
        <div className="absolute top-1 left-2 font-terminal text-[8px] text-phosphor-green/60 select-none uppercase tracking-wider">
          [ SYSTEM ACTIVE: PACMAN_SIMULATOR.EXE ]
        </div>
        
        {/* Scared blue ghost & chomping Pacman chase group */}
        <div className="absolute flex items-center gap-5 animate-[pacman-chase_9s_linear_infinite]" style={{ width: '220px' }}>
          
          {/* Scared ghost (Blue) */}
          <div className="relative w-6 h-6 flex flex-col justify-between animate-[ghost-float_0.4s_ease-in-out_infinite]">
            {/* Scared Ghost Body */}
            <div className="w-6 h-5 bg-[#2b2bff] border border-white rounded-t-full relative flex justify-around pt-1.5 px-0.5 shadow-[0_0_8px_rgba(43,43,255,0.6)]">
              {/* Scared eyes */}
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              {/* Scared mouth */}
              <div className="absolute bottom-1 left-1 right-1 h-0.5 border-t border-yellow-400 border-dashed"></div>
            </div>
            {/* Squiggly ghost legs */}
            <div className="flex justify-between w-full h-1">
              <div className="w-1.5 h-1 bg-[#2b2bff] rounded-b-xs"></div>
              <div className="w-1.5 h-1 bg-transparent"></div>
              <div className="w-1.5 h-1 bg-[#2b2bff] rounded-b-xs"></div>
              <div className="w-1.5 h-1 bg-transparent"></div>
              <div className="w-1.5 h-1 bg-[#2b2bff] rounded-b-xs"></div>
            </div>
          </div>

          {/* Chomping Pacman */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Top Jaw */}
            <div className="absolute w-6 h-3 bg-yellow-400 rounded-t-full origin-bottom animate-[chomp-top_0.2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
            {/* Bottom Jaw */}
            <div className="absolute w-6 h-3 bg-yellow-400 rounded-b-full origin-top animate-[chomp-bottom_0.2s_ease-in-out_infinite] mt-3 origin-top"></div>
          </div>

        </div>

        {/* Pellets background grid */}
        <div className="w-full flex justify-around items-center px-12 opacity-30">
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
        </div>

        {/* Isolated hardware-accelerated animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pacman-chase {
            0% { left: -150px; }
            100% { left: 100%; }
          }
          @keyframes chomp-top {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-35deg); }
          }
          @keyframes chomp-bottom {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(35deg); }
          }
          @keyframes ghost-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
        `}} />
      </div>

    </div>
  );
};

export default Experience;
