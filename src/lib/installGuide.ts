import type { Platform } from "./platform";

export type InstallGuide = Record<Platform, { title: string; steps: string[] }>;

export const installGuide: InstallGuide = {
  ios: {
    title: "On iPhone / iPad",
    steps: [
      "Tap the Share button (the square with an arrow pointing up).",
      "Choose “Add to Home Screen”.",
      "Tap “Add”: Cat-phishing is now on your home screen!",
    ],
  },
  "safari-mac": {
    title: "On Safari (Mac)",
    steps: [
      "Open the “File” menu.",
      "Choose “Add to Dock”.",
      "Cat-phishing now opens like a real app.",
    ],
  },
  "firefox-android": {
    title: "On Firefox (Android)",
    steps: [
      "Tap the ⋮ menu at the top right.",
      "Choose “Install” (or “Add to Home screen”).",
    ],
  },
  samsung: {
    title: "On Samsung Internet",
    steps: [
      "Tap the ≡ menu at the bottom.",
      "Choose “Add page to”, then “Home screen”.",
    ],
  },
  chromium: {
    title: "On Edge / Chrome",
    steps: [
      "Click the install icon on the right of the address bar.",
      "Or open the ⋯ menu › Apps › “Install Cat-phishing”.",
    ],
  },
  "firefox-windows": {
    title: "On Firefox (Windows)",
    steps: [
      "Click the “web apps” icon in the address bar.",
      "Choose “Add to taskbar”: Cat-phishing opens like an app and shows up in the Start menu.",
      "No icon? Update Firefox (version 143 or later). The Microsoft Store version can't do it: use the Edge button below instead.",
    ],
  },
  "firefox-desktop": {
    title: "On Firefox (Mac / Linux)",
    steps: [
      "Firefox can only install apps on Windows for now.",
      "On Mac, open Cat-phishing in Safari (File › Add to Dock) or Chrome.",
      "On Linux, open it in Chrome or Edge, then click “Install the app”.",
    ],
  },
};
