"use client";

import { useCallback, useMemo, useState } from "react";
import { useOutfit } from "@/hooks/useOutfit";
import { useStars } from "@/hooks/useStars";
import { badges, earnedBadges } from "@/lib/badges";
import { totalStars } from "@/lib/courseProgress";
import { fillText } from "@/lib/fillText";
import { wearItem } from "@/lib/outfitStore";
import { isItemOpen, type OutfitItem, type Slot } from "@/lib/outfits";
import { unlockSecret } from "@/lib/secretStore";
import { playSound } from "@/lib/sound";
import { BadgeToast } from "./BadgeToast";
import { OutfitPreview } from "./OutfitPreview";
import type { WardrobeTexts } from "./types";
import { WardrobeItems } from "./WardrobeItems";

export function Wardrobe({ texts }: { texts: WardrobeTexts }) {
  const stars = useStars();
  const outfit = useOutfit();
  const total = totalStars(stars);
  const badgeIds = useMemo(
    () => earnedBadges(stars).map(({ id }) => id),
    [stars],
  );
  const isOpen = (item: OutfitItem) => isItemOpen(item, total, badgeIds);
  const [toast, setToast] = useState<string | null>(null);
  const hideToast = useCallback(() => setToast(null), []);

  const choose = (slot: Slot, item: OutfitItem) => {
    if (!isOpen(item)) return playSound("bump");
    playSound("star");
    if (outfit[slot] !== item.id) wearItem({ [slot]: item.id });
    if (!unlockSecret("stylist")) return;
    const badge = badges.find(({ id }) => id === "stylist");
    setTimeout(() => playSound("badge"), 250);
    setToast(fillText(texts.newSecretBadge, { badge: badge?.name ?? "" }));
  };

  return (
    <>
      <BadgeToast message={toast} onDone={hideToast} />
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <OutfitPreview outfit={outfit} stars={total} texts={texts} />
        <WardrobeItems
          outfit={outfit}
          isOpen={isOpen}
          texts={texts}
          onChoose={choose}
        />
      </div>
    </>
  );
}
