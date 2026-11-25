export type SlideIcon =
  "setup" | "call" | "catware" | "breach" | "cards" | "win";

export type ActionCardIcon = "defuse" | "cancel" | "steal" | "peek";

export type RuleVisual =
  | { kind: "families"; names: string[] }
  | {
      kind: "actions";
      cards: { icon: ActionCardIcon; name: string; effect: string }[];
    }
  | { kind: "deck"; caption: string };

export type RuleSlide = {
  icon: SlideIcon;
  eyebrow: string;
  title: string;
  points: string[];
  visual?: RuleVisual;
};

export type TableTexts = {
  label: string;
  holder: string;
  active: string;
  out: string;
  empty: string;
};

export type PartyTexts = {
  rules: {
    title: string;
    step: string;
    slides: RuleSlide[];
    prev: string;
    next: string;
    skip: string;
    start: string;
    resume: string;
  };
  setup: {
    title: string;
    seats: string;
    addTitle: string;
    seat: string;
    close: string;
    name: string;
    namePlaceholder: string;
    add: string;
    cancel: string;
    remove: string;
    empty: string;
    needMore: string;
    start: string;
    rules: string;
  };
  side: { title: string; open: string; close: string };
  table: TableTexts;
  cards: { back: string; catware: string };
  draw: { title: string; holder: string; active: string; go: string };
  turn: {
    title: string;
    text: string;
    race: string;
    missing: string;
    empty: string;
    rules: string;
    out: string;
    saved: string;
    moved: string;
  };
  race: { title: string; text: string; cancel: string };
  pass: {
    title: string;
    text: string;
    keep: string;
    sent: string;
    blockHint: string;
    block: string;
    done: string;
    none: string;
  };
  breach: {
    title: string;
    asker: string;
    holder: string;
    same: string;
    saved: string;
    hit: string;
    next: string;
  };
  speed: { title: string; text: string; cancel: string };
  over: {
    speed: string;
    survival: string;
    none: string;
    winner: string;
    nobody: string;
    again: string;
    changePlayers: string;
  };
};
