"use client";

import { motion } from "motion/react";
import { CardArt, cardColors } from "./CardArt";

export function CardFan({ cards }: { cards: string[] }) {
  const middle = (cards.length - 1) / 2;

  return (
    <ul className="flex items-end justify-center pt-4 pb-2">
      {cards.map((card, index) => {
        const offset = index - middle;

        return (
          <motion.li
            key={card}
            style={{ rotate: offset * 7, y: offset * offset * 4 }}
            whileHover={{ y: -18, rotate: 0, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative -ml-5 w-20 origin-bottom first:ml-0 sm:-ml-6 sm:w-28 lg:w-32"
          >
            <CardArt
              name={card}
              color={cardColors[index % cardColors.length]}
            />
          </motion.li>
        );
      })}
    </ul>
  );
}
