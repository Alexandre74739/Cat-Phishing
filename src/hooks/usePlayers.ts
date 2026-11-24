"use client";

import { useSyncExternalStore } from "react";
import { subscribeStores } from "@/lib/localStore";
import {
  getActivePlayer,
  getPlayers,
  getServerActivePlayer,
  getServerPlayers,
} from "@/lib/players";

export function usePlayers() {
  const players = useSyncExternalStore(
    subscribeStores,
    getPlayers,
    getServerPlayers,
  );
  const active = useSyncExternalStore(
    subscribeStores,
    getActivePlayer,
    getServerActivePlayer,
  );
  return { players, active };
}
