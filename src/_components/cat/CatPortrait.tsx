import type { Outfit } from "@/lib/outfits";
import { CatFace, type CatMood } from "./CatFace";
import { backArt } from "./backArt";
import { faceArt } from "./faceArt";
import { fancyHatArt } from "./fancyHatArt";
import { hatArt } from "./hatArt";
import { neckArt } from "./neckArt";
import { furClasses } from "./outfitLooks";
import { trophyHatArt } from "./trophyHatArt";
import { wingArt } from "./wingArt";

type CatPortraitProps = {
  outfit: Outfit;
  mood?: CatMood;
  size?: number;
  className?: string;
};

export function CatPortrait({
  outfit,
  mood = "happy",
  size = 64,
  className = "",
}: CatPortraitProps) {
  return (
    <svg
      viewBox="-12 -22 72 72"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 overflow-visible stroke-ink ${furClasses[outfit.fur] ?? ""} ${className}`}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {backArt[outfit.back] ?? wingArt[outfit.back]}
      <CatFace mood={mood} size={48} />
      {neckArt[outfit.neck]}
      {faceArt[outfit.face]}
      {hatArt[outfit.hat] ??
        fancyHatArt[outfit.hat] ??
        trophyHatArt[outfit.hat]}
    </svg>
  );
}
