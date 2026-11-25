"use client";

import { Bug } from "lucide-react";
import { motion } from "motion/react";
import { CardBack } from "./CardBack";

type CatwareCardProps = {
  label: string;
  revealed: boolean;
  className?: string;
};

const side =
  "absolute inset-0 overflow-hidden rounded-xl border-[3px] border-ink [backface-visibility:hidden]";

// Temporary face: the official cat-ware card art will replace it.
function CatwareFace({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 bg-card-back p-1 text-center">
      <span className="grid aspect-square w-3/5 place-items-center rounded-lg border-[3px] border-card-line bg-coral">
        <Bug className="size-3/5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-display text-[0.7rem] leading-none tracking-wide text-card-line sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function CatwareCard({
  label,
  revealed,
  className = "",
}: CatwareCardProps) {
  return (
    <div className={`aspect-[2/3] [perspective:600px] ${className}`}>
      <motion.div
        initial={false}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="relative h-full w-full rounded-xl shadow-pop [transform-style:preserve-3d]"
      >
        <div className={side}>
          <CardBack />
        </div>
        <div className={`${side} [transform:rotateY(180deg)]`}>
          <CatwareFace label={label} />
        </div>
      </motion.div>
    </div>
  );
}
