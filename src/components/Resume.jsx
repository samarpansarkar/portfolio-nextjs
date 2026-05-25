"use client";

const Resume = () => {
  return (
    <a
      href="/resume/resume.pdf"
      download
      className="retro-btn group relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <span>📄</span>
        <span>DOWNLOAD CV</span>
      </span>
      {/* Pixel Shimmer Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent-primary/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
    </a>
  );
};

export default Resume;
