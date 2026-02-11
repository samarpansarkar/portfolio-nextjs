"use client";
import { useEffect, useRef, useState } from "react";
import { LuX, LuPause, LuPlay, LuMaximize2, LuMinimize2 } from "react-icons/lu";

const GameContainer = ({ children, onExit, gameName }) => {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreenElement = document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;
            setIsFullscreen(!!fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                if (containerRef.current.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                } else if (containerRef.current.webkitRequestFullscreen) {
                    await containerRef.current.webkitRequestFullscreen();
                } else if (containerRef.current.mozRequestFullScreen) {
                    await containerRef.current.mozRequestFullScreen();
                } else if (containerRef.current.msRequestFullscreen) {
                    await containerRef.current.msRequestFullscreen();
                }
            } catch (err) {
                console.error("Fullscreen error:", err);
            }
        } else {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            } catch (err) {
                console.error("Exit fullscreen error:", err);
            }
        }
    };

    const handleExit = async () => {
        if (document.fullscreenElement) {
            await toggleFullscreen();
        }
        onExit();
    };

    return (
        <div className="relative">
            {!isFullscreen && (
                <div className="absolute -top-20 left-0 right-0 flex justify-between items-center px-4 z-10 animate-slide-up">
                    <div className="flex gap-3">
                        <button
                            onClick={toggleFullscreen}
                            className="group px-6 py-3 pixel-border bg-bg-secondary hover:bg-accent-primary hover:scale-105 transition-all duration-200 shadow-lg"
                            title="Enter Fullscreen Mode"
                        >
                            <div className="flex items-center gap-3">
                                <LuMaximize2 size={20} className="text-accent-primary group-hover:text-bg-primary transition-colors" />
                                <div className="text-left">
                                    <div className="font-pixel text-[10px] text-text-primary group-hover:text-bg-primary transition-colors">
                                        FULLSCREEN
                                    </div>
                                    <div className="font-terminal text-[8px] text-text-secondary group-hover:text-bg-primary/80 transition-colors">
                                        Immersive gaming
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="px-4 py-3 pixel-border-yellow bg-bg-secondary hover:bg-accent-tertiary hover:text-bg-primary hover:scale-105 transition-all shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                {isPaused ? <LuPlay size={18} /> : <LuPause size={18} />}
                                <span className="font-pixel text-[10px]">{isPaused ? "RESUME" : "PAUSE"}</span>
                            </div>
                        </button>
                    </div>

                    <button
                        onClick={handleExit}
                        className="px-4 py-3 pixel-border-pink bg-bg-secondary hover:bg-accent-secondary hover:text-bg-primary hover:scale-105 transition-all shadow-lg"
                    >
                        <div className="flex items-center gap-2">
                            <LuX size={18} />
                            <span className="font-pixel text-[10px]">EXIT GAME</span>
                        </div>
                    </button>
                </div>
            )}

            <div
                ref={containerRef}
                className={`relative ${isFullscreen ? 'bg-black flex items-center justify-center min-h-screen' : ''} ${isPaused ? "pointer-events-none opacity-50" : ""}`}
            >
                {children}
            </div>

            {isPaused && !isFullscreen && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm z-50 pointer-events-none">
                    <div className="text-center space-y-4 animate-pulse">
                        <p className="font-pixel text-4xl text-accent-primary animate-blink">⏸ PAUSED</p>
                        <p className="font-terminal text-lg text-text-secondary">Click RESUME to continue</p>
                    </div>
                </div>
            )}

            {isFullscreen && (
                <div className="fixed top-6 right-6 z-50 flex gap-3 animate-slide-down">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="p-4 pixel-border-yellow bg-bg-secondary/95 backdrop-blur hover:bg-accent-tertiary hover:text-bg-primary hover:scale-110 transition-all shadow-2xl"
                        title={isPaused ? "Resume" : "Pause"}
                    >
                        {isPaused ? <LuPlay size={24} /> : <LuPause size={24} />}
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-4 pixel-border bg-bg-secondary/95 backdrop-blur hover:bg-accent-primary hover:text-bg-primary hover:scale-110 transition-all shadow-2xl"
                        title="Exit Fullscreen"
                    >
                        <LuMinimize2 size={24} />
                    </button>

                    <button
                        onClick={handleExit}
                        className="p-4 pixel-border-pink bg-bg-secondary/95 backdrop-blur hover:bg-accent-secondary hover:text-bg-primary hover:scale-110 transition-all shadow-2xl"
                        title="Exit Game"
                    >
                        <LuX size={24} />
                    </button>
                </div>
            )}

            {isPaused && isFullscreen && (
                <div className="fixed inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm z-40">
                    <div className="text-center space-y-6 animate-pulse">
                        <p className="font-pixel text-6xl text-accent-primary animate-blink drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]">
                            ⏸ PAUSED
                        </p>
                        <p className="font-terminal text-2xl text-text-secondary drop-shadow-glow">
                            Click Resume button (top right) to continue
                        </p>
                        <p className="font-terminal text-sm text-text-secondary/60">
                            Press ESC to exit fullscreen
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameContainer;
