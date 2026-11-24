import { unlockStatus } from "./courseProgress";
import { courses } from "./courses";
import type { StarsBySlug } from "./progress";

const seenKey = "cat-phishing:map-seen";

export const secretCourse = courses.find((course) => course.unlock);

export const mapStatus = (stars: StarsBySlug) =>
  secretCourse ? unlockStatus(secretCourse, stars) : null;

export const foundPieces = (stars: StarsBySlug) =>
  (mapStatus(stars)?.courses ?? [])
    .filter(({ done }) => done)
    .map(({ slug }) => slug);

export const newPiece = (before: StarsBySlug, after: StarsBySlug) =>
  foundPieces(after).find((slug) => !foundPieces(before).includes(slug));

export function getSeenPieces(): string[] {
  try {
    const raw = window.localStorage.getItem(seenKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveSeenPieces(slugs: string[]) {
  try {
    window.localStorage.setItem(seenKey, JSON.stringify(slugs));
  } catch {
    return;
  }
}
