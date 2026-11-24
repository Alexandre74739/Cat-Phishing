"use client";

import { AnimatePresence, motion } from "motion/react";
import { CatFace, type CatMood } from "@/_components/cat/CatFace";

export function CatMessage({
  message,
  mood,
}: {
  message: string;
  mood: CatMood;
}) {
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
          <CatFace mood={mood} />
          {message}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
