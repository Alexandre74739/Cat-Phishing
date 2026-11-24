"use client";

import { usePlayers } from "@/hooks/usePlayers";
import {
  addPlayer,
  defaultPlayer,
  switchPlayer,
  updatePlayer,
} from "@/lib/players";
import type { PlayerTexts } from "@/lib/playerTexts";
import { AccountForm } from "./AccountForm";
import { PlayerForm } from "./PlayerForm";
import { PlayersView } from "./PlayersView";
import { PlayerView } from "./PlayerView";
import { RemoveView } from "./RemoveView";
import type { PlayerScreen } from "./types";

type PlayerDialogViewProps = {
  texts: PlayerTexts;
  screen: PlayerScreen;
  go: (screen: PlayerScreen) => void;
};

export function PlayerDialogView({ texts, screen, go }: PlayerDialogViewProps) {
  const { players, active } = usePlayers();
  const home = () => go({ name: "players" });
  const player =
    "id" in screen ? players.find(({ id }) => id === screen.id) : undefined;

  if (player && screen.name === "edit")
    return (
      <PlayerForm
        texts={texts.form}
        title={texts.form.editTitle}
        submit={texts.form.save}
        initial={player}
        onSubmit={(name, avatar) => {
          updatePlayer(player.id, { name, avatar });
          go({ name: "player", id: player.id });
        }}
      />
    );

  if (player && screen.name === "remove")
    return (
      <RemoveView
        texts={texts}
        player={player}
        onCancel={() => go({ name: "player", id: player.id })}
        onDone={home}
      />
    );

  if (player && screen.name === "player")
    return (
      <PlayerView
        texts={texts}
        player={player}
        onEdit={() => go({ name: "edit", id: player.id })}
        onRemove={() => go({ name: "remove", id: player.id })}
        onSaveOnline={() => go({ name: "account", mode: "create" })}
      />
    );

  if (screen.name === "new")
    return (
      <PlayerForm
        texts={texts.form}
        title={texts.form.newTitle}
        submit={texts.form.create}
        initial={{ name: "", avatar: defaultPlayer.avatar }}
        onSubmit={(name, avatar) => {
          const created = addPlayer(name, avatar);
          switchPlayer(created.id);
          go({ name: "player", id: created.id });
        }}
      />
    );

  if (screen.name === "account")
    return (
      <AccountForm
        texts={texts.account}
        mode={screen.mode}
        initialPseudo={screen.mode === "create" ? active.name : ""}
        onDone={() =>
          go(
            screen.mode === "create"
              ? { name: "player", id: active.id }
              : { name: "players" },
          )
        }
      />
    );

  return (
    <PlayersView
      texts={texts}
      onOpen={(id) => go({ name: "player", id })}
      onNew={() => go({ name: "new" })}
      onLogin={() => go({ name: "account", mode: "login" })}
    />
  );
}
