"use client"
import { BackToTop } from "@/components/BackToTop";
import { SkeletonCard, SkillsSkeleton } from "@/components/Skeletons";
import SkillSection from "@/components/SkillSection";
import { fetchProjects } from "@/redux/slices/ProjectSlice";
import { fetchSkills } from "@/redux/slices/skillSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuLightbulb } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const SkillsProjects = () => {
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
      <div className="min-h-[calc(100vh-100px)] py-12 space-y-20 animate-fade-in-up">
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
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] py-12 space-y-20 animate-fade-in-up">
      <div className="space-y-12">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-accent-primary/10 rounded-full">
            <LuLightbulb className="text-accent-primary" size={24} />
          </div>
          <h2 className="text-4xl font-bold text-primary">
            Technical <span className="text-accent-secondary">Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SkillSection title="Web Development" skills={webSkills} />

          <div className="space-y-12">
            <SkillSection title="Languages" skills={languageSkills} />
            <SkillSection title="Tools & Others" skills={toolSkills} />
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent-secondary/10 rounded-full">
              <LuLightbulb className="text-accent-secondary" size={24} />
            </div>
            <h2 className="text-4xl font-bold text-primary">
              Featured <span className="text-accent-primary">Projects</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                  ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                  : "glass text-secondary hover:bg-accent-primary/10 hover:text-accent-primary border border-primary/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item, index) => (
            <div
              key={item._id}
              className="group relative rounded-xl overflow-hidden glass border border-primary/10 hover:border-accent-primary/50 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  loading="eager"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-primary/5 text-secondary">
                    {item.category}
                  </span>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full glass border border-accent-primary/20 text-accent-primary hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  <a
                    href={item.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={item.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg border border-primary/20 text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default SkillsProjects;
