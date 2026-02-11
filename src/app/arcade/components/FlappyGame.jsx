"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const FlappyGame = ({ onExit }) => {
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

        let bird = { x: 100, y: 250, width: 34, height: 24, velocity: 0, gravity: 0.5, jump: -8 };
        let pipes = [];
        let frameCount = 0;
        let currentScore = 0;

        const createPipe = () => {
            const gap = 150;
            const minHeight = 50;
            const maxHeight = 350;
            const height = Math.random() * (maxHeight - minHeight) + minHeight;

            pipes.push({
                x: 600,
                topHeight: height,
                bottomY: height + gap,
                width: 60,
                passed: false
            });
        };

        const draw = () => {
            ctx.fillStyle = '#0a0e27';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw bird
            ctx.fillStyle = '#ffbe0b';
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
            ctx.fillStyle = '#ff006e';
            ctx.fillRect(bird.x + 20, bird.y + 8, 8, 8);
            ctx.fillRect(bird.x + 5, bird.y + 18, 8, 3);

            // Draw pipes
            ctx.fillStyle = '#00f0ff';
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
                ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, 600 - pipe.bottomY);
            });
        };

        const update = () => {
            if (gameOver) return;

            frameCount++;

            // Create pipes
            if (frameCount % 90 === 0) {
                createPipe();
            }

            // Update bird
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            // Check ground/ceiling collision
            if (bird.y + bird.height > 600 || bird.y < 0) {
                setGameOver(true);
                return;
            }

            // Update pipes
            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
            pipes.forEach(pipe => {
                pipe.x -= 3;

                // Check collision
                if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width) {
                    if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                        setGameOver(true);
                    }
                }

                // Score
                if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                    pipe.passed = true;
                    currentScore++;
                    setScore(currentScore);
                }
            });

            draw();
        };

        const handleClick = () => {
            bird.velocity = bird.jump;
        };

        const handleKeyDown = (e) => {
            if (e.key === ' ' || e.key === 'ArrowUp') {
                bird.velocity = bird.jump;
            }
        };

        canvas.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        gameLoopRef.current = setInterval(update, 1000 / 60);

        return () => {
            canvas.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted, gameOver]);

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
                    <canvas ref={canvasRef} width={600} height={600} className="pixel-art cursor-pointer" />

                    {!gameStarted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/90 backdrop-blur-sm">
                            <button onClick={() => setGameStarted(true)} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
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
                <p>Click or press SPACE to flap • Avoid the pipes!</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default FlappyGame;
