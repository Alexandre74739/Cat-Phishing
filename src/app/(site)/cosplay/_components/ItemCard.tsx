"use client";

import { Check, Lock, Star } from "lucide-react";
import { motion } from "motion/react";
import { badges } from "@/lib/badges";
import { fillText } from "@/lib/fillText";
import type { Outfit, OutfitItem, Slot } from "@/lib/outfits";
import { ItemArt } from "./ItemArt";
import type { WardrobeTexts } from "./types";

type ItemCardProps = {
  slot: Slot;
  item: OutfitItem;
  outfit: Outfit;
  open: boolean;
  texts: WardrobeTexts;
  onChoose: () => void;
};

export function ItemCard({
  slot,
  item,
  outfit,
  open,
  texts,
  onChoose,
}: ItemCardProps) {
  const isWorn = outfit[slot] === item.id;
  const badge = badges.find(({ id }) => id === item.badge);
  const lock = badge
    ? fillText(texts.lockBadge, { badge: badge.name })
    : fillText(texts.lockStars, { count: item.stars });

  return (
    <motion.button
      type="button"
      whileHover={open ? { y: -4 } : undefined}
      whileTap={open ? { scale: 0.94 } : undefined}
      onClick={onChoose}
      aria-pressed={isWorn}
      aria-label={
        open ? item.name : `${item.name}, ${fillText(texts.locked, { lock })}`
      }
      className={`relative flex min-h-44 w-full flex-col items-center justify-center gap-1 rounded-3xl border-[3px] p-3 text-center ${
        isWorn
          ? "border-ink bg-action-soft shadow-pop"
          : open
            ? "border-ink bg-paper shadow-pop"
            : "border-ink/25 bg-paper/50"
      }`}
    >
      <span className={open ? "" : "opacity-40 grayscale"}>
        <ItemArt slot={slot} item={item} outfit={outfit} />
      </span>
      <span
        className={`font-ui text-base leading-tight font-bold ${open ? "" : "text-ink-soft"}`}
      >
        {item.name}
      </span>
      {!open && (
        <span className="flex items-center gap-1 rounded-full border-2 border-ink/30 bg-paper px-2 font-ui text-sm font-bold">
          <Lock size={13} strokeWidth={3} aria-hidden="true" />
          {badge ? (
            <span className="text-xs">{lock}</span>
          ) : (
            <>
              <Star
                size={14}
                strokeWidth={2.5}
                className="fill-orange"
                aria-hidden="true"
              />
              {item.stars}
            </>
          )}
        </span>
      )}
      {isWorn && (
        <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full border-2 border-ink bg-paper">
          <Check size={16} strokeWidth={3.5} aria-hidden="true" />
        </span>
      )}
    </motion.button>
  );
}
