export const cardIds = [
  "feline-system",
  "script-kitty",
  "root-kitty",
  "trojan-cat",
  "stalker-cat",
  "meownymous",
  "furr-wall",
  "paws-word",
  "claw-jacking",
  "spy-cat",
  "cat-ware",
] as const;

export type CardId = (typeof cardIds)[number];

export const cardWidth = 400;
export const cardHeight = 612;

export const cardImage = (id: CardId) => `/cards/${id}.webp`;
