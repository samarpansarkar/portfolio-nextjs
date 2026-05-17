"use client";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { aboutData } from "@/database/AboutSection";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-[calc(100vh-100px)] py-12 space-y-20 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
        <div className="w-full md:w-1/2 space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary/10">
            <LuUser className="text-accent-primary" size={18} />
            <span className="text-sm font-medium text-secondary">About Me</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {aboutData.heading1} <br />
              <span className="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                {aboutData.heading2}
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-normal text-secondary">
                {aboutData.heading3}
              </span>
            </h1>
            <div className="h-1 w-24 bg-linear-to-r from-accent-primary to-accent-secondary rounded-full"></div>
          </div>

          <p className="text-lg text-secondary leading-relaxed text-justify">
            {aboutData.description}
          </p>

          <div className="hidden md:block p-4 glass rounded-xl border border-primary/10 hover:border-accent-primary/50 transition-colors">
            <Image
              src="/icons/github-contribution-grid-snake.svg"
              width={100}
              height={100}
              alt="GitHub Contributions"
              className="w-full opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 space-y-10 glass p-8 rounded-2xl border border-primary/10 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Languages</h3>
            <div className="h-0.5 w-full bg-primary/10"></div>
            <ul className="space-y-3">
              {aboutData.languages.map((lang) => (
                <li
                  key={lang}
                  className="flex items-center space-x-3 text-secondary hover:text-accent-primary transition-colors"
                >
                  <GoDotFill className="text-accent-secondary" size={12} />
                  <span className="text-lg">{lang}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Nationality</h3>
            <div className="h-0.5 w-full bg-primary/10"></div>
            <div className="flex items-center space-x-3 text-secondary hover:text-accent-primary transition-colors">
              <GoDotFill className="text-accent-secondary" size={12} />
              <span className="text-lg">{aboutData.nationality}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Hobbies</h3>
            <div className="h-0.5 w-full bg-primary/10"></div>
            <ul className="space-y-3">
              {aboutData.hobbies.map(
                (hobby) => (
                  <li
                    key={hobby}
                    className="flex items-center space-x-3 text-secondary hover:text-accent-primary transition-colors"
                  >
                    <GoDotFill className="text-accent-secondary" size={12} />
                    <span className="text-lg">{hobby}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
      <GitHubStats username={aboutData.githubUsername} />
      <Experience />
    </section>
  );
};

export default AboutSection;
