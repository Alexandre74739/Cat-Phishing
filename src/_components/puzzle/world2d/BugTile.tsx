"use client";

import { Bug } from "lucide-react";
import { motion } from "motion/react";

export function BugTile() {
  return (
    <motion.span
      className="toon absolute inset-[16%] grid place-items-center rounded-[30%] bg-slime text-ink"
      animate={{ scale: [1, 1.08, 0.94, 1] }}
      transition={{ repeat: Infinity, duration: 0.9 }}
    >
      <Bug className="size-3/5" strokeWidth={2.5} aria-hidden="true" />
    </motion.span>
  );
}
