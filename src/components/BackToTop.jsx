"use client";
import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 p-4 pixel-border bg-accent-primary text-bg-primary hover:bg-accent-secondary shadow-neon-cyan hover:shadow-neon-pink transition-all duration-200 hover:-translate-y-1 active:translate-y-0 group animate-pixel-fade-in"
                    aria-label="Back to top"
                >
                    <LuArrowUp size={24} className="group-hover:animate-bounce" />
                    <span className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-accent-tertiary animate-glow-pulse"></span>
                </button>
            )}
        </>
    );
};

export default BackToTop;
