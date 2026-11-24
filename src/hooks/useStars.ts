"use client";

import { useSyncExternalStore } from "react";
import { getServerStars, getStars, subscribeStars } from "@/lib/progress";

export function useStars() {
  return useSyncExternalStore(subscribeStars, getStars, getServerStars);
}
