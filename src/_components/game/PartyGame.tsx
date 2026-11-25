"use client";

import { PlayView } from "./play/PlayView";
import { RulesView } from "./rules/RulesView";
import { SetupView } from "./SetupView";
import type { PartyTexts } from "./types";
import { useParty, type PartyState } from "./useParty";

function PartyScreen({ texts, game }: { texts: PartyTexts; game: PartyState }) {
  const { party } = game;

  if (game.screen === "rules")
    return (
      <RulesView
        texts={texts.rules}
        inGame={game.inGame}
        onClose={game.closeRules}
      />
    );

  if (game.screen === "setup" || !party)
    return (
      <SetupView
        texts={texts}
        roster={game.roster}
        onAdd={game.addPlayer}
        onRemove={game.removePlayer}
        onStart={game.start}
        onRules={game.showRules}
      />
    );

  return <PlayView key={game.round} texts={texts} game={game} party={party} />;
}

export function PartyGame({ texts }: { texts: PartyTexts }) {
  const game = useParty();

  return (
    <main className="dots flex h-svh min-h-[34rem] flex-col px-4 pt-23 pb-12">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
        <PartyScreen texts={texts} game={game} />
      </div>
    </main>
  );
}
