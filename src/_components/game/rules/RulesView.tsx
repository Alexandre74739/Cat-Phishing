"use client";

import { ChevronLeft, FastForward } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/_components/ui/Button";
import { playClickSound } from "@/lib/sound";
import type { PartyTexts } from "../types";
import { RuleSlideView } from "./RuleSlideView";
import { StepBar } from "./StepBar";

type RulesViewProps = {
  texts: PartyTexts["rules"];
  inGame: boolean;
  onClose: () => void;
};

export function RulesView({ texts, inGame, onClose }: RulesViewProps) {
  const [[index, direction], setPage] = useState([0, 1]);
  const total = texts.slides.length;
  const last = index === total - 1;
  const goTo = (next: number) => setPage([next, next > index ? 1 : -1]);
  const clickTo = (next: number) => {
    playClickSound();
    goTo(next);
  };

  return (
    <section
      aria-labelledby="rules-title"
      className="mx-auto flex h-full w-full max-w-2xl flex-col gap-3"
    >
      <div className="flex shrink-0 items-center justify-between gap-3">
        <h1
          id="rules-title"
          className="font-display text-3xl tracking-wide sm:text-5xl"
        >
          {texts.title}
        </h1>
        {!last && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="toon pressable flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-orange px-4 font-ui text-lg font-semibold"
          >
            {inGame ? texts.resume : texts.skip}
            <FastForward size={20} strokeWidth={2.75} aria-hidden="true" />
          </button>
        )}
      </div>
      <StepBar
        titles={texts.slides.map(({ title }) => title)}
        current={index}
        label={texts.step}
        onPick={clickTo}
      />
      <div className="toon scroll-soft min-h-0 flex-1 overflow-x-hidden overflow-y-auto rounded-4xl bg-cream p-5 sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <RuleSlideView slide={texts.slides[index]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={() => clickTo(index - 1)}
          disabled={index === 0}
          aria-label={texts.prev}
          className="toon pressable grid size-14 shrink-0 place-items-center rounded-full bg-paper disabled:opacity-40"
        >
          <ChevronLeft size={28} strokeWidth={3} aria-hidden="true" />
        </button>
        <Button
          variant={last ? "orange" : "grape"}
          icon="next"
          iconSide="end"
          fullWidth
          onClick={() => (last ? onClose() : goTo(index + 1))}
        >
          {last ? (inGame ? texts.resume : texts.start) : texts.next}
        </Button>
      </div>
    </section>
  );
}
