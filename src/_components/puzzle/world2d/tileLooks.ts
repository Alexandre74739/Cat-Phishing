import type { Tile } from "@/lib/levels";

const backgrounds: Partial<Record<Tile, string>> = {
  "#": "bg-block-dark",
  "~": "bg-stream",
  "=": "bg-stream",
  L: "bg-lava",
};

export const tileBackground = (tile: Tile, alt: boolean) =>
  backgrounds[tile] ?? (alt ? "bg-lane-alt" : "bg-lane");
