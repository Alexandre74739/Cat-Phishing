"use client";

import { useState } from "react";
import {
  slotNames,
  slots,
  type Outfit,
  type OutfitItem,
  type Slot,
} from "@/lib/outfits";
import { playClickSound } from "@/lib/sound";
import { ItemCard } from "./ItemCard";
import type { WardrobeTexts } from "./types";

type WardrobeItemsProps = {
  outfit: Outfit;
  isOpen: (item: OutfitItem) => boolean;
  texts: WardrobeTexts;
  onChoose: (slot: Slot, item: OutfitItem) => void;
};

const panelId = "wardrobe-panel";

export function WardrobeItems({
  outfit,
  isOpen,
  texts,
  onChoose,
}: WardrobeItemsProps) {
  const [tab, setTab] = useState<Slot>("hat");

  return (
    <section className="min-w-0" aria-label={texts.categories}>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={texts.categories}
      >
        {slotNames.map((slot) => (
          <button
            key={slot}
            type="button"
            role="tab"
            id={`wardrobe-tab-${slot}`}
            aria-selected={tab === slot}
            aria-controls={panelId}
            onClick={() => {
              playClickSound();
              setTab(slot);
            }}
            className={`toon pressable min-h-12 min-w-[30%] flex-1 rounded-2xl px-3 font-ui text-lg font-bold sm:min-w-0 ${
              tab === slot ? "bg-grape text-paper" : "bg-paper"
            }`}
          >
            {texts.slots[slot]}
          </button>
        ))}
      </div>
      <ul
        id={panelId}
        role="tabpanel"
        aria-labelledby={`wardrobe-tab-${tab}`}
        className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
      >
        {slots[tab]
          .filter((item) => !item.hidden || isOpen(item))
          .map((item) => (
            <li key={item.id}>
              <ItemCard
                slot={tab}
                item={item}
                outfit={outfit}
                open={isOpen(item)}
                texts={texts}
                onChoose={() => onChoose(tab, item)}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}
