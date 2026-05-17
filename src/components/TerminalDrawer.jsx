"use client";
import { useState, useRef, useEffect } from "react";
import { playSound } from "@/utils/sound";
import { LuTerminal, LuX } from "react-icons/lu";

const TerminalDrawer = ({ isOpen, onClose, soundEnabled, onLaunchDesktop }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "=== RETRO PORTFOLIO COMMAND SHELL VER 1.0.0 ===", type: "system" },
    { text: "Type 'help' to view available commands.", type: "system" },
    { text: "", type: "system" },
  ]);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto-focus the input when drawer opens or is clicked
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      playSound("laser", soundEnabled);
    }
  }, [isOpen, soundEnabled]);

  // Scroll to bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const command = trimmedInput.toLowerCase();
    const newHistory = [...history, { text: `visitor@samarpan-dev:~$ ${input}`, type: "input" }];

    let response = [];

    switch (command) {
      case "help":
        playSound("coin", soundEnabled);
        response = [
          { text: "Available commands:", type: "output" },
          { text: "  skills       - Display developer languages, frameworks & proficiency", type: "output" },
          { text: "  projects     - Print lists of active projects & links", type: "output" },
          { text: "  contact      - Print and auto-copy developer email address", type: "output" },
          { text: "  arcade       - Open the games arcade center", type: "output" },
          { text: "  desktop      - Boot Sarkar OS Windows-95 Sandbox Desktop 🖥️", type: "output" },
          { text: "  stage select - Print Stage coordinates for quick warping", type: "output" },
          { text: "  secret       - Unlock a hidden legendary operator credential...", type: "output" },
          { text: "  clear        - Clear the terminal screen buffer", type: "output" },
          { text: "  exit         - Close this terminal drawer", type: "output" },
          { text: "  sudo hack    - Execute a secret security protocol...", type: "output" },
        ];
        break;

      case "desktop":
      case "sarkaros":
      case "sarkar os":
        playSound("power-up", soundEnabled);
        response = [
          { text: "🖥️ SARKAR OS v95.01 — BOOT SEQUENCE INITIATED...", type: "system" },
          { text: "  Loading kernel modules...............[OK]", type: "output" },
          { text: "  Mounting virtual file system............[OK]", type: "output" },
          { text: "  Starting GUI desktop environment.......[OK]", type: "output" },
          { text: "  ✅ SARKAR OS READY. Launching desktop...", type: "success" },
        ];
        setTimeout(() => {
          if (onLaunchDesktop) onLaunchDesktop();
        }, 900);
        break;

      case "clear":
        playSound("coin", soundEnabled);
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "close":
        playSound("laser", soundEnabled);
        setInput("");
        onClose();
        return;

      case "skills":
        playSound("coin", soundEnabled);
        response = [
          { text: "╔════════════════ DEVELOPER LEVEL ════════════════╗", type: "header" },
          { text: "  React / Next.js    [████████████████████] 100% (Expert)", type: "output" },
          { text: "  Node.js / Express  [██████████████████░░]  90% (Advanced)", type: "output" },
          { text: "  MongoDB / Mongoose [██████████████████░░]  90% (Advanced)", type: "output" },
          { text: "  Redux Toolkit      [████████████████░░░░]  80% (Advanced)", type: "output" },
          { text: "  Tailwind CSS / CSS [████████████████████] 100% (Expert)", type: "output" },
          { text: "╚═════════════════════════════════════════════════╝", type: "header" },
        ];
        break;

      case "projects":
        playSound("coin", soundEnabled);
        response = [
          { text: "🛠️ CURRENT DEPLOYMENTS:", type: "header" },
          { text: "  1. Portfolio Next.js - Fully responsive Retro 8-bit theme.", type: "output" },
          { text: "  2. Game Center - Arcade game hub supporting 8 vintage titles.", type: "output" },
          { text: "  3. Admin Dashboard - Secure custom operators panel.", type: "output" },
          { text: "  Type 'arcade' to play our retro gaming console!", type: "output" },
        ];
        break;

      case "contact":
        playSound("laser", soundEnabled);
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText("samarpansarkar209@gmail.com");
        }
        response = [
          { text: "📧 EMAIL RESOURCE RESOLVED:", type: "success" },
          { text: "  samarpansarkar209@gmail.com", type: "success" },
          { text: "  ✅ SUCCESS: Address automatically copied to clipboard!", type: "system" },
        ];
        break;

      case "arcade":
        playSound("coin", soundEnabled);
        response = [
          { text: "🎮 LAUNCHING ARCADE INJECTOR...", type: "system" },
          { text: "  Redirecting to arcade page in 1 second...", type: "system" },
        ];
        setTimeout(() => {
          window.location.href = "/arcade";
        }, 1000);
        break;

      case "stage":
      case "stage select":
        playSound("coin", soundEnabled);
        response = [
          { text: "🌐 STAGE COORDINATES RESOLVED:", type: "header" },
          { text: "  STAGE 01: #home     - Operator Bio & Console Shell", type: "output" },
          { text: "  STAGE 02: #about    - System Config Readouts & Log", type: "output" },
          { text: "  STAGE 03: #skills   - Developer Competency Matrix", type: "output" },
          { text: "  STAGE 04: #contact  - Direct Link channels", type: "output" },
          { text: "  Type any stage coordinate anchor inside your URL to warp directly!", type: "system" },
        ];
        break;

      case "secret":
      case "1up":
        playSound("power-up", soundEnabled);
        response = [
          { text: "⭐ [ UNLOCKED: 1UP ELITE DEVELOPER BADGE ] ⭐", type: "success" },
          { text: "   ___________________________________________", type: "output" },
          { text: "  |                                           |", type: "output" },
          { text: "  |        [S]  SARKAR / OPERATOR CRED        |", type: "output" },
          { text: "  |   - STATUS: ELITE CODING CAB OPERATOR     |", type: "output" },
          { text: "  |   - ACCESS: ALL STAGES GRANTED (9999)     |", type: "output" },
          { text: "  |___________________________________________|", type: "output" },
          { text: "  ", type: "output" },
          { text: "  🏆 CONGRATULATIONS: You solved the cabinet secret!", type: "success" },
        ];
        break;

      case "sudo hack":
      case "hack":
        playSound("power-up", soundEnabled);
        response = [
          { text: "🚨 WARNING: ILLEGAL ACCESS PROTOCOL DETECTED 🚨", type: "error" },
          { text: "  Decrypting portfolio secrets...", type: "output" },
          { text: "  Initializing system breach sequence...", type: "output" },
          { text: "  [░░░░░░░░░░░░░░░░░░░░] 0%", type: "output" },
          { text: "  [████████░░░░░░░░░░░░] 40%", type: "output" },
          { text: "  [████████████████████] 100%", type: "output" },
          { text: "  BREACH SUCCESSFUL: Developer is incredibly talented! 😉", type: "success" },
        ];
        break;

      default:
        playSound("error", soundEnabled);
        response = [
          { text: `bash: command not found: ${trimmedInput}`, type: "error" },
          { text: "Type 'help' to review a list of valid commands.", type: "output" },
        ];
        break;
    }

    setHistory([...newHistory, ...response]);
    setInput("");
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleContainerClick}
      className="fixed top-0 left-0 w-full h-[100dvh] md:h-[45vh] bg-[#030612]/95 border-b-4 border-phosphor-green z-[9990] flex flex-col font-terminal text-xs md:text-sm shadow-2xl shadow-phosphor-green/20 overflow-hidden cursor-text select-none animate-pixel-fade-in"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(51, 255, 51, 0.02) 0px,
          rgba(51, 255, 51, 0.02) 1.5px,
          transparent 1.5px,
          transparent 3px
        )`,
      }}
    >
      {/* Header bar */}
      <div className="flex justify-between items-center bg-[#071307] px-3 py-1.5 md:px-4 md:py-2 border-b-2 border-phosphor-green/30 select-none">
        <div className="flex items-center gap-2 text-phosphor-green">
          <LuTerminal size={12} className="animate-blink" />
          <span className="font-pixel text-[8px] md:text-[10px] tracking-wider">PORTFOLIO SHELL TERMINAL</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] md:text-xs">
          <span className="hidden sm:inline text-text-secondary">SHORTCUT: [ ` ] TO TOGGLE</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound("laser", soundEnabled);
              onClose();
            }}
            className="p-1 text-phosphor-green hover:bg-phosphor-green hover:text-bg-primary transition-all duration-200 border border-phosphor-green/30 cursor-pointer"
          >
            <LuX size={12} />
          </button>
        </div>
      </div>

      {/* Output Console Buffer */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-phosphor-green/20">
        {history.map((line, idx) => {
          let colorClass = "text-text-primary";
          if (line.type === "system") colorClass = "text-accent-primary";
          else if (line.type === "input") colorClass = "text-[#ffbe0b]";
          else if (line.type === "output") colorClass = "text-[#88ff88]";
          else if (line.type === "header") colorClass = "text-accent-secondary";
          else if (line.type === "error") colorClass = "text-[#ff4a4a]";
          else if (line.type === "success") colorClass = "text-phosphor-green text-shadow-glow";

          return (
            <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap breakdown-words`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleCommandSubmit} className="flex items-center px-3 py-2.5 md:px-4 md:py-3 bg-[#050c05] border-t border-phosphor-green/20">
        <span className="text-phosphor-green font-bold mr-1.5 md:mr-2 select-none terminal-input-glow text-xs md:text-sm">visitor@samarpan-dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-phosphor-green border-none outline-none font-terminal text-xs md:text-sm caret-transparent terminal-input-glow"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div className="terminal-cursor"></div>
      </form>
    </div>
  );
};

export default TerminalDrawer;
