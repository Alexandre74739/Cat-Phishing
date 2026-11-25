"use client";

import { useState } from "react";
import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import {
  maxPartyPlayers,
  minPartyPlayers,
  type PartyPlayer,
} from "@/lib/party";
import { AddPlayerDialog } from "./AddPlayerDialog";
import { CardBack } from "./cards/CardBack";
import { GameFrame } from "./frame/GameFrame";
import { RosterList } from "./RosterList";
import { PlayersNeeded } from "./PlayersNeeded";
import { PartyTable } from "./table/PartyTable";
import type { PartyTexts } from "./types";

type SetupViewProps = {
  texts: PartyTexts;
  roster: PartyPlayer[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onStart: () => void;
  onRules: () => void;
};

export function SetupView({
  texts,
  roster,
  onAdd,
  onRemove,
  onStart,
  onRules,
}: SetupViewProps) {
  const { setup } = texts;
  const [adding, setAdding] = useState(false);
  const ready = roster.length >= minPartyPlayers;
  const count = { count: roster.length };

  return (
    <GameFrame
      toolbar={
        <h1 className="font-display text-2xl tracking-wide sm:text-4xl">
          {setup.title}
        </h1>
      }
      side={{ ...texts.side, open: fillText(texts.side.open, count) }}
      players={
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-ink-soft">{setup.seats}</p>
          {roster.length ? (
            <RosterList
              roster={roster}
              removeLabel={setup.remove}
              onRemove={onRemove}
            />
          ) : (
            <p className="font-ui font-bold">{setup.empty}</p>
          )}
        </div>
      }
    >
      <PartyTable
        players={roster}
        texts={texts.table}
        seats={maxPartyPlayers}
        onEmptySeat={() => setAdding(true)}
      >
        <span className="flex flex-col items-center gap-1">
          <span className="h-16 w-[2.7rem] -rotate-6 overflow-hidden rounded-lg border-[3px] border-ink shadow-pop">
            <CardBack />
          </span>
          <span className="font-display text-lg tracking-wide text-paper">
            {roster.length}/{maxPartyPlayers}
          </span>
        </span>
      </PartyTable>
      <div className="mx-auto flex w-full max-w-md shrink-0 gap-3">
        <Button variant="paper" icon="rules" onClick={onRules}>
          <span className="sr-only">{setup.rules}</span>
        </Button>
        {ready ? (
          <Button variant="orange" icon="play" fullWidth onClick={onStart}>
            {setup.start}
          </Button>
        ) : (
          <PlayersNeeded
            have={roster.length}
            need={minPartyPlayers}
            text={setup.needMore}
          />
        )}
      </div>
      {adding && (
        <AddPlayerDialog
          texts={setup}
          seat={roster.length + 1}
          onAdd={onAdd}
          onClose={() => setAdding(false)}
        />
      )}
    </GameFrame>
  );
}
