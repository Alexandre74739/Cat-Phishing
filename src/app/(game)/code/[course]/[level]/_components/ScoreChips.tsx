"use client";

import { Star, Trophy } from "lucide-react";
import { useStars } from "@/hooks/useStars";
import { earnedBadges } from "@/lib/badges";
import { courseStats } from "@/lib/courseProgress";
import type { Course } from "@/lib/courses";
import type { LevelTexts } from "./types";

const chip =
  "toon flex items-center gap-1.5 rounded-full px-3 py-1.5 font-ui text-lg font-bold";

type ScoreChipsProps = {
  course: Course;
  texts: Pick<LevelTexts["nav"], "stars" | "badges">;
};

export function ScoreChips({ course, texts }: ScoreChipsProps) {
  const stars = useStars();
  const stats = courseStats(course, stars);
  const badgeCount = earnedBadges(stars).length;

  return (
    <div className="ml-auto flex items-center gap-2">
      <p
        className={`${chip} bg-sun`}
        aria-label={`${stats.stars} / ${stats.maxStars} ${texts.stars}`}
      >
        <Star
          size={20}
          strokeWidth={2.5}
          className="fill-paper"
          aria-hidden="true"
        />
        {stats.stars} / {stats.maxStars}
      </p>
      <p
        className={`${chip} bg-lilac`}
        aria-label={`${badgeCount} ${texts.badges}`}
      >
        <Trophy size={20} strokeWidth={2.5} aria-hidden="true" />
        {badgeCount}
      </p>
    </div>
  );
}
