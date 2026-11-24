export type DeckTileSize = "large" | "tall" | "small" | "wide";

export type DeckTileColor = "sun" | "pink" | "lilac" | "sky";

export type DeckTileIcon = "cats" | "nope" | "action" | "phone";

export type DeckVisual =
  | { kind: "fan"; cards: string[] }
  | { kind: "card"; card: string; caption: string }
  | {
      kind: "phone";
      holder: string;
      status: string;
      action: string;
      next: string;
    };

export type DeckTileContent = {
  eyebrow: string;
  title: string;
  description: string;
  stat?: string;
  size: DeckTileSize;
  color: DeckTileColor;
  icon: DeckTileIcon;
  visual?: DeckVisual;
};
