import type { Slot } from "@/lib/outfits";

export type WardrobeTexts = {
  preview: string;
  stars: string;
  nextGift: string;
  giftProgress: string;
  allUnlocked: string;
  categories: string;
  slots: Record<Slot, string>;
  locked: string;
  lockStars: string;
  lockBadge: string;
  newSecretBadge: string;
};
