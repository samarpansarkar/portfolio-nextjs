"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { LuHouse, LuPlay } from "react-icons/lu";
import SnakeGame from "./components/SnakeGame";
import PongGame from "./components/PongGame";
import BreakoutGame from "./components/BreakoutGame";
import TetrisGame from "./components/TetrisGame";
import MemoryGame from "./components/MemoryGame";
import SpaceInvadersGame from "./components/SpaceInvadersGame";
import FlappyGame from "./components/FlappyGame";
import WhacAMoleGame from "./components/WhacAMoleGame";

const ArcadePage = () => {
    const [activeGame, setActiveGame] = useState(null);
    const gameContainerRef = useRef(null);

    const games = [
        { id: "snake", name: "SNAKE", emoji: "🐍", description: "Classic snake game", component: SnakeGame },
        { id: "tetris", name: "TETRIS", emoji: "🔷", description: "Block stacking puzzle", component: TetrisGame },
        { id: "pong", name: "PONG", emoji: "🏓", description: "vs CPU paddle battle", component: PongGame },
        { id: "invaders", name: "INVADERS", emoji: "👾", description: "Shoot the aliens", component: SpaceInvadersGame },
        { id: "flappy", name: "FLAPPY", emoji: "🐦", description: "Navigate through pipes", component: FlappyGame },
        { id: "memory", name: "MEMORY", emoji: "🃏", description: "Match card pairs", component: MemoryGame },
        { id: "whack", name: "WHACK", emoji: "🐹", description: "Click the moles", component: WhacAMoleGame },
        { id: "breakout", name: "BREAKOUT", emoji: "🧱", description: "Break all bricks", component: BreakoutGame },
    ];

    const handlePlayGame = async (gameId) => {
        setActiveGame(gameId);

        setTimeout(async () => {
            if (gameContainerRef.current) {
                try {
                    if (gameContainerRef.current.requestFullscreen) {
                        await gameContainerRef.current.requestFullscreen();
                    } else if (gameContainerRef.current.webkitRequestFullscreen) {
                        await gameContainerRef.current.webkitRequestFullscreen();
                    } else if (gameContainerRef.current.mozRequestFullScreen) {
                        await gameContainerRef.current.mozRequestFullScreen();
                    } else if (gameContainerRef.current.msRequestFullscreen) {
                        await gameContainerRef.current.msRequestFullscreen();
                    }
                } catch (err) {
                    console.error("Fullscreen error:", err);
                }
            }
        }, 100);
    };

    const handleExitGame = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setActiveGame(null);
    };

    const GameComponent = activeGame ? games.find(g => g.id === activeGame)?.component : null;

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            {!activeGame ? (
                <div className="w-full max-w-4xl space-y-8">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 pixel-border bg-bg-secondary">
                            <div className="w-2 h-2 bg-phosphor-green animate-blink"></div>
                            <span className="font-pixel text-xs text-phosphor-green">RETRO ARCADE</span>
                        </div>

                        <h1 className="font-pixel text-3xl md:text-5xl text-gradient animate-glow-pulse">
                            GAME CENTER
                        </h1>

                        <p className="font-terminal text-sm text-text-secondary">
                            Click PLAY to launch game in fullscreen • Press ESC to exit
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {games.map((game) => (
                                <div
                                    key={game.id}
                                    className="group relative bg-bg-secondary border-3 border-accent-primary/30 hover:border-accent-primary transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-primary/30"
                                >
                                    <div className="p-6 space-y-4">
                                        <div className="text-6xl transform group-hover:scale-110 transition-transform text-center">
                                            {game.emoji}
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="font-pixel text-base text-text-primary group-hover:text-accent-primary transition-colors">
                                                {game.name}
                                            </h3>
                                            <p className="font-terminal text-xs text-text-secondary">
                                                {game.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handlePlayGame(game.id)}
                                            className="w-full retro-btn flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                                        >
                                            <LuPlay size={16} />
                                            <span>PLAY</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/" className="retro-btn flex items-center gap-2">
                            <LuHouse size={16} />
                            <span>BACK TO HOME</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div ref={gameContainerRef} className="w-full h-screen bg-black flex items-center justify-center">
                    {GameComponent && <GameComponent onExit={handleExitGame} />}
                </div>
            )}
        </div>
    );
};

export default ArcadePage;
