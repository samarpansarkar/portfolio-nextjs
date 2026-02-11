"use client";
import { useEffect, useState } from "react";
import { LuPlay, LuRotateCcw } from "react-icons/lu";

const MemoryGame = ({ onExit }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [won, setWon] = useState(false);

    const emojis = ['🎮', '🕹️', '👾', '🎯', '🎲', '🎪', '🎨', '🎭'];

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && onExit) {
                onExit();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onExit]);

    const initializeGame = () => {
        const shuffledCards = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji, flipped: false }));
        setCards(shuffledCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setWon(false);
        setGameStarted(true);
    };

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].emoji)) {
            return;
        }

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;

            if (cards[first].emoji === cards[second].emoji) {
                setMatched([...matched, cards[first].emoji]);
                setFlipped([]);

                if (matched.length + 1 === emojis.length) {
                    setTimeout(() => setWon(true), 500);
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <div className="pixel-border-pink px-8 py-4 bg-bg-secondary">
                <p className="font-terminal text-accent-secondary text-sm">MOVES</p>
                <p className="font-pixel text-4xl text-phosphor-green text-center">{moves}</p>
            </div>

            {!gameStarted ? (
                <div className="flex items-center justify-center h-96">
                    <button onClick={initializeGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                        <LuPlay size={24} />
                        <span>START GAME</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4 p-8 pixel-border bg-bg-secondary/50">
                    {cards.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className={`w-24 h-24 text-5xl pixel-border transition-all duration-300 transform hover:scale-105 ${flipped.includes(index) || matched.includes(card.emoji)
                                    ? 'bg-accent-primary'
                                    : 'bg-bg-secondary hover:bg-accent-primary/20'
                                }`}
                        >
                            {flipped.includes(index) || matched.includes(card.emoji) ? card.emoji : '?'}
                        </button>
                    ))}
                </div>
            )}

            {won && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-sm space-y-8">
                    <div className="text-center space-y-4">
                        <p className="font-pixel text-4xl text-phosphor-green animate-glow-pulse">YOU WIN!</p>
                        <p className="font-terminal text-2xl text-accent-primary">MOVES: {moves}</p>
                    </div>
                    <button onClick={initializeGame} className="retro-btn flex items-center gap-3 text-lg px-8 py-4">
                        <LuRotateCcw size={24} />
                        <span>PLAY AGAIN</span>
                    </button>
                </div>
            )}

            <div className="text-center font-terminal text-base text-text-secondary space-y-2">
                <p>Match all pairs to win!</p>
                <p className="text-accent-primary">Press ESC to exit</p>
            </div>
        </div>
    );
};

export default MemoryGame;
