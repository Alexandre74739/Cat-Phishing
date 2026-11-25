"use client";

import { UserPlus } from "lucide-react";
import type { ReactNode } from "react";
import type { PartyPlayer } from "@/lib/party";
import type { TableTexts } from "../types";
import { Seat } from "./Seat";

type PartyTableProps = {
  players: PartyPlayer[];
  texts: TableTexts;
  seats?: number;
  out?: string[];
  holder?: string;
  active?: string;
  spotlight?: string | null;
  selectable?: string[];
  onSelect?: (id: string) => void;
  onEmptySeat?: () => void;
  children?: ReactNode;
};

const seatSpot = (index: number, count: number) => {
  const angle = ((index / count) * 360 - 90) * (Math.PI / 180);
  return {
    left: `${50 + 37 * Math.cos(angle)}%`,
    top: `${50 + 38 * Math.sin(angle)}%`,
  };
};

export function PartyTable({
  players,
  texts,
  seats = 0,
  out = [],
  holder,
  active,
  spotlight,
  selectable = [],
  onSelect,
  onEmptySeat,
  children,
}: PartyTableProps) {
  const count = Math.max(players.length, seats);

  return (
    <div className="grid min-h-0 flex-1 place-items-center [container-type:size]">
      <div className="relative aspect-square w-[min(100cqw_-_0.5rem,100cqh_-_1.5rem,32rem)]">
        <div className="toon absolute inset-[19%] grid place-items-center rounded-full bg-grape">
          <span className="absolute inset-2 rounded-full border-[3px] border-dashed border-lilac/50" />
          <div className="relative">{children}</div>
        </div>
        <ul aria-label={texts.label} className="absolute inset-0">
          {Array.from({ length: count }, (_, index) => {
            const player = players[index];
            return (
              <li
                key={player?.id ?? `seat-${index}`}
                style={seatSpot(index, count)}
                className="absolute w-18 -translate-x-1/2 -translate-y-1/2"
              >
                {player ? (
                  <Seat
                    player={player}
                    texts={texts}
                    holder={player.id === holder}
                    active={player.id === active}
                    out={out.includes(player.id)}
                    spotlight={player.id === spotlight}
                    dimmed={
                      selectable.length > 0 && !selectable.includes(player.id)
                    }
                    onSelect={
                      onSelect && selectable.includes(player.id)
                        ? () => onSelect(player.id)
                        : undefined
                    }
                  />
                ) : (
                  <button
                    type="button"
                    onClick={onEmptySeat}
                    disabled={!onEmptySeat}
                    aria-label={texts.empty}
                    className="group pressable mx-auto grid size-12 place-items-center rounded-full border-[3px] border-dashed border-ink bg-paper font-display text-2xl text-grape hover:scale-110 hover:border-solid hover:bg-grape hover:text-paper focus-visible:scale-110 focus-visible:border-solid focus-visible:bg-grape focus-visible:text-paper"
                  >
                    <span className="group-hover:hidden group-focus-visible:hidden">
                      ?
                    </span>
                    <UserPlus
                      size={22}
                      strokeWidth={2.75}
                      aria-hidden="true"
                      className="hidden group-hover:block group-focus-visible:block"
                    />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
