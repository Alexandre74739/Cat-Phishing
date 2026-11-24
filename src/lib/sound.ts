// Sounds are synthesized with Web Audio: no audio files to download, works offline.
let context: AudioContext | null = null;

type ToneOptions = {
  type?: OscillatorType;
  volume?: number;
  slide?: number;
  delay?: number;
};

function getContext(): AudioContext {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function tone(frequency: number, duration: number, options: ToneOptions = {}) {
  const audio = getContext();
  const start = audio.currentTime + (options.delay ?? 0);
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = options.type ?? "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  if (options.slide)
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(30, frequency * options.slide),
      start + duration,
    );
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(options.volume ?? 0.18, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function noise(duration: number, volume: number, cutoff: number) {
  const audio = getContext();
  const length = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < length; index++)
    samples[index] = (Math.random() * 2 - 1) * (1 - index / length);

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.value = cutoff;
  gain.gain.value = volume;
  source.connect(filter).connect(gain).connect(audio.destination);
  source.start(audio.currentTime);
}

const arpeggio = (notes: number[], duration: number, gap: number) =>
  notes.forEach((frequency, index) =>
    tone(frequency, duration, {
      type: "triangle",
      volume: 0.12,
      delay: index * gap,
    }),
  );

const sounds = {
  click: () => tone(660, 0.05, { type: "triangle", volume: 0.08 }),
  pick: () => tone(520, 0.08, { type: "triangle", volume: 0.12, slide: 1.4 }),
  snap: () => {
    tone(880, 0.06, { type: "square", volume: 0.06 });
    tone(1320, 0.08, { type: "triangle", volume: 0.1, delay: 0.04 });
  },
  trash: () => noise(0.25, 0.15, 2500),
  step: () =>
    tone(300 + Math.random() * 60, 0.07, {
      type: "triangle",
      volume: 0.12,
      slide: 0.7,
    }),
  turn: () => tone(440, 0.07, { volume: 0.1, slide: 1.3 }),
  grab: () => arpeggio([988, 1319, 1568, 1976], 0.14, 0.06),
  zap: () => {
    noise(0.12, 0.2, 3000);
    arpeggio([1319, 988, 659], 0.08, 0.04);
  },
  nothing: () => tone(220, 0.12, { type: "triangle", volume: 0.1, slide: 0.8 }),
  wait: () => tone(520, 0.06, { type: "triangle", volume: 0.08 }),
  jump: () => tone(330, 0.3, { type: "triangle", volume: 0.14, slide: 2.4 }),
  key: () => arpeggio([1568, 2093], 0.12, 0.07),
  bridge: () => {
    tone(392, 0.08, { type: "square", volume: 0.06 });
    tone(523, 0.12, { type: "triangle", volume: 0.1, delay: 0.08 });
  },
  smash: () => {
    noise(0.35, 0.3, 900);
    tone(140, 0.2, { type: "square", volume: 0.08, slide: 0.6 });
  },
  open: () => arpeggio([523, 784, 1047], 0.12, 0.07),
  splash: () => {
    noise(0.5, 0.22, 1400);
    tone(700, 0.4, { type: "sine", volume: 0.1, slide: 0.4 });
  },
  burn: () => {
    noise(0.6, 0.25, 4000);
    tone(500, 0.4, { type: "sawtooth", volume: 0.05, slide: 0.3 });
  },
  check: () => tone(740, 0.04, { type: "triangle", volume: 0.06 }),
  bump: () => tone(160, 0.25, { type: "square", volume: 0.1, slide: 0.5 }),
  caught: () => {
    noise(0.3, 0.25, 1800);
    tone(600, 0.35, { type: "square", volume: 0.07, slide: 0.3 });
  },
  fail: () => arpeggio([392, 330, 262], 0.22, 0.16),
  win: () =>
    [523, 659, 784, 1047, 784, 1047].forEach((frequency, index) =>
      tone(frequency, index === 5 ? 0.5 : 0.14, {
        type: "square",
        volume: 0.07,
        delay: index * 0.1,
      }),
    ),
  star: (index = 0) =>
    tone(880 * Math.pow(1.26, index), 0.25, {
      type: "triangle",
      volume: 0.15,
      slide: 1.5,
    }),
  badge: () => arpeggio([659, 784, 988, 1319], 0.2, 0.08),
};

export type SoundName = keyof typeof sounds;

export function playSound(name: SoundName, index?: number) {
  if (typeof window === "undefined" || !("AudioContext" in window)) return;
  try {
    sounds[name](index);
  } catch {
    return;
  }
}

export function playClickSound() {
  playSound("click");
}
