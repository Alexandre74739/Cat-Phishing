"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function NewPieceSticker({ label }: { label: string }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: [-6, 6, -6] }}
      transition={{
        scale: { delay: 0.9, type: "spring", stiffness: 300, damping: 12 },
        rotate: { repeat: Infinity, duration: 2 },
      }}
      className="toon absolute -top-4 -right-4 flex items-center gap-1 rounded-full bg-orange px-3 py-1 font-ui text-sm font-bold text-ink"
    >
      <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </motion.span>
  );
}
