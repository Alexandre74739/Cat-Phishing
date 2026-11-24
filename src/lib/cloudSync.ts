import {
  mergeData,
  sameData,
  sanitizeData,
  type CloudData,
  type CloudErrorCode,
} from "./cloud";
import { notifyStores, subscribeStores } from "./localStore";
import { getActivePlayer, updatePlayer } from "./players";
import { getStars, setStars } from "./progress";

export type SyncStatus = "off" | "syncing" | "ok" | "offline" | "error";

export class CloudError extends Error {
  constructor(
    public code: CloudErrorCode,
    public info: { left?: number; retryIn?: number } = {},
  ) {
    super(code);
  }
}

export async function cloudCall<T>(body: Record<string, unknown>): Promise<T> {
  let response: Response;
  try {
    response = await fetch("/api/cloud", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new CloudError("offline");
  }
  const result = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  if (!response.ok)
    throw new CloudError(
      typeof result.error === "string"
        ? (result.error as CloudErrorCode)
        : response.status === 404
          ? "unavailable"
          : "server",
      result,
    );
  return result as T;
}

let status: SyncStatus = "off";

const setStatus = (next: SyncStatus) => {
  status = next;
  notifyStores();
};

export const getSyncStatus = () => status;
export const getServerSyncStatus = (): SyncStatus => "off";

export const localData = (): CloudData => sanitizeData({ stars: getStars() });

export function applyData(data: CloudData) {
  const merged = mergeData(localData(), sanitizeData(data));
  if (!sameData(merged, localData())) setStars(merged.stars);
}

let running: Promise<void> | null = null;
let isAgainNeeded = false;

async function syncOnce() {
  const player = getActivePlayer();
  if (!player.cloud) return setStatus("off");
  setStatus("syncing");
  try {
    const { data } = await cloudCall<{ data: unknown }>({
      action: "sync",
      pseudo: player.cloud.pseudo,
      token: player.cloud.token,
      data: localData(),
    });
    applyData(sanitizeData(data));
    updatePlayer(player.id, {
      cloud: { ...player.cloud, syncedAt: Date.now() },
    });
    setStatus("ok");
  } catch (error) {
    const code = error instanceof CloudError ? error.code : "server";
    if (code === "auth") updatePlayer(player.id, { cloud: undefined });
    setStatus(
      code === "offline" || code === "unavailable" ? "offline" : "error",
    );
  }
}

export function syncNow(): Promise<void> {
  if (running) {
    isAgainNeeded = true;
    return running;
  }
  running = (async () => {
    do {
      isAgainNeeded = false;
      await syncOnce();
    } while (isAgainNeeded);
  })().finally(() => {
    running = null;
  });
  return running;
}

let isStarted = false;

// Syncs on load, after each star change (grouped), when the network or the tab comes back.
export function startAutoSync() {
  if (isStarted) return;
  isStarted = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastStars = getStars();
  const soon = (delay = 1500) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (getActivePlayer().cloud) void syncNow();
    }, delay);
  };
  subscribeStores(() => {
    if (getStars() === lastStars) return;
    lastStars = getStars();
    soon();
  });
  window.addEventListener("online", () => soon(200));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") soon(200);
  });
  soon(300);
}
