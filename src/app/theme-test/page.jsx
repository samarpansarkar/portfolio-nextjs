"use client";

import { useState } from "react";

export default function ThemeTestPage() {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 relative overflow-hidden font-sans ${theme}`}
            style={{
                background: theme === "dark" ? "#000" : "#f0f0f0",
                color: theme === "dark" ? "#fff" : "#1a1a1a",
            }}
        >
            {/* Dynamic Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"
                    style={{ backgroundColor: theme === "dark" ? "#4c1d95" : "#e0c6ff" }}></div>
                <div
                    className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"
                    style={{ backgroundColor: theme === "dark" ? "#be185d" : "#ffc6d9" }}></div>
                <div
                    className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"
                    style={{ backgroundColor: theme === "dark" ? "#0f766e" : "#c6ffdd" }}></div>
            </div>

            {/* Glass Navigation */}
            <nav className="sticky top-0 z-50 px-8 py-4 border-b border-opacity-20"
                style={{
                    background: theme === "dark" ? "rgba(20, 20, 20, 0.4)" : "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                    borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    WebkitBackdropFilter: "blur(20px)"
                }}>
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-semibold tracking-wide drop-shadow-sm">
                        Just<span className="font-light opacity-80">Portfolio</span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-lg border border-opacity-20"
                        style={{
                            background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
                            borderColor: theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        {theme === "dark" ? "Light" : "Dark"} Mode
                    </button>
                </div>
            </nav>

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 space-y-24">
                {/* Hero Section */}
                <section className="text-center space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-opacity-20 mb-4"
                        style={{
                            background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)",
                            borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                            backdropFilter: "blur(5px)"
                        }}>
                        ✨ Apple-Inspired Glassmorphism
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-current to-current/50 drop-shadow-lg"
                        style={{ paddingBottom: '0.1em' }} // Fix for descenders being cut off
                    >
                        Think Different.
                    </h1>
                    <p className="text-2xl max-w-2xl mx-auto font-light leading-relaxed opacity-90 drop-shadow-md">
                        Experience a fluid, transparent interface that feels like looking through water.
                        Depth, blur, and vivid colors creating a premium feel.
                    </p>
                </section>

                {/* Glass Cards Showcase */}
                <section className="grid md:grid-cols-2 gap-8">
                    <GlassCard theme={theme} title="Projects">
                        <p className="opacity-80 mb-6 leading-relaxed">
                            Showcasing work with a premium, frosted glass aesthetic.
                            The background blurs seamlessly behind the content.
                        </p>
                        <div className="flex gap-3">
                            <Badge theme={theme}>Design</Badge>
                            <Badge theme={theme}>Development</Badge>
                        </div>
                    </GlassCard>

                    <GlassCard theme={theme} title="Skills">
                        <div className="space-y-4">
                            <SkillBar theme={theme} name="React" level="90%" />
                            <SkillBar theme={theme} name="Design" level="85%" />
                            <SkillBar theme={theme} name="Next.js" level="95%" />
                        </div>
                    </GlassCard>
                </section>

                {/* Floating Dock Mockup */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl flex gap-6 items-center border border-opacity-20 shadow-2xl transition-all hover:scale-105"
                    style={{
                        background: theme === "dark" ? "rgba(50, 50, 50, 0.4)" : "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(25px)",
                        borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)",
                        WebkitBackdropFilter: "blur(25px)"
                    }}>
                    <DockIcon theme={theme} label="Home" />
                    <DockIcon theme={theme} label="Projects" />
                    <DockIcon theme={theme} label="About" />
                    <DockIcon theme={theme} label="Contact" />
                </div>
            </main>

            <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}

function GlassCard({ theme, title, children }) {
    return (
        <div className="p-8 rounded-3xl border border-opacity-20 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
            style={{
                background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)",
                boxShadow: theme === "dark" ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)" : "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
            }}>
            <h3 className="text-2xl font-bold mb-4 tracking-tight drop-shadow-sm">{title}</h3>
            {children}
        </div>
    )
}

function Badge({ theme, children }) {
    return (
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-opacity-10"
            style={{
                background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)",
                color: theme === "dark" ? "#fff" : "#333",
                backdropFilter: "blur(5px)"
            }}>
            {children}
        </span>
    )
}

function SkillBar({ theme, name, level }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium opacity-90">
                <span>{name}</span>
                <span>{level}</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden"
                style={{ background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                <div className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: level,
                        background: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                        boxShadow: "0 0 10px rgba(255,255,255,0.3)"
                    }}></div>
            </div>
        </div>
    )
}

function DockIcon({ theme, label }) {
    return (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:-translate-y-2"
            style={{
                background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}>
            {/* Using simplified circle for icon */}
            <div className="w-4 h-4 rounded-full" style={{ background: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}></div>
        </div>
    )
}
