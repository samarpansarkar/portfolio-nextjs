"use client";

import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export const CollapsibleSkillCategory = ({ title, skills, icon, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="space-y-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 glass rounded-lg border border-primary/10 hover:border-accent-primary/50 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <span className="text-accent-primary text-2xl">{icon}</span>
                    <h3 className="text-xl font-semibold text-primary group-hover:text-accent-primary transition-colors">
                        {title}
                    </h3>
                    <span className="text-xs text-secondary ml-2">
                        ({skills.length} skills)
                    </span>
                </div>
                {isOpen ? (
                    <LuChevronUp className="text-secondary group-hover:text-accent-primary transition-colors" size={24} />
                ) : (
                    <LuChevronDown className="text-secondary group-hover:text-accent-primary transition-colors" size={24} />
                )}
            </button>

            {isOpen && (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pl-4 animate-fade-in-up">
                    {skills.map((skill, index) => (
                        <div
                            key={skill._id || index}
                            className="relative glass rounded-lg p-3 hover:scale-110 transition-transform duration-300 border border-primary/10 hover:border-accent-primary/50 group"
                            title={skill.name}
                        >
                            <img
                                src={skill.image}
                                alt={skill.name}
                                className="w-full h-auto"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-accent-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-xs font-medium text-primary text-center px-1">
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
