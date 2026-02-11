"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuHouse, LuPlay, LuRotateCcw } from "react-icons/lu";

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const gameLoopRef = useRef(null);

    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let velocity = { x: 0, y: 0 };
        let food = { x: 15, y: 15 };
        let currentScore = 0;

        const drawGame = () => {
            if (gameOver) return;

            ctx.fillStyle = "#0a0e27";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00f0ff";
            snake.forEach((segment, index) => {
                if (index === 0) {
                    ctx.fillStyle = "#ff006e";
                } else {
                    ctx.fillStyle = "#00f0ff";
                }
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });

            ctx.fillStyle = "#ffbe0b";
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                setGameOver(true);
                return;
            }

            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    setGameOver(true);
                    return;
                }
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                currentScore += 10;
                setScore(currentScore);
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount),
                };
            } else {
                snake.pop();
            }
        };

        const handleKeyPress = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if (velocity.y === 0) velocity = { x: 0, y: -1 };
                    break;
                case "ArrowDown":
                    if (velocity.y === 0) velocity = { x: 0, y: 1 };
                    break;
                case "ArrowLeft":
                    if (velocity.x === 0) velocity = { x: -1, y: 0 };
                    break;
                case "ArrowRight":
                    if (velocity.x === 0) velocity = { x: 1, y: 0 };
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        gameLoopRef.current = setInterval(drawGame, 100);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted, gameOver]);

    const startGame = () => {
        setGameOver(false);
        setScore(0);
        setGameStarted(true);
    };

    const resetGame = () => {
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 pixel-border bg-bg-secondary">
                        <div className="w-2 h-2 bg-phosphor-green animate-blink"></div>
                        <span className="font-pixel text-xs text-phosphor-green">RETRO ARCADE</span>
                    </div>

                    <h1 className="font-pixel text-3xl md:text-5xl text-gradient animate-glow-pulse">
                        SNAKE GAME
                    </h1>

                    <div className="flex justify-center gap-8">
                        <div className="pixel-border-pink px-6 py-3 bg-bg-secondary">
                            <p className="font-terminal text-accent-secondary text-xs">SCORE</p>
                            <p className="font-pixel text-2xl text-phosphor-green">{score}</p>
                        </div>
                        <div className="pixel-border-yellow px-6 py-3 bg-bg-secondary">
                            <p className="font-terminal text-accent-tertiary text-xs">HIGH SCORE</p>
                            <p className="font-pixel text-2xl text-accent-tertiary">999</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="crt-frame inline-block">
                        <div className="crt-screen relative">
                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={400}
                                className="pixel-art"
                            />

                            {!gameStarted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm">
                                    <button
                                        onClick={startGame}
                                        className="retro-btn flex items-center gap-2 hover:scale-105 transition-transform"
                                    >
                                        <LuPlay size={16} />
                                        <span>START GAME</span>
                                    </button>
                                </div>
                            )}

                            {gameOver && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-sm space-y-6">
                                    <div className="text-center space-y-2">
                                        <p className="font-pixel text-2xl text-accent-secondary animate-blink">GAME OVER</p>
                                        <p className="font-terminal text-xl text-phosphor-green">SCORE: {score}</p>
                                    </div>
                                    <button
                                        onClick={resetGame}
                                        className="retro-btn flex items-center gap-2 hover:scale-105 transition-transform"
                                    >
                                        <LuRotateCcw size={16} />
                                        <span>PLAY AGAIN</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pixel-border p-6 bg-bg-secondary/50 backdrop-blur-sm">
                    <h3 className="font-pixel text-sm text-accent-primary mb-4">HOW TO PLAY</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-terminal text-sm text-text-secondary">
                        <div className="text-center space-y-2">
                            <div className="text-2xl">↑</div>
                            <div>UP</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-2xl">↓</div>
                            <div>DOWN</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-2xl">←</div>
                            <div>LEFT</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-2xl">→</div>
                            <div>RIGHT</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/" className="retro-btn flex items-center gap-2">
                        <LuHouse size={16} />
                        <span>BACK TO HOME</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
