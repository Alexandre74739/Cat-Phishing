"use client";

import { Bug } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/_components/ui/Avatar";
import { CheckList } from "@/_components/ui/CheckList";
import { fillText } from "@/lib/fillText";
import type { PartyPlayer } from "@/lib/party";
import { CardZoom } from "../cards/CardZoom";
import { CatwareCard } from "../cards/CatwareCard";
import type { PartyTexts } from "../types";

type CenterCardProps = {
  texts: PartyTexts["cards"];
  holder: PartyPlayer;
  revealed: boolean;
};

export function CenterCard({ texts, holder, revealed }: CenterCardProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        disabled={!revealed}
        aria-label={texts.zoom}
        className="block rounded-xl motion-safe:transition-transform enabled:hover:scale-105"
      >
        <CatwareCard
          label={texts.catware}
          revealed={revealed}
          className="w-[14cqw]"
        />
      </button>
      {zoomed && (
        <CardZoom
          card="cat-ware"
          title={texts.catware}
          close={texts.close}
          onClose={() => setZoomed(false)}
        >
          <p className="flex items-center gap-2 self-start rounded-2xl border-[3px] border-ink bg-paper p-2 pr-4 font-ui text-lg font-bold">
            <Avatar id={holder.avatar} size={32} />
            {fillText(texts.heldBy, { name: holder.name })}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-virus text-cream">
              <Bug size={15} strokeWidth={3} aria-hidden="true" />
            </span>
          </p>
          <CheckList
            items={texts.points}
            className="flex flex-col gap-3 sm:text-lg"
          />
        </CardZoom>
      )}
    </>
  );
}
