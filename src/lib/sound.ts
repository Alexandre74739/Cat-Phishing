// Sounds are synthesized with Web Audio: no audio files to download, works offline.
let context: AudioContext | null = null;

function getContext(): AudioContext {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function tone(frequency: number, duration: number, volume: number) {
  const audio = getContext();
  const start = audio.currentTime;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playClickSound() {
  if (typeof window === "undefined" || !("AudioContext" in window)) return;
  try {
    tone(660, 0.05, 0.08);
  } catch {
    return;
  }
}
