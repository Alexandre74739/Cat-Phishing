import { routes } from "./navigation";

export type HackTexts = {
  alert: string;
  rain: string[];
  terminal: {
    critical: string;
    progress: string;
    intro: string[];
    commands: string[];
  };
  cat: {
    name: string;
    dialogue: string[];
    next: string;
    cta: string;
    href: string;
    image: { src: string; width: number; height: number };
  };
};

export const hackTexts: HackTexts = {
  alert: "System breach detected",
  rain: [
    "inject(catware)",
    "bypass furr-wall",
    "sudo meow",
    "0xCAT",
    "while(true) purr()",
    "root-kitty",
    "phish()",
    "01001101",
    "if(bug) hack()",
  ],
  terminal: {
    critical: "Critical · system compromised",
    progress: "Taking control… {percent}%",
    intro: [
      "! Willy hacked the app",
      "> Willy failed to hack the app after all",
      "! Léo hacked the app",
    ],
    commands: [
      "> rm -rf /players/stars",
      "! WARNING: furr-wall disabled",
      "> cat /secrets/paws-words.txt",
      "> downloading saves… {p}%",
      "! ALERT: unknown device 0x{hex} connected",
      "> sudo chmod 777 /game",
      "> injecting cat-ware.exe into slot {n}",
      "! ERROR: antivirus not responding",
      "> encrypting high scores… {p}/100",
      "> sending data to 0x{hex}",
      "! CRITICAL: algorithm bug exploited",
      "> overwriting rules.js",
      "> meow.exe --takeover --all-phones",
      "! CPU at {n}%",
      "> spawning {n} cat-ware clones",
      "! ACCESS GRANTED: Meownymous",
    ],
  },
  cat: {
    name: "Meownymous",
    dialogue: [
      "Meow! Don't panic, it's me, Meownymous. The cat-ware got into every phone in this room… through one tiny bug in the game's algorithm.",
      "One wrong instruction, one forgotten check, and the door is wide open. That's exactly how real hackers get in: they hunt for mistakes in code.",
      "I'm patching the bug right now. But next time, it's up to you! Train on the code puzzles, think like an algorithm, and no cat-ware will ever get in again.",
    ],
    next: "Next",
    cta: "Train on code puzzles",
    href: routes.code,
    image: { src: "/cats/meownymous.webp", width: 290, height: 395 },
  },
};
