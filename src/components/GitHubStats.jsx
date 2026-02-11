"use client";

import { LuGithub, LuGitFork, LuStar } from "react-icons/lu";

const GitHubStats = ({ username = "samarpansarkar" }) => {
    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="pixel-border-pink p-4 bg-bg-secondary/90">
                <div className="flex items-center justify-center gap-3">
                    <LuGithub className="text-accent-primary animate-glow-pulse" size={28} />
                    <h3 className="font-pixel text-lg text-gradient">
                        GITHUB STATS
                    </h3>
                </div>
            </div>

            {/* Stats Grid - Arcade Dashboard Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Repos Card */}
                <div className="retro-card p-6 group">
                    <div className="flex items-center justify-between mb-4">
                        <LuGithub
                            className="text-accent-primary group-hover:scale-110 group-hover:rotate-12 transition-transform"
                            size={36}
                        />
                        <span className="font-terminal text-xs text-phosphor-green">
                            [REPOS]
                        </span>
                    </div>
                    <div className="space-y-2">
                        <p className="font-terminal text-5xl text-accent-primary score-display">
                            15+
                        </p>
                        <p className="font-pixel text-xs text-text-secondary">
                            PUBLIC REPOS
                        </p>
                    </div>
                    {/* Pixel Progress Bar */}
                    <div className="mt-4 h-2 pixel-border bg-bg-primary">
                        <div
                            className="h-full bg-accent-primary animate-glow-pulse"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                </div>

                {/* Stars Card */}
                <div className="retro-card p-6 group">
                    <div className="flex items-center justify-between mb-4">
                        <LuStar
                            className="text-accent-tertiary group-hover:scale-110 group-hover:rotate-12 transition-transform"
                            size={36}
                        />
                        <span className="font-terminal text-xs text-phosphor-green">
                            [STARS]
                        </span>
                    </div>
                    <div className="space-y-2">
                        <p className="font-terminal text-5xl text-accent-tertiary score-display">
                            20+
                        </p>
                        <p className="font-pixel text-xs text-text-secondary">
                            STARS EARNED
                        </p>
                    </div>
                    {/* Pixel Progress Bar */}
                    <div className="mt-4 h-2 pixel-border bg-bg-primary">
                        <div
                            className="h-full bg-accent-tertiary animate-glow-pulse"
                            style={{ width: "60%" }}
                        ></div>
                    </div>
                </div>

                {/* Forks Card */}
                <div className="retro-card p-6 group">
                    <div className="flex items-center justify-between mb-4">
                        <LuGitFork
                            className="text-accent-secondary group-hover:scale-110 group-hover:rotate-12 transition-transform"
                            size={36}
                        />
                        <span className="font-terminal text-xs text-phosphor-green">
                            [FORKS]
                        </span>
                    </div>
                    <div className="space-y-2">
                        <p className="font-terminal text-5xl text-accent-secondary score-display">
                            10+
                        </p>
                        <p className="font-pixel text-xs text-text-secondary">
                            PROJECT FORKS
                        </p>
                    </div>
                    {/* Pixel Progress Bar */}
                    <div className="mt-4 h-2 pixel-border bg-bg-primary">
                        <div
                            className="h-full bg-accent-secondary animate-glow-pulse"
                            style={{ width: "50%" }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* GitHub Profile Link - Arcade Button */}
            <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn w-full text-center block"
            >
                <span className="flex items-center justify-center gap-3">
                    <LuGithub size={20} />
                    <span>VIEW GITHUB PROFILE</span>
                    <span>→</span>
                </span>
            </a>
        </div>
    );
};

export default GitHubStats;
