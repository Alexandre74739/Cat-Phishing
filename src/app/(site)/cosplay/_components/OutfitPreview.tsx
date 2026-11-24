"use client";

import { Star } from "lucide-react";
import dynamic from "next/dynamic";
import { CatPortrait } from "@/_components/cat/CatPortrait";
import { ProgressBar } from "@/_components/ui/ProgressBar";
import { fillText } from "@/lib/fillText";
import { nextGift, type Outfit } from "@/lib/outfits";
import type { WardrobeTexts } from "./types";

const CatPreview3D = dynamic(
  () => import("./CatPreview3D").then((module) => module.CatPreview3D),
  { ssr: false },
);

type OutfitPreviewProps = {
  outfit: Outfit;
  stars: number;
  texts: WardrobeTexts;
};

export function OutfitPreview({ outfit, stars, texts }: OutfitPreviewProps) {
  const gift = nextGift(stars);
  const portrait = (
    <div className="grid h-full place-items-center">
      <CatPortrait outfit={outfit} size={180} />
    </div>
  );

  return (
    <section className="flex min-w-0 flex-col gap-4" aria-label={texts.preview}>
      <div className="toon scene relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-4/3 lg:aspect-square">
        <div className="absolute inset-0">
          <CatPreview3D
            outfit={outfit}
            label={texts.preview}
            fallback={portrait}
          />
        </div>
        <p className="toon absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 font-ui text-lg font-bold">
          <Star
            size={20}
            strokeWidth={2.5}
            className="fill-orange"
            aria-hidden="true"
          />
          {stars}
          <span className="sr-only">{texts.stars}</span>
        </p>
      </div>
      {gift ? (
        <div className="toon rounded-3xl bg-paper p-4">
          <p className="flex items-center justify-between gap-3 font-ui text-lg font-bold">
            <span>{fillText(texts.nextGift, { item: gift.name })}</span>
            <span className="flex shrink-0 items-center gap-1">
              <Star
                size={18}
                strokeWidth={2.5}
                className="fill-orange"
                aria-hidden="true"
              />
              {stars} / {gift.stars}
            </span>
          </p>
          <ProgressBar
            value={stars}
            max={gift.stars}
            label={`${texts.giftProgress}: ${stars} / ${gift.stars}`}
          />
        </div>
      ) : (
        <p className="toon rounded-3xl bg-orange p-4 font-ui text-lg font-bold">
          {texts.allUnlocked}
        </p>
      )}
    </section>
  );
}
