"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Point } from "@/lib/levels";

type PieceProps = {
  at: Point;
  size: string;
  shake?: boolean;
  pulse?: boolean;
  children: ReactNode;
};

const glide = { type: "spring", stiffness: 260, damping: 22 } as const;

export function Piece({ at, size, shake, pulse, children }: PieceProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 grid place-items-center"
      style={{ width: size, height: size }}
      initial={false}
      animate={{
        x: `calc(${size} * ${at.x})`,
        y: `calc(${size} * ${at.y})`,
        rotate: shake ? [0, -14, 14, 0] : 0,
        scale: pulse ? [1, 1.25, 1] : 1,
      }}
      transition={{
        x: glide,
        y: glide,
        rotate: { duration: 0.4 },
        scale: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}
