"use client";

import { useReducedMotion } from "motion/react";

export type HeroVideoTexts = {
  src: string;
  poster?: string;
  label: string;
};

export function HeroVideo({ src, poster, label }: HeroVideoTexts) {
  const still = useReducedMotion() ?? false;

  return (
    <div className="toon relative aspect-video w-full overflow-hidden rounded-[30px] bg-ink">
      <video
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay={!still}
        muted
        loop
        playsInline
        controls
        disablePictureInPicture
        preload={still ? "metadata" : "auto"}
        className="size-full object-cover"
      />
    </div>
  );
}
