"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

type WordProps = {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  color?: string;
  revealed: boolean;
  delay: number;
};

export function RevealWord({
  word,
  range,
  progress,
  color,
  revealed,
  delay,
}: WordProps) {
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, reduceMotion ? [0, 0] : [16, 0]);
  const lit = Boolean(color) && revealed;

  return (
    <motion.span
      style={revealed ? { opacity: 1, y: 0 } : { opacity, y }}
      className="mr-[0.25em] inline-block"
    >
      <motion.span
        animate={
          lit
            ? { scale: [1, 1.3, 1], rotate: [0, -6, 3, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.7, delay }}
        className={`inline-block rounded-xl px-1 transition-colors duration-500 ${lit ? `toon ${color}` : "border-3 border-transparent"}`}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}
