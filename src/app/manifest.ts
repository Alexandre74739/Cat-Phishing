import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cat-phishing",
    short_name: "Cat-phishing",
    description:
      "The party card game where cats pass a virus around and crack code puzzles.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff7e8",
    theme_color: "#fff7e8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
