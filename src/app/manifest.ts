import type { MetadataRoute } from "next";
import { appColors, pwaIcons } from "@/lib/appIcon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Cat-phishing",
    short_name: "Cat-phishing",
    description:
      "The party card game where cats pass a virus around and crack code puzzles.",
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: appColors.background,
    theme_color: appColors.background,
    categories: ["games", "education", "entertainment"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      ...Object.entries(pwaIcons).map(([name, { size, maskable }]) => ({
        src: `/icons/${name}`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: maskable ? ("maskable" as const) : ("any" as const),
      })),
    ],
  };
}
