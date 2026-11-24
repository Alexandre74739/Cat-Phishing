"use client";

import { useState } from "react";
import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { removePlayer } from "@/lib/playerAccounts";
import type { Player } from "@/lib/players";
import type { PlayerTexts } from "@/lib/playerTexts";
import { errorText } from "./accountError";
import { ViewTitle } from "./ViewTitle";

type RemoveViewProps = {
  texts: PlayerTexts;
  player: Player;
  onCancel: () => void;
  onDone: () => void;
};

export function RemoveView({
  texts,
  player,
  onCancel,
  onDone,
}: RemoveViewProps) {
  const [isEverywhere, setIsEverywhere] = useState(false);
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const remove = async () => {
    setIsBusy(true);
    setError("");
    try {
      await removePlayer(player.id, isEverywhere);
      onDone();
    } catch (failure) {
      setError(errorText(texts.account, failure));
      setIsBusy(false);
    }
  };

  return (
    <>
      <ViewTitle>
        {fillText(texts.remove.title, { name: player.name })}
      </ViewTitle>
      <p className="mt-2 text-lg font-semibold">{texts.remove.text}</p>
      {player.cloud && (
        <label className="toon mt-5 flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl bg-orange-soft px-4 py-2 text-left font-ui text-lg font-semibold">
          <input
            type="checkbox"
            checked={isEverywhere}
            onChange={(event) => setIsEverywhere(event.target.checked)}
            className="size-6 shrink-0 accent-grape"
          />
          {texts.remove.everywhere}
        </label>
      )}
      <p
        role="alert"
        className="mt-2 min-h-6 font-ui font-semibold text-lava-dark"
      >
        {error}
      </p>
      <div className="mt-2 grid gap-3">
        <Button
          variant="coral"
          fullWidth
          icon="remove"
          disabled={isBusy}
          onClick={() => void remove()}
        >
          {texts.remove.device}
        </Button>
        <Button variant="paper" fullWidth onClick={onCancel}>
          {texts.remove.cancel}
        </Button>
      </div>
    </>
  );
}
