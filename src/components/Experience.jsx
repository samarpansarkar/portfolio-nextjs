"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { experienceData } from "@/database/Experience";
import { LuBriefcase, LuCalendar, LuGraduationCap } from "react-icons/lu";

const Experience = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, once: true });

  return (
    <div className="space-y-8" ref={ref}>
      <div className={`flex items-center space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className="p-3 bg-accent-primary/10 rounded-full">
          <LuBriefcase className="text-accent-primary" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-primary">
          Experience & <span className="text-accent-secondary">Education</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-primary/10 ml-4 md:ml-6 space-y-12">
        {experienceData.map((exp, index) => (
          <div
            key={exp.id}
            className={`relative pl-8 md:pl-12 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            style={{ transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms' }}
          >
            <div
              className={`absolute -left-2.25 top-0 w-4 h-4 rounded-full border-2 border-slate-900 transition-colors duration-300 ${exp.type === "work"
                ? "bg-accent-primary"
                : "bg-accent-secondary"
                }`}
            ></div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between p-6 rounded-xl glass border border-primary/10 hover:border-accent-primary/30 transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-2 rounded-lg ${exp.type === "work"
                      ? "bg-accent-primary/10 text-accent-primary"
                      : "bg-accent-secondary/10 text-accent-secondary"
                      }`}
                  >
                    {exp.icon}
                  </span>
                  <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                </div>
                <p className="text-lg text-secondary font-medium">
                  {exp.subtitle}
                </p>
                <p className="text-sm text-secondary">{exp.organization}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 min-w-fit">
                <div className="flex items-center gap-2 text-sm text-secondary glass px-3 py-1 rounded-full">
                  <LuCalendar size={14} />
                  <span>{exp.date}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-secondary leading-relaxed pl-2 border-l-2 border-primary/20">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
