"use client";

import { useStars } from "@/hooks/useStars";
import { courseStats } from "@/lib/courseProgress";
import { courses } from "@/lib/courses";
import { CourseCard } from "./CourseCard";
import type { HubTexts } from "./types";

export function CourseList({ texts }: { texts: HubTexts }) {
  const stars = useStars();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {courses.map((course, index) => (
        <CourseCard
          key={course.slug}
          course={course}
          index={index}
          featured={index === 0}
          stats={courseStats(course, stars)}
          texts={texts}
        />
      ))}
    </div>
  );
}
