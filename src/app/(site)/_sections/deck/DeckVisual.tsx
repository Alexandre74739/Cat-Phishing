"use client";

import { motion } from "motion/react";
import { GameCard } from "@/_components/game/cards/GameCard";
import { CardFan } from "./CardFan";
import type { DeckVisual as DeckVisualContent } from "./types";

type DeckVisualProps = { visual: DeckVisualContent; wide?: boolean };

export function DeckVisual({ visual, wide }: DeckVisualProps) {
  switch (visual.kind) {
    case "fan":
      return <CardFan cards={visual.cards} />;
    case "card":
      return (
        <figure className="flex flex-1 flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: [-6, -2, -6], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={wide ? "w-40 sm:w-44 lg:w-48" : "w-32 sm:w-36"}
          >
            <GameCard
              card={visual.card}
              alt={visual.name}
              sizes={wide ? "192px" : "144px"}
              className="shadow-pop"
            />
          </motion.div>
          <figcaption className="rounded-full bg-paper px-4 py-1 text-center font-ui text-sm font-semibold">
            {visual.caption}
          </figcaption>
        </figure>
      );
  }
}
