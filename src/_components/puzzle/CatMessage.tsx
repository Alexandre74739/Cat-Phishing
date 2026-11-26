"use client";

import { AnimatePresence, motion } from "motion/react";
import type { CatMood } from "@/_components/cat/CatFace";
import { CatPortrait } from "@/_components/cat/CatPortrait";
import { useOutfit } from "@/hooks/useOutfit";

export function CatMessage({
  message,
  mood,
}: {
  message: string;
  mood: CatMood;
}) {
  const outfit = useOutfit();
  return (
    <p aria-live="polite" className="flex justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="toon flex w-fit max-w-full items-center gap-3 rounded-2xl bg-paper px-4 py-2 font-ui text-lg font-semibold"
        >
          <CatPortrait
            outfit={outfit}
            mood={mood}
            size={56}
            className="-my-2"
          />
          {message}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
