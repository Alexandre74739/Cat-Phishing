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
  holder?: string;
  spotlight?: string | null;
  selectable?: string[];
  onSelect?: (id: string) => void;
  onEmptySeat?: () => void;
  children?: ReactNode;
};

const seatSpot = (index: number, count: number) => {
  const angle = ((index / count) * 360 - 90) * (Math.PI / 180);
  return {
    spot: {
      left: `${50 + 36 * Math.cos(angle)}%`,
      top: `${50 + 36 * Math.sin(angle)}%`,
    },
    upper: Math.sin(angle) < -0.1,
  };
};

export function PartyTable({
  players,
  texts,
  seats = 0,
  holder,
  spotlight,
  selectable = [],
  onSelect,
  onEmptySeat,
  children,
}: PartyTableProps) {
  const count = Math.max(players.length, seats);

  return (
    <div className="grid min-h-0 flex-1 place-items-center [container-type:size]">
      <div className="relative aspect-square w-[min(100cqw_-_0.5rem,100cqh_-_3rem,36rem)] [container-type:inline-size]">
        <div className="toon absolute inset-[30%] grid place-items-center rounded-full bg-card-back">
          <span className="absolute inset-2 rounded-full border-4 border-card-line/35" />
          <span className="absolute inset-5 rounded-full border-2 border-card-line/15" />
          <div className="relative">{children}</div>
        </div>
        <ul
          aria-label={texts.label}
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: count }, (_, index) => {
            const player = players[index];
            const { spot, upper } = seatSpot(index, count);
            return (
              <li
                key={player?.id ?? `seat-${index}`}
                style={spot}
                className="pointer-events-auto absolute w-[max(3.25rem,17%)] -translate-x-1/2 -translate-y-1/2"
              >
                {player ? (
                  <Seat
                    player={player}
                    texts={texts}
                    holder={player.id === holder}
                    labelAbove={upper}
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
                    className="group pressable grid aspect-square w-full place-items-center rounded-full border-[3px] border-dashed border-ink bg-paper font-display text-2xl text-grape hover:scale-110 hover:border-solid hover:bg-grape hover:text-paper focus-visible:scale-110 focus-visible:border-solid focus-visible:bg-grape focus-visible:text-paper"
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
