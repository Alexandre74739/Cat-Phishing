"use client";

import { motion } from "motion/react";
import { GameCard } from "@/_components/game/cards/GameCard";
import type { DeckCard } from "./types";

export function CardFan({ cards }: { cards: DeckCard[] }) {
  const middle = (cards.length - 1) / 2;

  return (
    <ul className="flex items-end justify-center px-4 pt-4 pb-2">
      {cards.map(({ card, name }, index) => {
        const offset = index - middle;

        return (
          <motion.li
            key={card}
            style={{ rotate: offset * 7, y: offset * offset * 4 }}
            whileHover={{ y: -18, rotate: 0, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative -ml-4 max-w-32 min-w-0 flex-1 origin-bottom first:ml-0 sm:-ml-6"
          >
            <GameCard
              card={card}
              alt={name}
              sizes="(min-width: 1024px) 128px, 25vw"
              className="shadow-pop"
            />
          </motion.li>
        );
      })}
    </ul>
  );
}
