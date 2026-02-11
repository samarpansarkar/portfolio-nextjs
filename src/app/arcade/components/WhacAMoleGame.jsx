"use client";
import { useEffect, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const WhacAMoleGame = ({ onExit }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [moles, setMoles] = useState(Array(9).fill(false));
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && onExit) {
                onExit();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onExit]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const moleInterval = setInterval(() => {
            const newMoles = Array(9).fill(false);
            const numMoles = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < numMoles; i++) {
                const randomIndex = Math.floor(Math.random() * 9);
                newMoles[randomIndex] = true;
            }

            setMoles(newMoles);
        }, 800);

        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(moleInterval);
            clearInterval(timerInterval);
        };
    }, [gameStarted, gameOver]);

    const whackMole = (index) => {
        if (moles[index]) {
            setScore(score + 10);
            setMoles(prev => {
                const newMoles = [...prev];
                newMoles[index] = false;
                return newMoles;
            });
        }
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        setGameStarted(true);
        setMoles(Array(9).fill(false));
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <div className="flex gap-8">
                <div className="pixel-border-pink px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-secondary text-sm">SCORE</p>
                    <p className="font-pixel text-4xl text-phosphor-green text-center">{score}</p>
                </div>
                <div className="pixel-border-yellow px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-tertiary text-sm">TIME</p>
                    <p className="font-pixel text-4xl text-accent-tertiary text-center">{timeLeft}</p>
                </div>
            </div>

            {!gameStarted ? (
                <div className="flex items-center justify-center h-96">
                    <button onClick={startGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                        <LuPlay size={24} />
                        <span>START GAME</span>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <div className="grid grid-cols-3 gap-4 p-8 pixel-border bg-bg-secondary/50">
                        {moles.map((isUp, index) => (
                            <button
                                key={index}
                                onClick={() => whackMole(index)}
                                className={`w-32 h-32 pixel-border transition-all duration-200 ${isUp
                                        ? 'bg-accent-secondary hover:bg-accent-secondary/80 scale-105'
                                        : 'bg-bg-secondary hover:bg-accent-primary/20'
                                    }`}
                            >
                                <div className="text-6xl">
                                    {isUp ? '🐹' : '🕳️'}
                                </div>
                            </button>
                        ))}
                    </div>

                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-sm space-y-8">
                            <div className="text-center space-y-4">
                                <p className="font-pixel text-4xl text-phosphor-green animate-glow-pulse">TIME'S UP!</p>
                                <p className="font-terminal text-2xl text-accent-primary">SCORE: {score}</p>
                            </div>
                            <button onClick={startGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                                <LuRotateCcw size={24} />
                                <span>PLAY AGAIN</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="text-center font-terminal text-base text-text-secondary space-y-2">
                <p>Click the moles when they pop up!</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default WhacAMoleGame;
