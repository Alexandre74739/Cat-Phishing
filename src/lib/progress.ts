// Progress stays on the device (localStorage): no account, nothing sent anywhere.
export type StarsBySlug = Record<string, number>;

const storageKey = "cat-phishing:stars";
const listeners = new Set<() => void>();
const empty: StarsBySlug = {};
let cache: { raw: string | null; stars: StarsBySlug } = {
  raw: null,
  stars: empty,
};

function read(): string | null {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function getStars(): StarsBySlug {
  const raw = read();
  if (raw === cache.raw) return cache.stars;
  let stars = empty;
  try {
    stars = raw ? (JSON.parse(raw) as StarsBySlug) : empty;
  } catch {
    stars = empty;
  }
  cache = { raw, stars };
  return stars;
}

export const getServerStars = () => empty;

// Beating the reference solution is saved next to the stars, under its own key.
export const recordKey = (level: string) => `record:${level}`;

export const hasRecord = (stars: StarsBySlug) =>
  Object.keys(stars).some((key) => key.startsWith("record:"));

export function saveStars(slug: string, stars: number) {
  const current = getStars();
  if ((current[slug] ?? 0) >= stars) return;
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ ...current, [slug]: stars }),
    );
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
}

export function subscribeStars(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
