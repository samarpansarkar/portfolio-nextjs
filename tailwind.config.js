/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-primary": "var(--accent-primary)",
        "accent-secondary": "var(--accent-secondary)",
        "accent-tertiary": "var(--accent-tertiary)",
        "card-bg": "var(--card-bg)",
        "phosphor-green": "var(--phosphor-green)",
      },
      backgroundImage: {
        "gradient-text": "var(--gradient-text)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "cursive"],
        terminal: ["var(--font-terminal)", "monospace"],
        retro: ["var(--font-retro)", "cursive"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        pixel: "var(--pixel-shadow)",
        "neon-cyan": "var(--neon-glow-cyan)",
        "neon-pink": "var(--neon-glow-pink)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        pixelFadeIn: {
          from: { opacity: "0", filter: "blur(2px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        slideUpPixel: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor",
          },
          "50%": {
            textShadow:
              "0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor",
          },
        },
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        insertCoin: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.3" },
        },
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
        "pixel-fade-in": "pixelFadeIn 0.4s steps(4, end) forwards",
        "slide-up-pixel": "slideUpPixel 0.6s steps(8, end) forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        "insert-coin": "insertCoin 1.5s ease-in-out infinite",
      },
      spacing: {
        // Pixel-perfect 8px grid
        px: "1px",
        0.5: "4px",
        1: "8px",
        1.5: "12px",
        2: "16px",
        2.5: "20px",
        3: "24px",
        3.5: "28px",
        4: "32px",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
