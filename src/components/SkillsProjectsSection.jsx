"use client"
import { CollapsibleSkillCategory } from "@/components/CollapsibleSkillCategory";
import { SkeletonCard, SkillsSkeleton } from "@/components/Skeletons";
import SkillSection from "@/components/SkillSection";
import { fetchProjects } from "@/redux/slices/ProjectSlice";
import { fetchSkills } from "@/redux/slices/skillSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuLightbulb } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const SkillsProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web", "Full Stack"];

  const dispatch = useDispatch();

  const {
    skills,
    loading: sLoading,
    error: sError,
  } = useSelector((state) => state.skills);

  const {
    projects,
    loading: pLoading,
    error: pError,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    async function loadSkillsAndProjects() {
      await Promise.allSettled([
        dispatch(fetchSkills()),
        dispatch(fetchProjects()),
      ]);
    }
    loadSkillsAndProjects();
  }, [dispatch]);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const webSkills = skills.filter((s) => s.category === "Web Development");
  const languageSkills = skills.filter((s) => s.category === "Languages");
  const toolSkills = skills.filter((s) => s.category === "Tools & Others");

  if (sLoading || pLoading) {
    return (
      <section id="skills" className="min-h-[calc(100vh-100px)] py-12 space-y-20 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <LuLightbulb className="text-accent-primary" size={32} />
          <h1 className="text-4xl font-bold text-primary">
            Skills & <span className="text-accent-secondary">Projects</span>
          </h1>
        </div>

        {/* Skills Skeleton */}
        <div className="space-y-12">
          <SkillsSkeleton />
          <SkillsSkeleton />
          <SkillsSkeleton />
        </div>

        {/* Projects Skeleton */}
        <div className="space-y-8">
          <div className="h-10 bg-primary/10 rounded w-64 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-[calc(100vh-100px)] py-12 space-y-16 animate-fade-in-up">
      
      {/* SECTION 03: Technical Skills */}
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 pixel-border bg-bg-secondary text-accent-primary font-pixel text-xs">
            <LuLightbulb className="text-accent-primary animate-glow-pulse" size={14} />
            <span className="tracking-widest uppercase">STAGE 03 // SKILL MATRIX</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <SkillSection title="Web Development" skills={webSkills} />

          <div className="space-y-10">
            <SkillSection title="Languages" skills={languageSkills} />
            <SkillSection title="Tools & Others" skills={toolSkills} />
          </div>
        </div>
      </div>

      {/* SECTION 04: Featured Projects */}
      <div className="space-y-8 pt-8 border-t-2 border-phosphor-green/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 pixel-border bg-bg-secondary text-accent-secondary font-pixel text-xs">
            <LuLightbulb className="text-accent-secondary" size={14} />
            <span className="tracking-widest uppercase">STAGE 04 // SYSTEM RELEASES</span>
          </div>

          <div className="flex flex-wrap gap-2 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 font-pixel text-[10px] transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "pixel-border bg-accent-primary text-bg-primary"
                    : "border-2 border-accent-primary/20 bg-bg-secondary text-accent-primary hover:border-accent-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cyber Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item, index) => (
            <div
              key={item._id}
              className="group relative pixel-border bg-bg-secondary/90 hover:shadow-neon-pink hover:border-accent-secondary transition-all duration-300 hover:-translate-y-1.5 animate-fade-in-up flex flex-col justify-between"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              
              {/* Virtual CRT Scanline Screen Container */}
              <div className="aspect-video overflow-hidden relative border-b-2 border-phosphor-green/20">
                
                {/* Vector Scanlines overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[size:100%_4px,3px_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                
                <Image
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 pixel-art"
                />
              </div>

              {/* Dynamic Readout Info */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-pixel text-[10px] sm:text-xs text-white group-hover:text-accent-primary transition-colors tracking-wide leading-relaxed">
                      {item.name}
                    </h3>
                    <span className="font-terminal text-[10px] font-bold px-2 py-0.5 border border-accent-tertiary/40 text-accent-tertiary bg-bg-primary uppercase select-none">
                      {item.category}
                    </span>
                  </div>

                  {/* Systems Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.stack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 font-terminal text-[10px] border border-accent-primary/20 text-phosphor-green bg-bg-primary hover:border-accent-primary transition-all select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cyber Action Triggers */}
                <div className="flex gap-3 pt-3 border-t border-phosphor-green/10">
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 font-pixel text-[9px] border-2 border-accent-primary bg-accent-primary text-bg-primary hover:bg-bg-secondary hover:text-accent-primary transition-all duration-200 uppercase font-bold"
                  >
                    Live Demo
                  </a>
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 font-pixel text-[9px] border-2 border-accent-secondary bg-bg-secondary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary transition-all duration-200 uppercase font-bold"
                  >
                    GitHub
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SkillsProjectsSection;
