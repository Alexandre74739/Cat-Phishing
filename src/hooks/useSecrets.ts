"use client";

import { useSyncExternalStore } from "react";
import { subscribeStores } from "@/lib/localStore";
import { getSecrets, getServerSecrets } from "@/lib/secretStore";

export function useSecrets() {
  return useSyncExternalStore(subscribeStores, getSecrets, getServerSecrets);
}
