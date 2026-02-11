"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const BreakoutGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [won, setWon] = useState(false);
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

        let ball = { x: 300, y: 450, dx: 4, dy: -4, size: 10 };
        let paddle = { x: 250, y: 550, width: 100, height: 12 };
        let bricks = [];
        let currentScore = 0;

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 10; col++) {
                bricks.push({
                    x: col * 60 + 10,
                    y: row * 25 + 50,
                    width: 55,
                    height: 20,
                    visible: true,
                    color: row % 3 === 0 ? "#ff006e" : row % 3 === 1 ? "#00f0ff" : "#ffbe0b",
                });
            }
        }

        const drawGame = () => {
            if (gameOver || won) return;

            ctx.fillStyle = "#0a0e27";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            bricks.forEach((brick) => {
                if (brick.visible) {
                    ctx.fillStyle = brick.color;
                    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                }
            });

            ctx.fillStyle = "#ff006e";
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.x <= 0 || ball.x + ball.size >= 600) ball.dx *= -1;
            if (ball.y <= 0) ball.dy *= -1;

            if (ball.y + ball.size >= paddle.y && ball.x + ball.size >= paddle.x && ball.x <= paddle.x + paddle.width) {
                ball.dy *= -1;
            }

            if (ball.y > 600) {
                setGameOver(true);
                return;
            }

            bricks.forEach((brick) => {
                if (
                    brick.visible &&
                    ball.x + ball.size >= brick.x &&
                    ball.x <= brick.x + brick.width &&
                    ball.y + ball.size >= brick.y &&
                    ball.y <= brick.y + brick.height
                ) {
                    brick.visible = false;
                    ball.dy *= -1;
                    currentScore += 10;
                    setScore(currentScore);
                }
            });

            if (bricks.every((b) => !b.visible)) {
                setWon(true);
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            paddle.x = e.clientX - rect.left - paddle.width / 2;
            if (paddle.x < 0) paddle.x = 0;
            if (paddle.x + paddle.width > 600) paddle.x = 600 - paddle.width;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        gameLoopRef.current = setInterval(drawGame, 1000 / 60);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted, gameOver, won]);

    const resetGame = () => {
        setGameOver(false);
        setWon(false);
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
                    <canvas ref={canvasRef} width={600} height={600} className="pixel-art" />

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

                    {won && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-sm space-y-8">
                            <div className="text-center space-y-4">
                                <p className="font-pixel text-4xl text-phosphor-green animate-glow-pulse">YOU WIN!</p>
                                <p className="font-terminal text-2xl text-accent-primary">SCORE: {score}</p>
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
                <p>Move your mouse to control the paddle</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default BreakoutGame;
