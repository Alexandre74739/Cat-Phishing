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
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      <motion.span
        animate={
          lit
            ? { scale: [1, 1.3, 1], rotate: [0, -6, 3, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={lit ? { duration: 0.7, delay } : { duration: 0.3 }}
        className="relative isolate inline-block px-1"
      >
        {color && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={
              lit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
            }
            transition={
              lit
                ? { type: "spring", stiffness: 300, damping: 20, delay }
                : { duration: 0.25, ease: "easeIn" }
            }
            className={`toon absolute -inset-y-0.5 inset-x-0 -z-10 rounded-xl ${color}`}
          />
        )}
        {word}
      </motion.span>
    </motion.span>
  );
}
