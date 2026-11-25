"use client";

import { useEffect, useState } from "react";
import { hackStageAt, type HackStage, type ShowSignal } from "@/lib/hackShow";

export function useHackStage(signal: ShowSignal | null): HackStage {
  const [stage, setStage] = useState<HackStage>("idle");

  useEffect(() => {
    let timer: number | undefined;
    const update = () => {
      const next = hackStageAt(signal, Date.now());
      setStage(next.stage);
      if (next.msLeft !== null)
        timer = window.setTimeout(update, next.msLeft + 20);
    };
    timer = window.setTimeout(update, 0);
    return () => window.clearTimeout(timer);
  }, [signal]);

  return stage;
}
