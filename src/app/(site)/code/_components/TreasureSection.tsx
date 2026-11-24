"use client";

import { ArrowRight, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CourseChecklist } from "@/_components/puzzle/CourseChecklist";
import { TreasureMap } from "@/_components/puzzle/map/TreasureMap";
import { useStars } from "@/hooks/useStars";
import { isUnlocked } from "@/lib/courseProgress";
import { fillText } from "@/lib/fillText";
import { levelHref } from "@/lib/navigation";
import { playClickSound, playSound } from "@/lib/sound";
import {
  getSeenPieces,
  mapStatus,
  saveSeenPieces,
  secretCourse,
} from "@/lib/treasureMap";
import { NewPieceSticker } from "./NewPieceSticker";
import { StarGoal } from "./StarGoal";
import type { TreasureTexts } from "./types";

export function TreasureSection({ texts }: { texts: TreasureTexts }) {
  const status = mapStatus(useStars());
  const [seen] = useState(getSeenPieces);
  const found = status?.courses.filter(({ done }) => done) ?? [];
  const fresh = found.filter(({ slug }) => !seen.includes(slug));
  const foundKey = found.map(({ slug }) => slug).join(",");
  const freshCount = fresh.length;

  useEffect(() => {
    if (!freshCount) return;
    saveSeenPieces(foundKey.split(","));
    const timer = setTimeout(() => playSound("badge"), 700);
    return () => clearTimeout(timer);
  }, [foundKey, freshCount]);

  if (!status || !secretCourse) return null;
  const values = {
    count: found.length,
    total: status.courses.length,
    stars: status.stars.need,
    world: secretCourse.title,
    course: fresh.map(({ title }) => title).join(", "),
  };
  const unlocked = isUnlocked(status);
  const text = unlocked
    ? texts.open
    : found.length === status.courses.length
      ? texts.complete
      : texts.text;

  return (
    <section
      aria-labelledby="treasure-title"
      className="mb-14 grid gap-6 rounded-[30px] border-[3px] border-ink bg-paper p-5 shadow-[8px_9px_0_0_var(--color-ink)] sm:p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-8"
    >
      <div className="scene relative mx-auto rounded-3xl border-[3px] border-ink p-3">
        <TreasureMap
          pieces={status.courses}
          fresh={fresh.map(({ slug }) => slug)}
          label={fillText(texts.map, values)}
          className="size-52 sm:size-56"
        />
        {freshCount > 0 && <NewPieceSticker label={texts.newPiece} />}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="treasure-title"
            className="font-display text-3xl tracking-wide sm:text-4xl"
          >
            {texts.title}
          </h2>
          <span className="toon flex items-center gap-1.5 rounded-full bg-orange-soft px-3 py-1 font-ui text-base font-bold">
            <MapIcon size={18} strokeWidth={2.5} aria-hidden="true" />
            {fillText(texts.pieces, values)}
          </span>
        </div>
        <p className="mt-3 text-lg font-semibold text-ink">
          {fillText(text, values)}
        </p>
        <CourseChecklist
          courses={status.courses}
          doneLabel={texts.done}
          label={texts.courses}
          className="mt-4"
        />
        <StarGoal
          label={fillText(texts.stars, values)}
          have={status.stars.have}
          need={status.stars.need}
        />
        {unlocked && (
          <Link
            href={levelHref(secretCourse.slug, 1)}
            onClick={playClickSound}
            className={`toon pressable mt-5 inline-flex min-h-14 items-center gap-2 rounded-full px-6 font-ui text-xl font-semibold ${secretCourse.color}`}
          >
            {fillText(texts.play, values)}
            <ArrowRight size={22} strokeWidth={3} aria-hidden="true" />
          </Link>
        )}
      </div>
      <p role="status" className="sr-only">
        {freshCount > 0 ? fillText(texts.found, values) : ""}
      </p>
    </section>
  );
}
