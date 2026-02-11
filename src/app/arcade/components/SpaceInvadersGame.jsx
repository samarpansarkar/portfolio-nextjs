"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const SpaceInvadersGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
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

        let player = { x: 275, y: 550, width: 50, height: 30, speed: 8 };
        let bullets = [];
        let aliens = [];
        let alienBullets = [];
        let keys = {};
        let alienDirection = 1;
        let currentScore = 0;
        let currentLives = 3;

        // Create aliens
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
                aliens.push({
                    x: col * 70 + 30,
                    y: row * 50 + 50,
                    width: 40,
                    height: 30,
                    alive: true
                });
            }
        }

        const draw = () => {
            ctx.fillStyle = '#0a0e27';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw player
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillRect(player.x + 20, player.y - 10, 10, 10);

            // Draw bullets
            ctx.fillStyle = '#ffbe0b';
            bullets.forEach(bullet => {
                ctx.fillRect(bullet.x, bullet.y, 4, 15);
            });

            // Draw alien bullets
            ctx.fillStyle = '#ff006e';
            alienBullets.forEach(bullet => {
                ctx.fillRect(bullet.x, bullet.y, 4, 15);
            });

            // Draw aliens
            aliens.forEach(alien => {
                if (alien.alive) {
                    ctx.fillStyle = '#ff006e';
                    ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
                    ctx.fillStyle = '#ffbe0b';
                    ctx.fillRect(alien.x + 10, alien.y + 5, 8, 8);
                    ctx.fillRect(alien.x + 22, alien.y + 5, 8, 8);
                }
            });
        };

        const update = () => {
            if (gameOver || won) return;

            // Move player
            if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
            if (keys['ArrowRight'] && player.x < 550) player.x += player.speed;

            // Move bullets
            bullets = bullets.filter(bullet => {
                bullet.y -= 8;
                return bullet.y > 0;
            });

            // Move alien bullets
            alienBullets = alienBullets.filter(bullet => {
                bullet.y += 5;
                return bullet.y < 600;
            });

            // Move aliens
            let shouldMoveDown = false;
            aliens.forEach(alien => {
                if (alien.alive) {
                    alien.x += alienDirection * 2;
                    if (alien.x <= 0 || alien.x >= 560) {
                        shouldMoveDown = true;
                    }
                }
            });

            if (shouldMoveDown) {
                alienDirection *= -1;
                aliens.forEach(alien => {
                    if (alien.alive) alien.y += 20;
                });
            }

            // Alien shooting
            if (Math.random() < 0.02) {
                const aliveAliens = aliens.filter(a => a.alive);
                if (aliveAliens.length > 0) {
                    const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
                    alienBullets.push({ x: shooter.x + 18, y: shooter.y + 30 });
                }
            }

            // Check bullet collisions
            bullets.forEach((bullet, bi) => {
                aliens.forEach((alien, ai) => {
                    if (alien.alive &&
                        bullet.x >= alien.x && bullet.x <= alien.x + alien.width &&
                        bullet.y >= alien.y && bullet.y <= alien.y + alien.height) {
                        alien.alive = false;
                        bullets.splice(bi, 1);
                        currentScore += 10;
                        setScore(currentScore);
                    }
                });
            });

            // Check alien bullet hits player
            alienBullets.forEach((bullet, i) => {
                if (bullet.x >= player.x && bullet.x <= player.x + player.width &&
                    bullet.y >= player.y && bullet.y <= player.y + player.height) {
                    alienBullets.splice(i, 1);
                    currentLives--;
                    setLives(currentLives);
                    if (currentLives <= 0) {
                        setGameOver(true);
                    }
                }
            });

            // Check if aliens reached bottom
            aliens.forEach(alien => {
                if (alien.alive && alien.y > 520) {
                    setGameOver(true);
                }
            });

            // Check win condition
            if (aliens.every(a => !a.alive)) {
                setWon(true);
            }

            draw();
        };

        const handleKeyDown = (e) => {
            keys[e.key] = true;
            if (e.key === ' ') {
                bullets.push({ x: player.x + 23, y: player.y });
            }
        };

        const handleKeyUp = (e) => {
            keys[e.key] = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        gameLoopRef.current = setInterval(update, 1000 / 60);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [gameStarted, gameOver, won]);

    const resetGame = () => {
        setGameOver(false);
        setWon(false);
        setScore(0);
        setLives(3);
        setGameStarted(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <div className="flex gap-8">
                <div className="pixel-border-pink px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-secondary text-sm">SCORE</p>
                    <p className="font-pixel text-4xl text-phosphor-green text-center">{score}</p>
                </div>
                <div className="pixel-border-yellow px-8 py-4 bg-bg-secondary">
                    <p className="font-terminal text-accent-tertiary text-sm">LIVES</p>
                    <p className="font-pixel text-4xl text-accent-secondary text-center">{lives}</p>
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
                                <p className="font-pixel text-4xl text-phosphor-green animate-glow-pulse">VICTORY!</p>
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
                <p>← → to move • SPACE to shoot • Defeat all aliens!</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default SpaceInvadersGame;
