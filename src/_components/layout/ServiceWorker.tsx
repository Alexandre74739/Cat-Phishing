"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // A worker left by a production run on localhost would serve stale dev chunks.
    if (process.env.NODE_ENV !== "production") {
      void navigator.serviceWorker
        .getRegistrations()
        .then((list) => list.forEach((worker) => void worker.unregister()));
      if ("caches" in window)
        void caches
          .keys()
          .then((keys) => keys.forEach((key) => void caches.delete(key)));
      return;
    }

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
