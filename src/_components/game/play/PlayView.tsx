"use client";

import { BookOpen, RotateCcw } from "lucide-react";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import { playClickSound } from "@/lib/sound";
import { GameFrame } from "../frame/GameFrame";
import { PlayerStatusList } from "../frame/PlayerStatusList";
import { PartyTable } from "../table/PartyTable";
import type { PartyTexts } from "../types";
import { selectableIds, type PartyState } from "../useParty";
import { CenterCard } from "./CenterCard";
import { PhasePanel } from "./PhasePanel";
import { useRoulette } from "./useRoulette";

const toolButton =
  "toon pressable flex min-h-12 items-center gap-2 rounded-full bg-paper px-4 font-ui font-semibold";

const withClick = (action: () => void) => () => {
  playClickSound();
  action();
};

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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={withClick(game.showRules)}
            className={toolButton}
          >
            <BookOpen size={20} strokeWidth={2.75} aria-hidden="true" />
            {texts.toolbar.rules}
          </button>
          <button
            type="button"
            onClick={withClick(game.showSetup)}
            className={toolButton}
          >
            <RotateCcw size={20} strokeWidth={2.75} aria-hidden="true" />
            {texts.toolbar.newGame}
          </button>
        </div>
      }
      side={{
        ...texts.side,
        open: fillText(texts.side.open, { count: party.players.length }),
      }}
      players={
        <PlayerStatusList party={party} texts={texts.table} revealed={shown} />
      }
    >
      <PartyTable
        players={party.players}
        texts={texts.table}
        holder={shown ? party.holder : undefined}
        spotlight={roulette.spotlight}
        selectable={selectableIds(party, game.phase)}
        onSelect={game.pickPlayer}
      >
        <CenterCard
          texts={texts.cards}
          holder={findPartyPlayer(party, party.holder)}
          revealed={shown}
        />
      </PartyTable>
      <PhasePanel texts={texts} game={game} party={party} drawn={shown} />
    </GameFrame>
  );
}
