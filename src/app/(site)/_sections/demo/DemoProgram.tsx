"use client";

import { ArrowUp, Play, RotateCcw, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BlockChip } from "@/_components/puzzle/block/BlockChip";
import type { Block } from "@/lib/blocks";
import type { DemoTexts } from "./types";
import { maxBlocks, type DemoState } from "./useDemo";

type DemoProgramProps = {
  texts: DemoTexts["program"];
  program: Block[];
  activeId: string | null;
  state: DemoState;
  onAdd: () => void;
  onRun: () => void;
  onClear: () => void;
};

const control =
  "toon pressable flex min-h-14 items-center justify-center gap-2 rounded-full px-5 font-ui text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50";

export function DemoProgram({
  texts,
  program,
  activeId,
  state,
  onAdd,
  onRun,
  onClear,
}: DemoProgramProps) {
  const running = state === "running";
  const failed = state === "short" || state === "far";

  return (
    <div className="toon flex flex-col overflow-hidden rounded-[30px] bg-paper">
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink bg-sun px-5 py-3">
        <h3 className="font-ui text-xl font-bold">{texts.title}</h3>
        <button
          type="button"
          onClick={onClear}
          disabled={running}
          className={`${control} min-h-11 bg-paper px-4 text-base`}
        >
          <Trash2 size={18} strokeWidth={2.5} aria-hidden="true" />
          {texts.clear}
        </button>
      </div>
      <div className="flex min-h-64 flex-1 flex-col gap-2 p-5">
        <BlockChip kind="start" label={texts.start} />
        <ol className="ml-5 flex flex-col gap-2 border-l-4 border-dashed border-ink/25 pl-3">
          <AnimatePresence initial={false}>
            {program.map((block) => (
              <motion.li
                key={block.id}
                initial={{ scale: 0.5, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
              >
                <BlockChip
                  kind="forward"
                  label={texts.forward}
                  active={activeId === block.id}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
      <div className="flex flex-wrap gap-3 border-t-[3px] border-ink p-4">
        <button
          type="button"
          onClick={onAdd}
          disabled={running || program.length >= maxBlocks}
          className={`${control} bg-sky`}
        >
          <ArrowUp size={20} strokeWidth={3} aria-hidden="true" />
          {texts.add}
        </button>
        <button
          type="button"
          onClick={onRun}
          disabled={running || program.length === 0}
          className={`${control} flex-1 bg-slime`}
        >
          {failed ? (
            <RotateCcw size={20} strokeWidth={3} aria-hidden="true" />
          ) : (
            <Play
              size={20}
              strokeWidth={3}
              fill="currentColor"
              aria-hidden="true"
            />
          )}
          {texts.run}
        </button>
      </div>
    </div>
  );
}
