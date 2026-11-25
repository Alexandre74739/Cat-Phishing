"use client";

import { Bug } from "lucide-react";
import { motion } from "motion/react";
import { Avatar } from "@/_components/ui/Avatar";
import type { PartyPlayer } from "@/lib/party";
import type { TableTexts } from "../types";

type SeatProps = {
  player: PartyPlayer;
  texts: TableTexts;
  holder?: boolean;
  spotlight?: boolean;
  dimmed?: boolean;
  labelAbove?: boolean;
  onSelect?: () => void;
};

export function Seat({
  player,
  texts,
  holder,
  spotlight,
  dimmed,
  labelAbove,
  onSelect,
}: SeatProps) {
  const face = (
    <>
      <motion.span
        animate={{ scale: spotlight ? 1.15 : 1 }}
        className={`relative grid aspect-square w-full place-items-center rounded-full border-[3px] border-ink shadow-pop ${spotlight ? "bg-orange" : "bg-paper"} ${holder ? "outline-4 outline-offset-2 outline-virus" : ""} ${onSelect ? "running-glow" : ""}`}
      >
        <span className="w-3/5 [&>img]:h-auto [&>img]:w-full">
          <Avatar id={player.avatar} size={64} />
        </span>
        {holder && (
          <motion.span
            layoutId="catware"
            className="absolute -right-[12%] -bottom-[6%] grid size-[42%] place-items-center rounded-lg border-[3px] border-ink bg-virus text-cream"
          >
            <Bug className="size-3/5" strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
      </motion.span>
      <span
        className={`absolute left-1/2 max-w-[9rem] -translate-x-1/2 truncate rounded-full border-[3px] border-ink px-3 py-0.5 font-ui text-base leading-tight font-bold whitespace-nowrap shadow-pop ${labelAbove ? "bottom-full mb-2" : "top-full mt-2"} ${holder ? "bg-virus text-cream" : "bg-paper text-ink"}`}
      >
        {player.name}
      </span>
      {holder && <span className="sr-only">, {texts.holder}</span>}
    </>
  );

  if (!onSelect)
    return (
      <div
        className={`relative motion-safe:transition-opacity ${dimmed ? "opacity-40" : ""}`}
      >
        {face}
      </div>
    );
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative block w-full rounded-full"
    >
      {face}
    </button>
  );
}
