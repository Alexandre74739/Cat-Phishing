"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

type BadgeToastProps = { message: string | null; onDone: () => void };

export function BadgeToast({ message, onDone }: BadgeToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDone, 3500);
    return () => clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="toon fixed bottom-5 left-1/2 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-lilac px-5 py-3 font-ui text-lg font-bold"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
