"use client";

import { LuGithub, LuGitFork, LuStar } from "react-icons/lu";

const GitHubStats = ({ username = "samarpansarkar" }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center gap-2">
                <LuGithub className="text-accent-primary" size={24} />
                <h3 className="text-2xl font-bold text-primary">
                    GitHub <span className="text-accent-secondary">Activity</span>
                </h3>
            </div>

            {/* GitHub Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Repos Card */}
                <div className="glass border border-primary/10 rounded-lg p-6 hover:border-accent-primary/50 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <LuGithub className="text-accent-primary group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs text-secondary font-mono">public</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-primary font-mono">15+</p>
                        <p className="text-sm text-secondary">Public Repositories</p>
                    </div>
                </div>

                {/* Stars Card */}
                <div className="glass border border-primary/10 rounded-lg p-6 hover:border-accent-primary/50 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <LuStar className="text-yellow-400 group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs text-secondary font-mono">stars</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-primary font-mono">20+</p>
                        <p className="text-sm text-secondary">Stars Earned</p>
                    </div>
                </div>

                {/* Forks Card */}
                <div className="glass border border-primary/10 rounded-lg p-6 hover:border-accent-primary/50 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <LuGitFork className="text-accent-secondary group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs text-secondary font-mono">forks</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-primary font-mono">10+</p>
                        <p className="text-sm text-secondary">Project Forks</p>
                    </div>
                </div>
            </div>

            {/* GitHub Profile Link */}
            <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 glass border border-primary/10 hover:border-accent-primary/50 rounded-lg text-primary hover:text-accent-primary transition-all group"
            >
                <LuGithub className="group-hover:rotate-12 transition-transform" size={20} />
                <span className="font-medium">View GitHub Profile</span>
                <span className="text-secondary">→</span>
            </a>
        </div>
    );
};

export default GitHubStats;
