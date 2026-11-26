// No value import here: the API route sanitizes saved outfits with this file.
import type { BadgeId } from "./badges";

export type Slot = "fur" | "hat" | "face" | "neck" | "back" | "trail";

export type OutfitItem = {
  id: string;
  name: string;
  stars: number;
  badge?: BadgeId;
  hidden?: boolean;
};

export type Outfit = Record<Slot, string>;

export const slots: Record<Slot, OutfitItem[]> = {
  fur: [
    { id: "meownymous", name: "Meownymous", stars: 0 },
    { id: "ginger", name: "Ginger", stars: 0 },
    { id: "snow", name: "Snow", stars: 5 },
    { id: "sky", name: "Sky", stars: 9 },
    { id: "midnight", name: "Midnight", stars: 14 },
    { id: "coral", name: "Coral", stars: 20 },
    { id: "mint", name: "Mint", stars: 26 },
    { id: "ash", name: "Ash", stars: 33 },
    { id: "bubblegum", name: "Bubblegum", stars: 40 },
    { id: "lilac", name: "Lilac", stars: 60 },
    { id: "gold", name: "Gold", stars: 150 },
    {
      id: "matrix",
      name: "Matrix",
      stars: 0,
      badge: "debugger",
      hidden: true,
    },
  ],
  hat: [
    { id: "none", name: "No hat", stars: 0 },
    { id: "cap", name: "Coder cap", stars: 3 },
    { id: "beanie", name: "Cozy beanie", stars: 6 },
    { id: "propeller", name: "Propeller cap", stars: 10 },
    { id: "headphones", name: "Gamer headphones", stars: 16 },
    { id: "antenna", name: "Wi-Fi antenna", stars: 22 },
    { id: "party", name: "Party hat", stars: 28 },
    { id: "wizard", name: "Code wizard hat", stars: 35 },
    { id: "tophat", name: "Top hat", stars: 55 },
    { id: "crown", name: "Crown", stars: 90 },
    { id: "helmet", name: "Firewall helmet", stars: 0, badge: "castleHero" },
    { id: "gradcap", name: "Graduation cap", stars: 0, badge: "graduate" },
  ],
  face: [
    { id: "none", name: "Nothing", stars: 0 },
    { id: "mustache", name: "Mustache", stars: 4 },
    { id: "glasses", name: "Round glasses", stars: 8 },
    { id: "shades", name: "Sunglasses", stars: 0 },
    { id: "monocle", name: "Monocle", stars: 42 },
    { id: "pixel", name: "Pixel shades", stars: 60 },
    { id: "visor", name: "Hacker visor", stars: 70 },
    { id: "mask", name: "Hero mask", stars: 0, badge: "bugSquasher" },
  ],
  neck: [
    { id: "none", name: "Nothing", stars: 0 },
    { id: "bell", name: "Bell collar", stars: 2 },
    { id: "bowtie", name: "Bow tie", stars: 12 },
    { id: "scarf", name: "Cozy scarf", stars: 24 },
    { id: "lanyard", name: "Access badge", stars: 46 },
    { id: "chain", name: "Gold chain", stars: 0, badge: "perfectCourse" },
  ],
  back: [
    { id: "none", name: "Nothing", stars: 0 },
    { id: "backpack", name: "Backpack", stars: 0 },
    { id: "bow", name: "Big bow", stars: 10 },
    { id: "cape", name: "Hero cape", stars: 18 },
    { id: "shield", name: "Antivirus shield", stars: 38 },
    { id: "wings", name: "Butterfly wings", stars: 50 },
    { id: "batwings", name: "Bat wings", stars: 65 },
    { id: "jetpack", name: "Jetpack", stars: 0, badge: "lavaJumper" },
  ],
  trail: [
    { id: "none", name: "None", stars: 0 },
    { id: "sparkles", name: "Sparkles", stars: 12 },
    { id: "hearts", name: "Hearts", stars: 25 },
    { id: "bubbles", name: "Bubbles", stars: 45 },
    { id: "snow", name: "Snowflakes", stars: 60 },
    { id: "bits", name: "Binary bits", stars: 80 },
    { id: "stars", name: "Shooting stars", stars: 100 },
    { id: "rainbow", name: "Rainbow", stars: 120 },
    { id: "flames", name: "Flames", stars: 200 },
    { id: "viruses", name: "Tamed viruses", stars: 0, badge: "virusDodger" },
  ],
};

export const slotNames = Object.keys(slots) as Slot[];

export const defaultOutfit: Outfit = {
  fur: "meownymous",
  hat: "none",
  face: "shades",
  neck: "none",
  back: "backpack",
  trail: "none",
};

export const isItemOpen = (
  item: OutfitItem,
  stars: number,
  badgeIds: readonly string[],
) => (item.badge ? badgeIds.includes(item.badge) : item.stars <= stars);

export function cleanOutfit(raw: unknown): Outfit {
  const source = raw && typeof raw === "object" ? raw : {};
  const entries = slotNames.map((slot) => {
    const id = (source as Record<string, unknown>)[slot];
    const isKnown = slots[slot].some((item) => item.id === id);
    return [slot, isKnown ? id : defaultOutfit[slot]];
  });
  return Object.fromEntries(entries) as Outfit;
}

export function nextGift(stars: number) {
  return (
    slotNames
      .flatMap((slot) => slots[slot])
      .filter((item) => !item.badge && item.stars > stars)
      .sort((a, b) => a.stars - b.stars)[0] ?? null
  );
}
