"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { useStars } from "@/hooks/useStars";
import { fillText } from "@/lib/fillText";
import { playSound } from "@/lib/sound";
import { mapStatus, secretCourse } from "@/lib/treasureMap";
import { TreasureMap } from "./TreasureMap";

export type MapRewardTexts = {
  found: string;
  complete: string;
  map: string;
};

type MapRewardProps = {
  piece: string;
  texts: MapRewardTexts;
};

export function MapReward({ piece, texts }: MapRewardProps) {
  const status = mapStatus(useStars());

  useEffect(() => {
    const timer = setTimeout(() => playSound("badge"), 1900);
    return () => clearTimeout(timer);
  }, []);

  if (!status || !secretCourse) return null;
  const count = status.courses.filter(({ done }) => done).length;
  const values = {
    count,
    total: status.courses.length,
    world: secretCourse.title,
  };
  const text = count === values.total ? texts.complete : texts.found;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="mt-4 flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-orange-soft p-3 text-left"
    >
      <div className="scene shrink-0 rounded-xl border-2 border-ink p-1">
        <TreasureMap
          pieces={status.courses}
          fresh={[piece]}
          label={fillText(texts.map, values)}
          className="size-24"
          delay={1.8}
        />
      </div>
      <p role="status" className="font-ui text-base font-bold text-ink">
        {fillText(text, values)}
      </p>
    </motion.div>
  );
}
