import { courses, levelsPerCourse } from "@/lib/courses";
import { levelHref, routes } from "@/lib/navigation";
import type { LevelTexts } from "./types";

export function winLink(
  courseIndex: number,
  number: number,
  texts: LevelTexts["win"],
) {
  const course = courses[courseIndex];
  if (number < levelsPerCourse)
    return { label: texts.next, href: levelHref(course.slug, number + 1) };
  const nextCourse = courses[courseIndex + 1];
  if (nextCourse)
    return { label: texts.nextCourse, href: levelHref(nextCourse.slug, 1) };
  return { label: texts.allDone, href: routes.code };
}
