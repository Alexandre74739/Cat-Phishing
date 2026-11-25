"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { playSound } from "@/lib/sound";

export function useRoulette(ids: string[], target: string, running: boolean) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const total = ids.length * 3 + ids.indexOf(target) + 1;
  const done = !running || Boolean(reduceMotion) || tick >= total;

  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(
      () => {
        setTick((value) => value + 1);
        playSound("check");
      },
      70 + tick * 7,
    );
    return () => window.clearTimeout(timer);
  }, [tick, done]);

  return { spotlight: done ? null : ids[tick % ids.length], done };
}
