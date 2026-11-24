"use client";

import { motion } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { LockedCourse } from "@/_components/puzzle/LockedCourse";
import { useStars } from "@/hooks/useStars";
import { courseLock, courseStats } from "@/lib/courseProgress";
import { courses } from "@/lib/courses";
import {
  getHubPage,
  getServerHubPage,
  saveHubPage,
  subscribeHubPage,
} from "@/lib/hubPage";
import { playClickSound } from "@/lib/sound";
import { CourseCard } from "./CourseCard";
import { Pager, type PagerTexts } from "./Pager";
import type { HubTexts } from "./types";

const pageSize = 4;
const pages = Math.ceil(courses.length / pageSize);

type CourseListProps = { texts: HubTexts; pager: PagerTexts };

export function CourseList({ texts, pager }: CourseListProps) {
  const stars = useStars();
  const stored = useSyncExternalStore(
    subscribeHubPage,
    getHubPage,
    getServerHubPage,
  );
  const page = Math.min(pages - 1, Math.max(0, stored));
  const grid = useRef<HTMLDivElement>(null);
  const first = page * pageSize;

  const goTo = (next: number) => {
    playClickSound();
    saveHubPage(next);
    grid.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div ref={grid} className="grid scroll-mt-28 gap-8 md:grid-cols-2">
        {courses.slice(first, first + pageSize).map((course, index) => {
          const lock = courseLock(course, stars);
          return lock ? (
            <motion.article
              key={course.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col justify-center rounded-[30px] border-[3px] border-dashed border-ink bg-paper/70 p-8"
            >
              <LockedCourse
                title={course.title}
                lock={lock}
                texts={texts.locked}
              />
            </motion.article>
          ) : (
            <CourseCard
              key={course.slug}
              course={course}
              index={index}
              featured={first + index === 0}
              stats={courseStats(course, stars)}
              texts={texts}
            />
          );
        })}
      </div>
      <Pager page={page} pages={pages} texts={pager} onPage={goTo} />
    </>
  );
}
