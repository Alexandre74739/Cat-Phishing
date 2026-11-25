"use client";

import { useEffect, useState } from "react";
import {
  fetchShow,
  sameShow,
  showPollMs,
  type ShowSignal,
} from "@/lib/hackShow";

export function useShowSignal(isEnabled: boolean) {
  const [signal, setSignal] = useState<ShowSignal | null>(null);

  useEffect(() => {
    if (!isEnabled) return;
    let timer: number | undefined;
    let isActive = true;
    const poll = async () => {
      if (document.visibilityState === "visible") {
        const next = await fetchShow();
        if (isActive && next)
          setSignal((current) => (sameShow(current, next) ? current : next));
      }
      if (isActive) timer = window.setTimeout(poll, showPollMs);
    };
    void poll();
    return () => {
      isActive = false;
      window.clearTimeout(timer);
    };
  }, [isEnabled]);

  return isEnabled ? signal : null;
}
