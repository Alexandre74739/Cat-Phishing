"use client";

import { Plus } from "lucide-react";
import { Button } from "@/_components/ui/Button";
import { usePlayers } from "@/hooks/usePlayers";
import type { PlayerTexts } from "@/lib/playerTexts";
import { playClickSound } from "@/lib/sound";
import { PlayerCard, tile } from "./PlayerCard";
import { ViewTitle } from "./ViewTitle";

type PlayersViewProps = {
  texts: PlayerTexts;
  onOpen: (id: string) => void;
  onNew: () => void;
  onLogin: () => void;
};

export function PlayersView({
  texts,
  onOpen,
  onNew,
  onLogin,
}: PlayersViewProps) {
  const { players, active } = usePlayers();

  return (
    <>
      <ViewTitle>{texts.players.title}</ViewTitle>
      <p className="mt-1 font-semibold text-ink-soft">{texts.players.hint}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4">
        {players.map((player) => (
          <li key={player.id}>
            <PlayerCard
              player={player}
              isActive={player.id === active.id}
              playingLabel={texts.player.playing}
              onOpen={() => {
                playClickSound();
                onOpen(player.id);
              }}
            />
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onNew();
            }}
            className={`${tile} pressable border-[3px] border-dashed border-ink/40 bg-orange-soft hover:border-ink`}
          >
            <span className="toon grid size-12 place-items-center rounded-full bg-orange">
              <Plus size={28} strokeWidth={3} aria-hidden="true" />
            </span>
            {texts.players.newPlayer}
          </button>
        </li>
      </ul>
      <div className="mt-6 border-t-[3px] border-dashed border-ink/20 pt-5">
        <Button
          variant="grape"
          size="sm"
          icon="login"
          fullWidth
          onClick={onLogin}
        >
          {texts.players.login}
        </Button>
      </div>
    </>
  );
}
