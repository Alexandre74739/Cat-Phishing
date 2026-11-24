import { createLocalStore, subscribeStores } from "./localStore";
import { playerKey } from "./players";

export type StarsBySlug = Record<string, number>;

export const starsKey = "cat-phishing:stars";

const starsStore = createLocalStore<StarsBySlug>(() => playerKey(starsKey), {});

export const getPlayerStars = (playerId: string) =>
  createLocalStore<StarsBySlug>(() => playerKey(starsKey, playerId), {}).get();

export const getStars = starsStore.get;
export const getServerStars = starsStore.getServer;
export const setStars = starsStore.set;
export const subscribeStars = subscribeStores;

// Beating the reference solution is saved next to the stars, under its own key.
export const recordKey = (level: string) => `record:${level}`;

export const hasRecord = (stars: StarsBySlug) =>
  Object.keys(stars).some((key) => key.startsWith("record:"));

export function saveStars(slug: string, stars: number) {
  const current = getStars();
  if ((current[slug] ?? 0) >= stars) return;
  setStars({ ...current, [slug]: stars });
}
