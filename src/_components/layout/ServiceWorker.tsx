"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const registration = navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => null);
    const checkForUpdate = () => {
      if (document.visibilityState !== "visible") return;
      registration.then((current) => current?.update()).catch(() => null);
    };

    document.addEventListener("visibilitychange", checkForUpdate);
    return () =>
      document.removeEventListener("visibilitychange", checkForUpdate);
  }, []);

  return null;
}
