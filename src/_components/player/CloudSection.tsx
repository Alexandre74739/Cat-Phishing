"use client";

import { Cloud } from "lucide-react";
import { Button } from "@/_components/ui/Button";
import { useSyncStatus } from "@/hooks/useSyncStatus";
import { syncNow } from "@/lib/cloudSync";
import { fillText } from "@/lib/fillText";
import { logoutAccount } from "@/lib/playerAccounts";
import type { Player } from "@/lib/players";
import type { PlayerTexts } from "@/lib/playerTexts";

type CloudSectionProps = {
  texts: PlayerTexts["cloud"];
  player: Player;
  onStart: () => void;
};

export function CloudSection({ texts, player, onStart }: CloudSectionProps) {
  const status = useSyncStatus();
  const { cloud } = player;

  return (
    <section
      aria-labelledby="cloud-title"
      className="toon dots mt-6 rounded-3xl bg-sky-soft p-4 text-left sm:p-5"
    >
      <h3
        id="cloud-title"
        className="flex items-center gap-3 font-ui text-xl font-bold"
      >
        <span className="toon grid size-10 shrink-0 -rotate-6 place-items-center rounded-xl bg-sky">
          <Cloud size={22} strokeWidth={2.5} aria-hidden="true" />
        </span>
        {texts.title}
      </h3>
      {cloud ? (
        <>
          <p className="mt-2 font-semibold">
            {fillText(texts.account, { pseudo: cloud.pseudo })}{" "}
            <span aria-live="polite">{texts.status[status]}</span>
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button
              variant="sky"
              size="sm"
              icon="sync"
              fullWidth
              disabled={status === "syncing"}
              onClick={() => void syncNow()}
            >
              {texts.sync}
            </Button>
            <Button
              variant="paper"
              size="sm"
              icon="logout"
              fullWidth
              onClick={() => void logoutAccount(player.id)}
            >
              {texts.logout}
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-2 font-semibold">{texts.intro}</p>
          <Button
            variant="sky"
            size="sm"
            icon="upload"
            fullWidth
            onClick={onStart}
            className="mt-4"
          >
            {texts.start}
          </Button>
        </>
      )}
    </section>
  );
}
