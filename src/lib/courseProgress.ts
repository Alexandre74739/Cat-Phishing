import { courses, levelKey, levelsPerCourse, type Course } from "./courses";
import type { StarsBySlug } from "./progress";

export const levelStars = (
  stars: StarsBySlug,
  course: Course,
  number: number,
) => stars[levelKey(course.slug, number)] ?? 0;

export function courseStats(course: Course, stars: StarsBySlug) {
  const earned = course.levels.map((_, index) =>
    levelStars(stars, course, index + 1),
  );
  const done = earned.filter(Boolean).length;
  const firstTodo = earned.findIndex((value) => value === 0);
  return {
    done,
    stars: earned.reduce((total, value) => total + value, 0),
    maxStars: levelsPerCourse * 3,
    nextLevel: firstTodo < 0 ? 1 : firstTodo + 1,
  };
}

export const isLevelOpen = (
  course: Course,
  number: number,
  stars: StarsBySlug,
) => number === 1 || levelStars(stars, course, number - 1) > 0;

export const totalStars = (stars: StarsBySlug) =>
  courses.reduce(
    (total, course) => total + courseStats(course, stars).stars,
    0,
  );

export type CourseLock = {
  stars: { have: number; need: number };
  courses: { slug: string; title: string; done: boolean }[];
};

export function courseLock(
  course: Course,
  stars: StarsBySlug,
): CourseLock | null {
  if (!course.unlock) return null;
  const need = course.unlock.stars;
  const required = courses
    .filter(({ slug }) => course.unlock?.courses.includes(slug))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      done: courseStats(item, stars).done === levelsPerCourse,
    }));
  const have = totalStars(stars);
  if (have >= need && required.every(({ done }) => done)) return null;
  return { stars: { have: Math.min(have, need), need }, courses: required };
}
