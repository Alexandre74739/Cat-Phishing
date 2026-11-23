"use client";

import { useSyncExternalStore } from "react";
import {
  canPromptInstall,
  isStandalone,
  promptInstall,
  subscribeToInstall,
} from "@/lib/installPrompt";
import { detectPlatform, type Platform } from "@/lib/platform";

const noSubscribe = () => () => {};

export function useInstallPrompt() {
  const isInstalled = useSyncExternalStore(
    subscribeToInstall,
    isStandalone,
    () => false,
  );
  const platform = useSyncExternalStore<Platform>(
    noSubscribe,
    detectPlatform,
    () => "chromium",
  );

  const install = async () => {
    if (!canPromptInstall()) return false;
    await promptInstall();
    return true;
  };

  return { isInstalled, platform, install };
}
