import { unlockStatus } from "./courseProgress";
import { courses } from "./courses";
import { createLocalStore } from "./localStore";
import { playerKey } from "./players";
import type { StarsBySlug } from "./progress";

export const seenPiecesKey = "cat-phishing:map-seen";

const seenStore = createLocalStore<string[]>(
  () => playerKey(seenPiecesKey),
  [],
);

export const secretCourse = courses.find((course) => course.unlock);

export const mapStatus = (stars: StarsBySlug) =>
  secretCourse ? unlockStatus(secretCourse, stars) : null;

export const foundPieces = (stars: StarsBySlug) =>
  (mapStatus(stars)?.courses ?? [])
    .filter(({ done }) => done)
    .map(({ slug }) => slug);

export const newPiece = (before: StarsBySlug, after: StarsBySlug) =>
  foundPieces(after).find((slug) => !foundPieces(before).includes(slug));

export const getSeenPieces = seenStore.get;
export const saveSeenPieces = seenStore.set;
