"use client";

import { motion } from "motion/react";
import { CardBack } from "./CardBack";
import { GameCard } from "./GameCard";

type CatwareCardProps = {
  label: string;
  revealed: boolean;
  className?: string;
};

const side = "absolute inset-0 [backface-visibility:hidden]";

export function CatwareCard({
  label,
  revealed,
  className = "",
}: CatwareCardProps) {
  return (
    <div className={`aspect-400/612 [perspective:600px] ${className}`}>
      <motion.div
        initial={false}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="relative h-full w-full rounded-xl shadow-pop [transform-style:preserve-3d]"
      >
        <div
          className={`${side} overflow-hidden rounded-xl border-[3px] border-ink`}
        >
          <CardBack />
        </div>
        <div className={`${side} [transform:rotateY(180deg)]`}>
          <GameCard card="cat-ware" alt={label} sizes="64px" />
        </div>
      </motion.div>
    </div>
  );
}
