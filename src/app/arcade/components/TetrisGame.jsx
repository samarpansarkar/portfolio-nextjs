"use client";
import { useEffect, useRef, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const TetrisGame = ({ onExit }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
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
        const COLS = 10;
        const ROWS = 20;
        const BLOCK_SIZE = 30;

        const SHAPES = [
            [[1, 1, 1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1, 1], [0, 1, 0]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1, 1], [1, 1, 0]]
        ];

        const COLORS = ['#ff006e', '#00f0ff', '#ffbe0b', '#fb5607', '#8338ec', '#3a86ff', '#06ffa5'];

        let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        let currentPiece = null;
        let currentX = 0;
        let currentY = 0;
        let currentColor = 0;
        let currentScore = 0;
        let fallSpeed = 500;

        const newPiece = () => {
            const shapeIndex = Math.floor(Math.random() * SHAPES.length);
            currentPiece = SHAPES[shapeIndex];
            currentColor = shapeIndex;
            currentX = Math.floor(COLS / 2) - Math.floor(currentPiece[0].length / 2);
            currentY = 0;

            if (collision()) {
                setGameOver(true);
                return false;
            }
            return true;
        };

        const collision = (offsetX = 0, offsetY = 0, piece = currentPiece) => {
            for (let y = 0; y < piece.length; y++) {
                for (let x = 0; x < piece[y].length; x++) {
                    if (piece[y][x]) {
                        const newX = currentX + x + offsetX;
                        const newY = currentY + y + offsetY;
                        if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                        if (newY >= 0 && board[newY][newX]) return true;
                    }
                }
            }
            return false;
        };

        const merge = () => {
            currentPiece.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        board[currentY + y][currentX + x] = currentColor + 1;
                    }
                });
            });
        };

        const clearLines = () => {
            let linesCleared = 0;
            for (let y = ROWS - 1; y >= 0; y--) {
                if (board[y].every(cell => cell !== 0)) {
                    board.splice(y, 1);
                    board.unshift(Array(COLS).fill(0));
                    linesCleared++;
                    y++;
                }
            }
            if (linesCleared > 0) {
                currentScore += linesCleared * 100 * level;
                setScore(currentScore);
                setLevel(Math.floor(currentScore / 500) + 1);
            }
        };

        const rotate = () => {
            const rotated = currentPiece[0].map((_, i) =>
                currentPiece.map(row => row[i]).reverse()
            );
            if (!collision(0, 0, rotated)) {
                currentPiece = rotated;
            }
        };

        const draw = () => {
            ctx.fillStyle = '#0a0e27';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            board.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        ctx.fillStyle = COLORS[value - 1];
                        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                    }
                });
            });

            if (currentPiece) {
                ctx.fillStyle = COLORS[currentColor];
                currentPiece.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value) {
                            ctx.fillRect(
                                (currentX + x) * BLOCK_SIZE,
                                (currentY + y) * BLOCK_SIZE,
                                BLOCK_SIZE - 1,
                                BLOCK_SIZE - 1
                            );
                        }
                    });
                });
            }
        };

        let lastTime = 0;
        const gameLoop = (time = 0) => {
            if (gameOver) return;

            const deltaTime = time - lastTime;
            if (deltaTime > fallSpeed) {
                lastTime = time;
                if (!collision(0, 1)) {
                    currentY++;
                } else {
                    merge();
                    clearLines();
                    if (!newPiece()) return;
                }
            }

            draw();
            requestAnimationFrame(gameLoop);
        };

        const handleKeyDown = (e) => {
            if (!currentPiece) return;
            switch (e.key) {
                case 'ArrowLeft':
                    if (!collision(-1, 0)) currentX--;
                    break;
                case 'ArrowRight':
                    if (!collision(1, 0)) currentX++;
                    break;
                case 'ArrowDown':
                    if (!collision(0, 1)) currentY++;
                    break;
                case 'ArrowUp':
                case ' ':
                    rotate();
                    break;
            }
            draw();
        };

        document.addEventListener('keydown', handleKeyDown);
        newPiece();
        requestAnimationFrame(gameLoop);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStarted, gameOver, level]);

    const startGame = () => {
        setGameOver(false);
        setScore(0);
        setLevel(1);
        setGameStarted(true);
    };

    const resetGame = () => {
        setGameOver(false);
        setScore(0);
        setLevel(1);
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
                    <p className="font-terminal text-accent-tertiary text-sm">LEVEL</p>
                    <p className="font-pixel text-4xl text-accent-tertiary text-center">{level}</p>
                </div>
            </div>

            <div className="crt-frame">
                <div className="crt-screen relative">
                    <canvas ref={canvasRef} width={300} height={600} className="pixel-art" />

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
                                <p className="font-terminal text-xl text-text-secondary">LEVEL: {level}</p>
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
                <p>↑ or SPACE to rotate • ← → to move • ↓ to drop faster</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default TetrisGame;
