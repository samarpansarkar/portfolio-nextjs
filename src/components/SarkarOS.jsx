"use client";
import { useState, useEffect, useRef } from "react";
import { LuFileText, LuPaintbrush, LuTrash2, LuTerminal, LuGamepad2, LuFolder, LuX, LuMaximize, LuMinus } from "react-icons/lu";
import { playSound } from "@/utils/sound";

// 🪟 Reusable Draggable Retro Window Container
const RetroWindow = ({ title, icon: Icon, onClose, children, defaultX = 100, defaultY = 100, activeWin, setActiveWin, winId }) => {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // Only left clicks
    setActiveWin(winId);
    setDragging(true);
    setRel({
      x: e.pageX - pos.x,
      y: e.pageY - pos.y
    });
    e.stopPropagation();
  };

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e) => {
      // Constrain dragging to viewport limits
      const newX = Math.max(10, Math.min(window.innerWidth - 300, e.pageX - rel.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 200, e.pageY - rel.y));
      setPos({ x: newX, y: newY });
    };
    const onMouseUp = () => setDragging(false);
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  const isActive = activeWin === winId;

  return (
    <div
      onClick={() => setActiveWin(winId)}
      className="absolute win95-bevel p-0.5 select-none text-black flex flex-col min-w-[280px] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] z-20"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: isActive ? 200 : 150
      }}
    >
      {/* Windows Header Bar */}
      <div
        onMouseDown={onMouseDown}
        className={`px-2 py-1 flex items-center justify-between cursor-move font-terminal text-xs font-bold leading-none ${
          isActive 
            ? "win95-titlebar text-white" 
            : "bg-[#808080] text-[#c0c0c0]"
        }`}
      >
        <div className="flex items-center gap-1.5">
          {Icon && <Icon size={12} />}
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="win95-bevel w-4 h-4 flex items-center justify-center font-bold text-[9px] hover:bg-[#d5d5d5] active:border-inset focus:outline-hidden">
            <LuMinus size={8} className="translate-y-[2px]" />
          </button>
          <button className="win95-bevel w-4 h-4 flex items-center justify-center font-bold text-[9px] hover:bg-[#d5d5d5] active:border-inset focus:outline-hidden">
            <LuMaximize size={8} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              playSound("laser", true);
              onClose();
            }}
            className="win95-bevel w-4 h-4 flex items-center justify-center font-bold text-[10px] hover:bg-[#d5d5d5] active:border-inset focus:outline-hidden ml-1"
          >
            <LuX size={10} />
          </button>
        </div>
      </div>
      
      {/* Window Canvas */}
      <div className="p-3 bg-[#c0c0c0] text-xs font-terminal leading-relaxed flex-1">
        {children}
      </div>
    </div>
  );
};

