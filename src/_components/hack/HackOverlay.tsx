"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { usePlayers } from "@/hooks/usePlayers";
import { useShowAdmin } from "@/hooks/useShowAdmin";
import { useShowSignal } from "@/hooks/useShowSignal";
import {
  getHackPass,
  getServerHackPass,
  startHackTraining,
} from "@/lib/hackPassStore";
import type { HackTexts } from "@/lib/hackTexts";
import { subscribeStores } from "@/lib/localStore";
import { routes } from "@/lib/navigation";
import { CodeRain } from "./CodeRain";
import { GlitchStorm } from "./GlitchStorm";
import { HackTerminal } from "./HackTerminal";
import { TalkingCat } from "./TalkingCat";
import { useHackEffects } from "./useHackEffects";
import { useHackStage } from "./useHackStage";

// Presentation effect driven from /backstage: every phone polls the show state, the admin account is never hacked.
export function HackOverlay({ texts }: { texts: HackTexts }) {
  const pathname = usePathname();
  const signal = useShowSignal(!pathname.startsWith(routes.backstage));
  const stage = useHackStage(signal);
  const { active } = usePlayers();
  const isAdmin = useShowAdmin(
    signal && signal.phase !== "off" ? active.cloud : undefined,
  );
  const pass = useSyncExternalStore(
    subscribeStores,
    getHackPass,
    getServerHackPass,
  );
  const hasPass = !!signal && pass?.runId === signal.runId;
  const isFree =
    hasPass && (pass.isTrained || pathname.startsWith(routes.code));
  const isActive = !!signal && stage !== "idle" && !isFree && !isAdmin;
  useHackEffects(stage, isActive);

  if (!isActive) return null;

  return (
    <div
      data-hack-overlay=""
      role="alertdialog"
      aria-modal="true"
      aria-label={texts.alert}
      className={`fixed inset-0 z-100 overflow-hidden ${stage === "glitch" ? "scanlines" : "bg-void"}`}
    >
      {stage === "glitch" && <GlitchStorm alert={texts.alert} />}
      {stage === "cut" && (
        <span className="crt-off absolute inset-0 bg-cream" />
      )}
      {stage === "matrix" && <CodeRain words={texts.rain} />}
      {stage === "terminal" && <HackTerminal texts={texts.terminal} />}
      {stage === "talk" && (
        <TalkingCat
          texts={texts.cat}
          isReturning={hasPass}
          onLeave={() => startHackTraining(signal.runId)}
        />
      )}
    </div>
  );
}
