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
  "absolute grid size-7 place-items-center rounded-lg border-[3px] border-ink";

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
  const infected = holder && !out;
  const color = spotlight ? "bg-orange" : out ? "bg-lilac" : "bg-cream";
  const face = (
    <>
      <motion.span
        animate={{ scale: spotlight ? 1.2 : 1 }}
        className={`relative grid size-14 place-items-center rounded-full border-[3px] border-ink shadow-pop ${color} ${infected ? "outline-4 outline-offset-2 outline-virus" : ""} ${onSelect ? "running-glow" : ""}`}
      >
        <span className={out ? "opacity-40 grayscale" : ""}>
          <Avatar id={player.avatar} size={36} />
        </span>
        {out && (
          <X
            className="absolute size-12 text-virus"
            strokeWidth={4}
            aria-hidden="true"
          />
        )}
        {infected && (
          <motion.span
            layoutId="catware"
            className={`${badge} -right-3 -bottom-2 bg-virus text-cream`}
          >
            <Bug size={16} strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
        {active && !out && (
          <motion.span
            layoutId="caller"
            className={`${badge} -top-2 -left-3 bg-orange text-ink`}
          >
            <Megaphone size={15} strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
      </motion.span>
      <span
        className={`max-w-full truncate rounded-md px-2 py-0.5 font-ui text-[13px] leading-tight font-bold ${out ? "bg-lilac text-ink line-through" : infected ? "bg-virus text-cream" : "bg-ink text-cream"}`}
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