export default function SarkarOS({ isOpen, onClose, triggerTerminal }) {
  const [activeWin, setActiveWin] = useState(null);
  const [openWins, setOpenWins] = useState({
    readme: false,
    paint: false,
    blaster: false,
    trash: false
  });

  const [paintGrid, setPaintGrid] = useState(Array(144).fill("#ffffff"));
  const [activeColor, setActiveColor] = useState("#33ff33");
  const [blasterScore, setBlasterScore] = useState(0);
  const [blasterPos, setBlasterPos] = useState({ x: 50, y: 50 });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Sync clock time
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const toggleWin = (winKey, state) => {
    playSound("coin", true);
    setOpenWins(prev => ({ ...prev, [winKey]: state }));
    if (state) setActiveWin(winKey);
  };

  // Blaster game Target coordinates
  const spawnTarget = () => {
    const margin = 20;
    const x = margin + Math.random() * (220 - margin);
    const y = margin + Math.random() * (120 - margin);
    setBlasterPos({ x, y });
  };

  const handleTargetHit = () => {
    playSound("coin", true);
    setBlasterScore(s => s + 10);
    spawnTarget();
  };

  return (
    <div className="fixed inset-0 bg-[#008080] z-[9995] font-terminal select-none text-white overflow-hidden flex flex-col justify-between">
      
      {/* 🖥️ Desktop Shortcut Grid */}
      <div className="flex-1 p-6 grid grid-flow-col auto-cols-max grid-rows-6 gap-6 justify-start items-start select-none content-start">
        
        {/* Readme Icon */}
        <div 
          onClick={() => toggleWin("readme", true)}
          className="flex flex-col items-center justify-center text-center w-20 p-2 cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/20 active:bg-white/20 transition-all rounded"
        >
          <LuFileText size={32} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]" />
          <span className="text-xxs font-bold text-white mt-1.5 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">README.TXT</span>
        </div>

        {/* Paint Icon */}
        <div 
          onClick={() => toggleWin("paint", true)}
          className="flex flex-col items-center justify-center text-center w-20 p-2 cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/20 active:bg-white/20 transition-all rounded"
        >
          <LuPaintbrush size={32} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]" />
          <span className="text-xxs font-bold text-white mt-1.5 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">PAINT.EXE</span>
        </div>

        {/* Space Blaster Icon */}
        <div 
          onClick={() => toggleWin("blaster", true)}
          className="flex flex-col items-center justify-center text-center w-20 p-2 cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/20 active:bg-white/20 transition-all rounded"
        >
          <LuGamepad2 size={32} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]" />
          <span className="text-xxs font-bold text-white mt-1.5 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">BLASTER.EXE</span>
        </div>

        {/* Trash Icon */}
        <div 
          onClick={() => toggleWin("trash", true)}
          className="flex flex-col items-center justify-center text-center w-20 p-2 cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/20 active:bg-white/20 transition-all rounded"
        >
          <LuTrash2 size={32} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]" />
          <span className="text-xxs font-bold text-white mt-1.5 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">RECYCLE BIN</span>
        </div>

        {/* CLI Terminal Shell shortcut */}
        <div 
          onClick={() => {
            playSound("laser", true);
            onClose();
            triggerTerminal();
          }}
          className="flex flex-col items-center justify-center text-center w-20 p-2 cursor-pointer hover:bg-white/10 border border-transparent hover:border-white/20 active:bg-white/20 transition-all rounded"
        >
          <LuTerminal size={32} className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]" />
          <span className="text-xxs font-bold text-white mt-1.5 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">SHELL.EXE</span>
        </div>

      </div>

      {/* 🪟 WINDOW OVERLAYS SECTION */}

      {/* 1. README Window */}
      {openWins.readme && (
        <RetroWindow 
          title="README.TXT" 
          icon={LuFileText}
          onClose={() => toggleWin("readme", false)}
          activeWin={activeWin}
          setActiveWin={setActiveWin}
          winId="readme"
          defaultX={60}
          defaultY={60}
        >
          <div className="win95-bevel-inset p-3 bg-white text-black min-h-[160px] max-w-[340px] font-mono leading-relaxed overflow-y-auto">
            <h4 className="font-bold text-xs uppercase border-b pb-1 mb-2 tracking-wide">Sarkar OS v95.01 // DIAGNOSTIC</h4>
            <p className="text-[10px] mb-2 leading-relaxed">
              Welcome, operator! This virtual Windows-95 Sandbox environment represents the ultimate interactive arcade simulation.
            </p>
            <p className="text-[10px] mb-2">
              Every folder, window coordinate, and Paint brush is coded purely using native React and custom double-bevel styles.
            </p>
            <p className="text-[10px] text-[#000080] font-bold">
              SYSTEM LEVEL: SECURE & STABLE.
            </p>
          </div>
        </RetroWindow>
      )}

      {/* 2. Paint App Applet */}
      {openWins.paint && (
        <RetroWindow 
          title="PAINT.EXE" 
          icon={LuPaintbrush}
          onClose={() => toggleWin("paint", false)}
          activeWin={activeWin}
          setActiveWin={setActiveWin}
          winId="paint"
          defaultX={120}
          defaultY={80}
        >
          <div className="space-y-3 max-w-[280px]">
            {/* 12x12 Pixel Canvas Grid */}
            <div className="grid grid-cols-12 gap-[1px] bg-[#808080] p-[1px] win95-bevel-inset">
              {paintGrid.map((color, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    playSound("tick", true);
                    const newGrid = [...paintGrid];
                    newGrid[idx] = activeColor;
                    setPaintGrid(newGrid);
                  }}
                  className="w-5 h-5 cursor-crosshair transition-all"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {/* Custom Palette selection */}
            <div className="flex items-center justify-between gap-2 p-1 border-t border-[#808080] pt-2">
              <div className="flex gap-1">
                {["#33ff33", "#ff3333", "#ffbe0b", "#ff006e", "#000000", "#ffffff"].map((color) => (
                  <div 
                    key={color}
                    onClick={() => {
                      playSound("blip", true);
                      setActiveColor(color);
                    }}
                    className={`w-4 h-4 cursor-pointer border ${
                      activeColor === color ? "border-black scale-110 shadow-sm" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button 
                onClick={() => {
                  playSound("laser", true);
                  setPaintGrid(Array(144).fill("#ffffff"));
                }}
                className="win95-bevel px-2 py-0.5 font-bold hover:bg-[#d5d5d5] active:border-inset focus:outline-hidden"
              >
                Clear
              </button>
            </div>
          </div>
        </RetroWindow>
      )}

      {/* 3. Asteroids Space Blaster Game applet */}
      {openWins.blaster && (
        <RetroWindow 
          title="BLASTER.EXE" 
          icon={LuGamepad2}
          onClose={() => toggleWin("blaster", false)}
          activeWin={activeWin}
          setActiveWin={setActiveWin}
          winId="blaster"
          defaultX={200}
          defaultY={110}
        >
          <div className="space-y-2 max-w-[260px]">
            <div className="flex justify-between items-center font-bold px-1 select-none text-[#000080]">
              <span>SCORE: {blasterScore}</span>
              <button 
                onClick={() => {
                  playSound("laser", true);
                  setBlasterScore(0);
                  spawnTarget();
                }}
                className="win95-bevel px-1.5 py-0.5 text-[9px] text-black"
              >
                Reset
              </button>
            </div>
            
            {/* Game Canvas */}
            <div className="relative w-full h-[150px] bg-[#121010] border-2 border-[#808080] overflow-hidden win95-bevel-inset">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
              {/* Click Target */}
              <div 
                onClick={handleTargetClick}
                className="absolute w-5 h-5 bg-[#ff3333] border border-white cursor-crosshair rounded-full flex items-center justify-center animate-ping"
                style={{
                  left: `${blasterPos.x}px`,
                  top: `${blasterPos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '1s'
                }}
              />
              <div 
                onClick={handleTargetHit}
                className="absolute w-4 h-4 bg-[#ff3333] border border-white cursor-crosshair rounded-full flex items-center justify-center hover:bg-[#ff0000]"
                style={{
                  left: `${blasterPos.x}px`,
                  top: `${blasterPos.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <p className="text-[9px] text-[#555] italic text-center select-none pt-1">
              👾 Click/shoot the blinking targets as fast as you can!
            </p>
          </div>
        </RetroWindow>
      )}

      {/* 4. Trash Bin Folder Window */}
      {openWins.trash && (
        <RetroWindow 
          title="RECYCLE BIN" 
          icon={LuTrash2}
          onClose={() => toggleWin("trash", false)}
          activeWin={activeWin}
          setActiveWin={setActiveWin}
          winId="trash"
          defaultX={280}
          defaultY={150}
        >
          <div className="win95-bevel-inset p-3 bg-white text-black min-h-[160px] max-w-[340px] leading-relaxed overflow-y-auto">
            <h5 className="font-bold border-b pb-1 text-[#808080] mb-2 uppercase flex justify-between select-none">
              <span>Deleted System Files</span>
              <span>4 items</span>
            </h5>
            
            {/* List trash files */}
            <div className="space-y-2 select-none text-[10px]">
              <div className="flex items-center gap-2 text-[#ff3333]">
                <LuFolder size={12} />
                <span>vaporwave_pills.zip (128 KB)</span>
              </div>
              <div className="flex items-center gap-2 text-[#ff3333]">
                <LuFileText size={12} />
                <span>lite_blue_theme.css (16 KB)</span>
              </div>
              <div className="flex items-center gap-2 text-[#ff3333]">
                <LuFileText size={12} />
                <span>rounded_pills.dll (512 KB)</span>
              </div>
              <div className="flex items-center gap-2 text-[#ff3333]">
                <LuGamepad2 size={12} />
                <span>generic_ui_template.exe (2.4 MB)</span>
              </div>
            </div>
            
            <p className="text-[9px] text-gray-500 italic mt-4 pt-2 border-t select-none leading-relaxed">
              "Every vaporwave element was deleted to ensure 100% core terminal compatibility!"
            </p>
          </div>
        </RetroWindow>
      )}

      {/* 🏁 BOTTOM OPERATOR TASKBAR */}
      <div className="h-10 bg-[#c0c0c0] border-t-2 border-white win95-bevel p-1 flex justify-between items-center text-black z-[9997] select-none">
        
        <div className="flex items-center gap-1.5 h-full relative">
          
          {/* Start Menu Button */}
          <button 
            onClick={() => {
              playSound("coin", true);
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`win95-bevel h-full px-2.5 flex items-center gap-1.5 font-bold font-terminal text-xs focus:outline-hidden hover:bg-[#d5d5d5] ${
              startMenuOpen ? "active:border-inset border-t-2 border-l-2 border-black" : ""
            }`}
          >
            <span className="text-red-600 font-extrabold font-pixel text-xs animate-glow-pulse">🚩</span>
            <span>Start</span>
          </button>

          {/* Draggable open window tabs indicators inside taskbar */}
          {Object.entries(openWins).map(([winKey, isOpened]) => {
            if (!isOpened) return null;
            return (
              <button 
                key={winKey}
                onClick={() => {
                  playSound("blip", true);
                  setActiveWin(winKey);
                }}
                className={`win95-bevel h-full px-3 text-[10px] hidden sm:flex items-center gap-1 border-t-2 border-l-2 border-white ${
                  activeWin === winKey ? "border-t border-l border-black bg-[#d5d5d5] font-bold" : ""
                }`}
              >
                <span className="uppercase">{winKey}</span>
              </button>
            );
          })}

          {/* Start Menu Dropdown */}
          {startMenuOpen && (
            <div className="absolute bottom-9 left-0 w-44 win95-bevel p-0.5 flex flex-col text-xs z-[9999] shadow-lg animate-pixel-fade-in text-black select-none">
              <div className="win95-titlebar text-white px-2 py-3 font-bold font-pixel text-xxs tracking-wider border-b select-none">
                SARKAR OS V95.01
              </div>
              <button 
                onClick={() => {
                  setStartMenuOpen(false);
                  toggleWin("readme", true);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
              >
                <LuFileText size={12} />
                <span>Read Developer Log</span>
              </button>
              <button 
                onClick={() => {
                  setStartMenuOpen(false);
                  toggleWin("paint", true);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
              >
                <LuPaintbrush size={12} />
                <span>Paintbrush Canvas</span>
              </button>
              <button 
                onClick={() => {
                  setStartMenuOpen(false);
                  toggleWin("blaster", true);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
              >
                <LuGamepad2 size={12} />
                <span>Alien Blaster</span>
              </button>
              <button 
                onClick={() => {
                  setStartMenuOpen(false);
                  playSound("laser", true);
                  onClose();
                  triggerTerminal();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 border-t select-none"
              >
                <LuTerminal size={12} />
                <span>Terminal console</span>
              </button>
              <button 
                onClick={() => {
                  setStartMenuOpen(false);
                  playSound("laser", true);
                  onClose();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#ff3333] hover:text-white border-t border-[#808080] flex items-center gap-2 font-bold"
              >
                <LuX size={12} className="text-red-600" />
                <span>Shut Down</span>
              </button>
            </div>
          )}

        </div>

        {/* real-time clock tray */}
        <div className="win95-bevel-inset h-full px-3 flex items-center gap-1.5 font-bold font-terminal text-[10px]">
          <span>{currentTime}</span>
        </div>

      </div>

    </div>
  );
}
