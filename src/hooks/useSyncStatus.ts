"use client";

import { useSyncExternalStore } from "react";
import { getServerSyncStatus, getSyncStatus } from "@/lib/cloudSync";
import { subscribeStores } from "@/lib/localStore";

export function useSyncStatus() {
  return useSyncExternalStore(
    subscribeStores,
    getSyncStatus,
    getServerSyncStatus,
  );
}
