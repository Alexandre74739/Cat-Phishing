"use client";

import { AnimatePresence, motion } from "motion/react";
import { WinDialog } from "@/_components/puzzle/WinDialog";
import { DemoProgram } from "./demo/DemoProgram";
import { DemoStage } from "./demo/DemoStage";
import type { DemoTexts } from "./demo/types";
import { useDemo } from "./demo/useDemo";

type DemoProps = {
  id: string;
  title: string;
  intro: string;
  texts: DemoTexts;
};

export function Demo({ id, title, intro, texts }: DemoProps) {
  const demo = useDemo();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-lg font-semibold text-ink">
            {intro}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]"
        >
          <DemoStage
            texts={texts}
            world={demo.world}
            event={demo.event}
            state={demo.state}
            hasBlocks={demo.program.length > 0}
          />
          <DemoProgram
            texts={texts.program}
            program={demo.program}
            activeId={demo.activeId}
            state={demo.state}
            onAdd={demo.add}
            onRun={demo.run}
            onClear={demo.clear}
          />
        </motion.div>
      </div>
      <AnimatePresence>
        {demo.won && (
          <WinDialog
            texts={texts.win}
            stars={3}
            next={texts.win.next}
            onClose={demo.closeWin}
            onReplay={demo.replay}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
