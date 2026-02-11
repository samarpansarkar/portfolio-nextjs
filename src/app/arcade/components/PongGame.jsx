"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";

const PongGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState({ player: 0, cpu: 0 });
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

        let ball = { x: 300, y: 300, dx: 4, dy: 4, size: 10 };
        let player = { x: 30, y: 250, width: 15, height: 100, dy: 0 };
        let cpu = { x: 555, y: 250, width: 15, height: 100 };

        const drawGame = () => {
            ctx.fillStyle = "#0a0e27";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#00f0ff";
            ctx.setLineDash([15, 8]);
            ctx.beginPath();
            ctx.moveTo(300, 0);
            ctx.lineTo(300, 600);
            ctx.stroke();

            ctx.fillStyle = "#ff006e";
            ctx.fillRect(player.x, player.y, player.width, player.height);

            ctx.fillStyle = "#ffbe0b";
            ctx.fillRect(cpu.x, cpu.y, cpu.width, cpu.height);

            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

            player.y += player.dy;
            if (player.y < 0) player.y = 0;
            if (player.y + player.height > 600) player.y = 600 - player.height;

            if (ball.y < cpu.y + cpu.height / 2) cpu.y -= 4;
            else cpu.y += 4;
            if (cpu.y < 0) cpu.y = 0;
            if (cpu.y + cpu.height > 600) cpu.y = 600 - cpu.height;

            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y <= 0 || ball.y + ball.size >= 600) ball.dy *= -1;

            if (
                ball.x <= player.x + player.width &&
                ball.y + ball.size >= player.y &&
                ball.y <= player.y + player.height
            ) {
                ball.dx *= -1;
            }

            if (
                ball.x + ball.size >= cpu.x &&
                ball.y + ball.size >= cpu.y &&
                ball.y <= cpu.y + cpu.height
            ) {
                ball.dx *= -1;
            }

            if (ball.x < 0) {
                setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
                ball = { x: 300, y: 300, dx: 4, dy: 4, size: 10 };
            }

            if (ball.x > 600) {
                setScore((s) => ({ ...s, player: s.player + 1 }));
                ball = { x: 300, y: 300, dx: -4, dy: 4, size: 10 };
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp") player.dy = -8;
            if (e.key === "ArrowDown") player.dy = 8;
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") player.dy = 0;
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        gameLoopRef.current = setInterval(drawGame, 1000 / 60);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted]);

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <div className="flex gap-12">
                <div className="pixel-border-pink px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-secondary text-sm">PLAYER</p>
                    <p className="font-pixel text-4xl text-phosphor-green text-center">{score.player}</p>
                </div>
                <div className="pixel-border-yellow px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-tertiary text-sm">CPU</p>
                    <p className="font-pixel text-4xl text-accent-tertiary text-center">{score.cpu}</p>
                </div>
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
                </div>
            </div>

            <div className="text-center font-terminal text-base text-text-secondary space-y-2">
                <p>Use ↑ ↓ arrow keys to move your paddle</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default PongGame;
