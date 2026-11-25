"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/_components/ui/Button";
import { usePlayers } from "@/hooks/usePlayers";
import type { ShowPhase, ShowState } from "@/lib/hackShow";
import { postShow, type ShowStatus } from "@/lib/showAdmin";

export type BackstageTexts = {
  title: string;
  locked: string;
  error: string;
  phases: Record<ShowPhase, string>;
  hack: string;
  talk: string;
  restore: string;
  back: { label: string; href: string };
};

export function Backstage({ texts }: { texts: BackstageTexts }) {
  const { active } = usePlayers();
  const cloud = active.cloud;
  const [state, setState] = useState<ShowState | null>(null);
  const [status, setStatus] = useState<ShowStatus>("loading");

  const send = useCallback(
    (phase?: ShowPhase) => {
      if (!cloud) return;
      void postShow(cloud, phase).then((result) => {
        setStatus(result.status);
        if (result.state) setState(result.state);
      });
    },
    [cloud],
  );

  useEffect(() => send(), [send]);

  const isLocked = !cloud || status === "locked";
  const phase = state?.phase ?? "off";

  return (
    <main className="grid min-h-svh place-items-center bg-ink p-5 text-cream">
      <section className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="font-display text-4xl tracking-wide">{texts.title}</h1>
        {isLocked ? (
          <p className="text-lg font-semibold">{texts.locked}</p>
        ) : (
          <>
            <p
              aria-live="polite"
              className="font-mono text-xl font-bold text-terminal"
            >
              {status === "error" ? texts.error : texts.phases[phase]}
            </p>
            <Button
              variant="coral"
              icon="nope"
              fullWidth
              onClick={() => send("hack")}
            >
              {texts.hack}
            </Button>
            <Button
              variant="grape"
              icon="cat"
              fullWidth
              disabled={phase !== "hack"}
              onClick={() => send("talk")}
            >
              {texts.talk}
            </Button>
            <Button
              variant="mint"
              icon="sync"
              fullWidth
              disabled={phase === "off"}
              onClick={() => send("off")}
            >
              {texts.restore}
            </Button>
          </>
        )}
        <Button href={texts.back.href} variant="paper" icon="home" fullWidth>
          {texts.back.label}
        </Button>
      </section>
    </main>
  );
}
