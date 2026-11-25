import type { CardId } from "@/lib/cards";

export type DeckTileSize = "large" | "tall" | "small" | "wide";

export type DeckTileColor = "orange-soft" | "mint" | "lilac" | "action-soft";

export type DeckTileIcon = "cats" | "nope" | "action" | "phone";

export type DeckCard = { card: CardId; name: string };

export type DeckVisual =
  | { kind: "fan"; cards: DeckCard[] }
  | ({ kind: "card"; caption: string } & DeckCard)
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
