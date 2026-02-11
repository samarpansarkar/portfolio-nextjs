"use client";

const Github = () => {
  return (
    <a
      href="https://github.com/samarpansarkar"
      target="_blank"
      rel="noopener noreferrer"
      className="font-pixel text-xs px-6 py-3 border-4 border-accent-secondary bg-bg-primary text-accent-secondary hover:bg-accent-secondary hover:text-bg-primary shadow-pixel transition-all duration-200 hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 active:shadow-none uppercase group relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <span>🎮</span>
        <span>VIEW GITHUB</span>
      </span>
      {/* Pixel Shimmer Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent-secondary/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
    </a>
  );
};

export default Github;
