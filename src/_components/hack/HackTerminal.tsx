"use client";

import { TriangleAlert } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { fillText } from "@/lib/fillText";
import type { HackTexts } from "@/lib/hackTexts";
import { playSound } from "@/lib/sound";
import { pick, randomHex, randomInt } from "./random";

type Line = { id: number; text: string; isAlert: boolean };

const lineMs = 160;
const calmLineMs = 600;
const maxLines = 40;

export function HackTerminal({ texts }: { texts: HackTexts["terminal"] }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [percent, setPercent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let id = 0;
    const timer = window.setInterval(
      () => {
        id += 1;
        const text =
          texts.intro[id - 1] ??
          fillText(pick(texts.commands), {
            n: randomInt(999),
            hex: randomHex(),
          });
        const isAlert = text.startsWith("!");
        playSound(isAlert ? "alarm" : id % 8 === 0 ? "data" : "keys");
        setLines((current) => [
          ...current.slice(1 - maxLines),
          { id, text, isAlert },
        ]);
        setPercent((current) => Math.min(99, current + randomInt(3)));
      },
      reduceMotion ? calmLineMs : lineMs,
    );
    return () => window.clearInterval(timer);
  }, [texts.intro, texts.commands, reduceMotion]);

  return (
    <div className="absolute inset-0 flex flex-col font-mono font-bold text-terminal">
      <p className="flex items-center justify-center gap-2 bg-virus px-4 py-3 text-center text-lg text-cream uppercase sm:text-2xl">
        <TriangleAlert aria-hidden="true" className="blink shrink-0" />
        {texts.critical}
      </p>
      <div
        aria-hidden="true"
        className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden p-4 text-sm break-words sm:text-lg"
      >
        {lines.map((line) => (
          <p key={line.id} className={line.isAlert ? "text-virus-light" : ""}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="border-t-2 border-terminal/40 p-4 sm:text-lg">
        <p>
          {fillText(texts.progress, { percent })}
          <span aria-hidden="true" className="blink">
            _
          </span>
        </p>
        <div className="mt-2 h-3 border-2 border-terminal">
          <div
            className="h-full bg-terminal transition-[width] duration-150"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
