"use client";

import { Bug } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useEffectEvent, useRef } from "react";
import { Avatar } from "@/_components/ui/Avatar";
import { CloseButton } from "@/_components/ui/CloseButton";
import { useDismiss } from "@/hooks/useDismiss";
import { fillText } from "@/lib/fillText";
import type { PartyPlayer } from "@/lib/party";
import { playSound } from "@/lib/sound";
import { GameCard } from "../cards/GameCard";
import type { PartyTexts } from "../types";

const revealMs = 7000;

type CatwareRevealProps = {
  texts: PartyTexts["draw"];
  close: string;
  holder: PartyPlayer;
  onDone: () => void;
};

export function CatwareReveal({
  texts,
  close,
  holder,
  onDone,
}: CatwareRevealProps) {
  const reduceMotion = useReducedMotion();
  const title = fillText(texts.holder, { name: holder.name });
  const box = useRef<HTMLDivElement>(null);
  const finish = useEffectEvent(onDone);
  useDismiss(true, onDone, { box });

  useEffect(() => {
    playSound("zap");
    const timer = window.setTimeout(() => finish(), revealMs);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="scanlines fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4">
      <motion.div
        ref={box}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="catware-alert"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="glitch-box toon relative flex w-full max-w-md flex-col gap-4 overflow-hidden rounded-3xl bg-virus-deep p-5 text-cream"
      >
        <div className="flex items-center gap-3">
          <GameCard
            card="cat-ware"
            sizes="56px"
            className="glitch-box w-14 shrink-0 -rotate-6"
          />
          <h2
            id="catware-alert"
            data-text={texts.alert}
            className="glitch min-w-0 flex-1 font-display text-3xl tracking-wide text-virus-light uppercase"
          >
            {texts.alert}
          </h2>
          <CloseButton label={close} onClick={onDone} tone="virus" autoFocus />
        </div>
        <div className="flex items-center gap-3">
          <span className="relative grid size-16 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-cream shadow-pop">
            <Avatar id={holder.avatar} size={42} />
            <span className="absolute -right-2 -bottom-1 grid size-8 place-items-center rounded-lg border-[3px] border-ink bg-virus text-cream">
              <Bug size={17} strokeWidth={3} aria-hidden="true" />
            </span>
          </span>
          <div className="min-w-0">
            <p
              data-text={title}
              className="glitch font-display text-2xl leading-tight tracking-wide break-words text-virus-light"
            >
              {title}
            </p>
            <p className="font-semibold text-cream/85">{texts.holderHint}</p>
          </div>
        </div>
        <span
          aria-hidden="true"
          style={{ animationDuration: `${revealMs}ms` }}
          className="drain absolute inset-x-0 bottom-0 h-1.5 bg-virus-light"
        />
      </motion.div>
    </div>
  );
}
