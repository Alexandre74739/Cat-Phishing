"use client";

import { BookOpen } from "lucide-react";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, survivors, type Party } from "@/lib/party";
import { CatwareCard } from "../cards/CatwareCard";
import { GameFrame } from "../frame/GameFrame";
import { PlayerStatusList } from "../frame/PlayerStatusList";
import { PartyTable } from "../table/PartyTable";
import type { PartyTexts } from "../types";
import { selectableIds, type PartyState } from "../useParty";
import { PhasePanel } from "./PhasePanel";
import { useRoulette } from "./useRoulette";

type PlayViewProps = { texts: PartyTexts; game: PartyState; party: Party };

export function PlayView({ texts, game, party }: PlayViewProps) {
  const roulette = useRoulette(
    party.players.map(({ id }) => id),
    party.holder,
    game.phase.kind === "draw",
  );
  const shown = roulette.done;

  return (
    <GameFrame
      toolbar={
        <button
          type="button"
          onClick={game.showRules}
          className="toon pressable flex min-h-12 items-center gap-2 rounded-full bg-paper px-4 font-ui font-semibold"
        >
          <BookOpen size={20} strokeWidth={2.75} aria-hidden="true" />
          {texts.turn.rules}
        </button>
      }
      side={{
        ...texts.side,
        open: fillText(texts.side.open, { count: survivors(party).length }),
      }}
      players={
        <PlayerStatusList party={party} texts={texts.table} revealed={shown} />
      }
    >
      <PartyTable
        players={party.players}
        texts={texts.table}
        out={party.out}
        holder={shown ? party.holder : undefined}
        active={shown ? party.active : undefined}
        spotlight={roulette.spotlight}
        selectable={selectableIds(party, game.phase)}
        onSelect={game.pickPlayer}
      >
        <span className="flex flex-col items-center gap-1">
          <CatwareCard
            label={texts.cards.catware}
            revealed={shown}
            className="w-16 sm:w-20"
          />
          <span className="max-w-24 truncate font-ui text-sm font-bold text-cream">
            {shown
              ? findPartyPlayer(party, party.holder).name
              : texts.cards.back}
          </span>
        </span>
      </PartyTable>
      <PhasePanel texts={texts} game={game} party={party} drawn={shown} />
    </GameFrame>
  );
}
