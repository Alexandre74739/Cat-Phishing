"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Course } from "@/lib/courses";
import { levelHref } from "@/lib/navigation";
import { playClickSound } from "@/lib/sound";
import { CoursePreview } from "./CoursePreview";
import { CourseProgress } from "./CourseProgress";
import { DifficultyMeter } from "./DifficultyMeter";
import type { HubTexts } from "./types";

type CourseCardProps = {
  course: Course;
  index: number;
  featured: boolean;
  stats: { done: number; stars: number; maxStars: number; nextLevel: number };
  texts: HubTexts;
};

export function CourseCard({
  course,
  index,
  featured,
  stats,
  texts,
}: CourseCardProps) {
  const total = course.levels.length;
  const label =
    stats.done === total
      ? texts.replay
      : stats.done > 0
        ? texts.continue
        : texts.start;
  const href = levelHref(course.slug, stats.nextLevel);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: (index % 2) * 0.1,
        type: "spring",
        stiffness: 140,
        damping: 16,
      }}
      whileHover={{ y: -6 }}
      className="relative flex flex-col rounded-[30px] border-[3px] border-ink bg-paper shadow-[8px_9px_0_0_var(--color-ink)]"
    >
      <Link
        href={href}
        onClick={playClickSound}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 z-1 rounded-[30px]"
      />
      {featured && stats.done === 0 && (
        <motion.span
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="toon pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-paper px-3 py-1 font-ui text-sm font-bold"
        >
          <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" />
          {texts.startHere}
        </motion.span>
      )}
      <header
        className={`rounded-t-[27px] border-b-[3px] border-ink px-6 pt-5 pb-4 ${course.color}`}
      >
        <DifficultyMeter
          level={course.difficulty}
          label={texts.difficulty[course.difficulty - 1]}
        />
        <h2 className="mt-2 font-ui text-3xl font-bold">{course.title}</h2>
        <p className="font-bold">{course.subtitle}</p>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <CoursePreview course={course} texts={texts} />
        <CourseProgress
          done={stats.done}
          total={total}
          stars={stats.stars}
          maxStars={stats.maxStars}
          texts={texts}
        />
        <Link
          href={href}
          onClick={playClickSound}
          className={`toon pressable relative z-2 flex items-center justify-center gap-2 rounded-full py-3 font-ui text-xl font-semibold ${course.color}`}
        >
          {label}
          <ArrowRight size={22} strokeWidth={3} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
