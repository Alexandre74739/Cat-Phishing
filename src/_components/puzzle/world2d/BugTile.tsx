"use client";

import { Bug } from "lucide-react";
import { motion } from "motion/react";

export function BugTile() {
  return (
    <motion.span
      className="toon grid size-3/4 place-items-center rounded-[30%] bg-slime text-ink"
      animate={{ scale: [1, 1.08, 0.94, 1] }}
      transition={{ repeat: Infinity, duration: 0.9 }}
    >
      <Bug className="size-3/5" strokeWidth={2.5} aria-hidden="true" />
    </motion.span>
  );
}
