import { CatPortrait } from "@/_components/cat/CatPortrait";
import { trailDots } from "@/_components/cat/outfitLooks";
import type { Outfit, OutfitItem, Slot } from "@/lib/outfits";

type ItemArtProps = { slot: Slot; item: OutfitItem; outfit: Outfit };

export function ItemArt({ slot, item, outfit }: ItemArtProps) {
  if (slot !== "trail")
    return <CatPortrait outfit={{ ...outfit, [slot]: item.id }} size={72} />;
  const dots = trailDots[item.id] ?? [];

  return (
    <span
      className="flex h-18 items-center justify-center gap-1"
      aria-hidden="true"
    >
      {dots.length === 0 ? (
        <span className="font-display text-2xl text-ink-soft">—</span>
      ) : (
        dots.map((color, index) => (
          <span
            key={color}
            className={`toon block rounded-full border-2 ${color}`}
            style={{ width: 10 + index * 3, height: 10 + index * 3 }}
          />
        ))
      )}
    </span>
  );
}
