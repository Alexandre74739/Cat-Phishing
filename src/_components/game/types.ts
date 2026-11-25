import type { CardId } from "@/lib/cards";

export type SlideIcon =
  "setup" | "call" | "catware" | "breach" | "cards" | "win";

export type RuleCard = { card: CardId; name: string };

export type RuleVisual =
  | { kind: "families"; cards: RuleCard[] }
  | { kind: "actions"; cards: (RuleCard & { effect: string })[] }
  | { kind: "card"; card: CardId; caption: string }
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
  first: string;
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
  toolbar: { rules: string; newGame: string };
  cards: {
    catware: string;
    zoom: string;
    close: string;
    heldBy: string;
    points: string[];
  };
  draw: { title: string; alert: string; holder: string; holderHint: string };
  give: {
    title: string;
    text: string;
    sent: string;
    blockHint: string;
    block: string;
    done: string;
  };
};
