"use client";

import { Hand } from "lucide-react";
import { motion } from "motion/react";
import { CardArt } from "./CardArt";
import { CardFan } from "./CardFan";
import { PhoneVisual } from "./PhoneVisual";
import type { DeckVisual as DeckVisualContent } from "./types";

export function DeckVisual({ visual }: { visual: DeckVisualContent }) {
  switch (visual.kind) {
    case "fan":
      return <CardFan cards={visual.cards} />;
    case "card":
      return (
        <figure className="flex flex-1 flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: [-6, -2, -6], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 sm:w-36"
          >
            <CardArt name={visual.card} color="bg-orange-soft" Icon={Hand} />
          </motion.div>
          <figcaption className="rounded-full bg-paper px-4 py-1 text-center font-ui text-sm font-semibold">
            {visual.caption}
          </figcaption>
        </figure>
      );
    case "phone":
      return <PhoneVisual {...visual} />;
  }
}
