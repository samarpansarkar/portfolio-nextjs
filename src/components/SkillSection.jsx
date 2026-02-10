"use client";
import Image from "next/image";

const SkillSection = ({ title, skills }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-secondary border-l-4 border-accent-primary pl-3">
      {title}
    </h3>
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, index) => (
        <div key={index} className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-accent-primary to-accent-secondary rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative glass rounded-lg p-3 hover:scale-110 transition-transform duration-300 border border-primary/10">
            <Image
              width={100}
              height={100}
              src={skill.icon}
              alt={skill.name}
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkillSection;
