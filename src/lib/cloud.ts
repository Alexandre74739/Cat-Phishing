// Shared by the browser and the API route: no Node or browser import here.
import { defaultAvatarId } from "./avatars";
import type { StarsBySlug } from "./progress";

export type CloudData = { stars: StarsBySlug };

export type CloudErrorCode =
  | "badPseudo"
  | "badCode"
  | "taken"
  | "unknown"
  | "locked"
  | "auth"
  | "tooMany"
  | "offline"
  | "unavailable"
  | "server";

export const codeLength = 4;
const maxStarKeys = 500;

export const emptyCloudData = (): CloudData => ({ stars: {} });

export const isValidCode = (code: unknown): code is string[] =>
  Array.isArray(code) &&
  code.length === codeLength &&
  code.every((digit) => typeof digit === "string" && /^[0-9]$/.test(digit));

export const isAvatarId = (id: unknown): id is string =>
  typeof id === "string" && /^[0-9a-f]{2,6}(-[0-9a-f]{2,6}){0,4}$/.test(id);

export const cleanAvatar = (id: unknown) =>
  isAvatarId(id) ? id : defaultAvatarId;

export function cleanPseudo(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const pseudo = raw.trim().replace(/\s+/g, " ");
  return /^[\p{L}\p{N} _-]{3,16}$/u.test(pseudo) ? pseudo : null;
}

// "Léa" and "lea" are the same account.
export const pseudoKey = (pseudo: string) =>
  pseudo
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const starKey = /^(record:)?[a-z-]{1,40}:\d{1,3}$/;

export function sanitizeData(raw: unknown): CloudData {
  const data = emptyCloudData();
  if (!raw || typeof raw !== "object") return data;
  const stars = (raw as { stars?: unknown }).stars;
  if (!stars || typeof stars !== "object") return data;
  for (const [key, value] of Object.entries(stars).slice(0, maxStarKeys)) {
    if (starKey.test(key) && typeof value === "number" && value > 0)
      data.stars[key] = Math.min(3, Math.floor(value));
  }
  return data;
}

// Keeps the best of both saves: a star is never lost.
export function mergeData(a: CloudData, b: CloudData): CloudData {
  const stars = { ...a.stars };
  for (const [key, value] of Object.entries(b.stars))
    stars[key] = Math.max(stars[key] ?? 0, value);
  return { stars };
}

export const sameData = (a: CloudData, b: CloudData) => {
  const keys = Object.keys(a.stars);
  return (
    keys.length === Object.keys(b.stars).length &&
    keys.every((key) => a.stars[key] === b.stars[key])
  );
};
