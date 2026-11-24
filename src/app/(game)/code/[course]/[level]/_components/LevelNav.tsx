"use client";

import { Lock, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useStars } from "@/hooks/useStars";
import { isLevelOpen, levelStars } from "@/lib/courseProgress";
import type { Course } from "@/lib/courses";
import { levelHref } from "@/lib/navigation";
import { playClickSound } from "@/lib/sound";
import type { LevelTexts } from "./types";

type LevelNavProps = {
  course: Course;
  current: number;
  texts: LevelTexts["nav"];
};

export function LevelNav({ course, current, texts }: LevelNavProps) {
  const stars = useStars();

  return (
    <nav
      aria-label={texts.levels}
      className="order-last flex w-full items-center overflow-x-auto px-1 pt-1 pb-3 lg:order-none lg:mx-auto lg:w-auto lg:overflow-visible lg:p-0"
    >
      {course.levels.map((level, index) => {
        const number = index + 1;
        const earned = levelStars(stars, course, number);
        const open = isLevelOpen(course, number, stars);
        const isCurrent = number === current;
        const look = isCurrent
          ? "bg-grape text-paper"
          : earned
            ? "bg-action"
            : open
              ? "bg-paper"
              : "bg-ink/10 text-ink-soft";
        const label = `${texts.level} ${number}: ${level.title}${open ? "" : ` (${texts.locked})`}${earned ? `, ${earned} ${texts.stars}` : ""}`;
        const content = (
          <>
            {open || isCurrent ? (
              number
            ) : (
              <Lock size={18} strokeWidth={3} aria-hidden="true" />
            )}
            {earned > 0 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-2.5 left-1/2 flex -translate-x-1/2"
              >
                {Array.from({ length: earned }, (_, star) => (
                  <Star
                    key={star}
                    size={13}
                    strokeWidth={2.5}
                    className="fill-orange text-ink"
                  />
                ))}
              </span>
            )}
          </>
        );
        const className = `toon relative grid size-11 shrink-0 place-items-center rounded-full font-ui text-lg font-bold ${look}`;

        return (
          <div key={level.title} className="flex items-center">
            {index > 0 && (
              <span
                aria-hidden="true"
                className={`h-1.25 w-3 ${open ? "bg-ink" : "bg-ink/20"}`}
              />
            )}
            {open && !isCurrent ? (
              <Link
                href={levelHref(course.slug, number)}
                onClick={playClickSound}
                aria-label={label}
                className={`${className} pressable`}
              >
                {content}
              </Link>
            ) : (
              <motion.span
                aria-label={label}
                aria-current={isCurrent ? "step" : undefined}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : undefined}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className={className}
              >
                {content}
              </motion.span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
