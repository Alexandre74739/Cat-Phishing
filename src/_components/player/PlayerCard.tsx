"use client";

import { Check, Cloud, Star } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";
import { totalStars } from "@/lib/courseProgress";
import type { Player } from "@/lib/players";
import { getPlayerStars } from "@/lib/progress";

export const tile =
  "flex h-full min-h-36 w-full flex-col items-center justify-center gap-2 rounded-3xl px-2 py-4 font-ui text-base font-semibold sm:min-h-40 sm:text-lg";

const badge =
  "toon absolute -top-3 grid size-8 place-items-center rounded-full";

type PlayerCardProps = {
  player: Player;
  isActive: boolean;
  playingLabel: string;
  onOpen: () => void;
};

export function PlayerCard({
  player,
  isActive,
  playingLabel,
  onOpen,
}: PlayerCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${tile} toon pressable relative ${isActive ? "bg-mint" : "bg-paper"}`}
    >
      {isActive && (
        <span className={`${badge} -left-2 -rotate-6 bg-grape text-paper`}>
          <Check size={18} strokeWidth={3.5} aria-label={playingLabel} />
        </span>
      )}
      {player.cloud && (
        <span className={`${badge} -right-2 rotate-6 bg-sky`}>
          <Cloud size={16} strokeWidth={3} aria-hidden="true" />
        </span>
      )}
      <span className="toon grid size-16 place-items-center rounded-full bg-paper">
        <Avatar id={player.avatar} size={44} />
      </span>
      <span className="max-w-full leading-tight font-bold break-words">
        {player.name}
      </span>
      <span className="flex items-center gap-1 rounded-full border-2 border-ink bg-orange-soft px-3 text-sm sm:text-base">
        <Star
          size={16}
          strokeWidth={2.5}
          aria-hidden="true"
          className="fill-orange"
        />
        {totalStars(getPlayerStars(player.id))}
      </span>
    </button>
  );
}
