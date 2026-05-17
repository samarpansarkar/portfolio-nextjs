let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * Synthesizes and plays retro 8-bit audio effects using the Web Audio API.
 * @param {string} type - The sound preset: 'blip', 'coin', 'laser', 'error', 'power-up'
 * @param {boolean} enabled - Whether sound is currently enabled/unmuted
 */
export const playSound = (type, enabled = true) => {
  if (!enabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser security autoplays)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case "blip":
      // Short high-frequency sine beep (link hover)
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
      break;

    case "coin":
      // Classic dual-tone retro arpeggio (button click / insert coin)
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.setValueAtTime(0.02, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case "laser":
      // Rapid downward sawtooth pitch sweep (form submission / drawer opening)
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.22);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
      break;

    case "error":
      // Low-frequency buzzy square wave drop (invalid actions)
      osc.type = "square";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
      break;

    case "power-up":
      // Uplifting ascending major arpeggio (BIOS boot success)
      osc.type = "triangle";
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      });
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;

    default:
      break;
  }
};
