"use client";

import { Bug, Megaphone, X } from "lucide-react";
import { motion } from "motion/react";
import { Avatar } from "@/_components/ui/Avatar";
import type { PartyPlayer } from "@/lib/party";
import type { TableTexts } from "../types";

export type SeatState = {
  holder?: boolean;
  active?: boolean;
  out?: boolean;
  spotlight?: boolean;
  dimmed?: boolean;
};

type SeatProps = SeatState & {
  player: PartyPlayer;
  texts: TableTexts;
  onSelect?: () => void;
};

const badge =
  "toon absolute grid size-7 place-items-center rounded-full text-ink";

export function Seat({
  player,
  texts,
  holder,
  active,
  out,
  spotlight,
  dimmed,
  onSelect,
}: SeatProps) {
  const status = [
    holder && texts.holder,
    active && texts.active,
    out && texts.out,
  ]
    .filter(Boolean)
    .join(", ");
  const color = spotlight
    ? "bg-orange"
    : holder && !out
      ? "bg-coral"
      : "bg-paper";
  const face = (
    <>
      <motion.span
        animate={{ scale: spotlight ? 1.2 : 1 }}
        className={`relative grid size-14 place-items-center rounded-full border-[3px] border-ink ${color} ${onSelect ? "running-glow" : ""}`}
      >
        <span className={out ? "opacity-40 grayscale" : ""}>
          <Avatar id={player.avatar} size={36} />
        </span>
        {out && (
          <X
            className="absolute size-12 text-coral"
            strokeWidth={4}
            aria-hidden="true"
          />
        )}
        {holder && !out && (
          <motion.span
            layoutId="catware"
            className={`${badge} -right-2 -bottom-2 bg-mint`}
          >
            <Bug size={16} strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
        {active && !out && (
          <motion.span
            layoutId="caller"
            className={`${badge} -top-2 -left-2 bg-orange`}
          >
            <Megaphone size={15} strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
      </motion.span>
      <span
        className={`max-w-full truncate rounded-full border-2 border-ink px-1.5 font-ui text-xs font-bold ${out ? "bg-lilac line-through" : "bg-paper"}`}
      >
        {player.name}
      </span>
      {status && <span className="sr-only">{status}</span>}
    </>
  );

  if (!onSelect)
    return (
      <div
        className={`flex flex-col items-center gap-1 motion-safe:transition-opacity ${dimmed ? "opacity-40" : ""}`}
      >
        {face}
      </div>
    );
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-1 rounded-2xl"
    >
      {face}
    </button>
  );
}
