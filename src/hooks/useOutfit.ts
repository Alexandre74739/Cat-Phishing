"use client";

import { useSyncExternalStore } from "react";
import { subscribeStores } from "@/lib/localStore";
import { getOutfit, getServerOutfit } from "@/lib/outfitStore";

export function useOutfit() {
  return useSyncExternalStore(subscribeStores, getOutfit, getServerOutfit);
}
