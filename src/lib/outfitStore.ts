import { createLocalStore } from "./localStore";
import { cleanOutfit, defaultOutfit, type Outfit } from "./outfits";
import { playerKey } from "./players";

export type SavedOutfit = Outfit & { at: number };

export const outfitKey = "cat-phishing:outfit";

const outfitStore = createLocalStore<SavedOutfit | null>(
  () => playerKey(outfitKey),
  null,
);

export const getSavedOutfit = outfitStore.get;
export const setSavedOutfit = outfitStore.set;

let cache: { saved: SavedOutfit | null; outfit: Outfit } | null = null;

export function getOutfit(): Outfit {
  const saved = outfitStore.get();
  if (cache?.saved !== saved) cache = { saved, outfit: cleanOutfit(saved) };
  return cache.outfit;
}

export const getServerOutfit = () => defaultOutfit;

// The newest outfit wins when two devices sync, so the time of the change is saved with it.
export const wearItem = (patch: Partial<Outfit>) =>
  outfitStore.set({ ...getOutfit(), ...patch, at: Date.now() });
