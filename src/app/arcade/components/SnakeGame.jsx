"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const SnakeGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const gameLoopRef = useRef(null);

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

            snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? "#ff006e" : "#00f0ff";
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
        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.focus();
            }
        }, 100);
    };

    const resetGame = () => {
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <div className="pixel-border-pink px-8 py-4 bg-bg-secondary">
                <p className="font-terminal text-accent-secondary text-sm">SCORE</p>
                <p className="font-pixel text-4xl text-phosphor-green text-center">{score}</p>
            </div>

            <div className="crt-frame">
                <div className="crt-screen relative">
                    <canvas ref={canvasRef} width={600} height={600} className="pixel-art" tabIndex={0} />

                    {!gameStarted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm">
                            <button onClick={startGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                                <LuPlay size={24} />
                                <span>START GAME</span>
                            </button>
                        </div>
                    )}

                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-sm space-y-8">
                            <div className="text-center space-y-4">
                                <p className="font-pixel text-4xl text-accent-secondary animate-blink">GAME OVER</p>
                                <p className="font-terminal text-2xl text-phosphor-green">SCORE: {score}</p>
                            </div>
                            <button onClick={resetGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                                <LuRotateCcw size={24} />
                                <span>PLAY AGAIN</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center font-terminal text-base text-text-secondary space-y-2">
                <p>Use arrow keys (↑ ↓ ← →) to control the snake</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default SnakeGame;
