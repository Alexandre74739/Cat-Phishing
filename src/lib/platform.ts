export type Platform =
  | "ios"
  | "safari-mac"
  | "firefox-windows"
  | "firefox-desktop"
  | "firefox-android"
  | "samsung"
  | "chromium";

export function detectPlatform(): Platform {
  const agent = navigator.userAgent;
  const isIpadOs = /Macintosh/.test(agent) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(agent) || isIpadOs) return "ios";
  if (/SamsungBrowser/.test(agent)) return "samsung";
  if (/Firefox|FxiOS/.test(agent)) {
    if (/Android/.test(agent)) return "firefox-android";
    return /Windows/.test(agent) ? "firefox-windows" : "firefox-desktop";
  }
  if (/Safari/.test(agent) && !/Chrome|Chromium|Edg|OPR/.test(agent))
    return "safari-mac";
  return "chromium";
}
