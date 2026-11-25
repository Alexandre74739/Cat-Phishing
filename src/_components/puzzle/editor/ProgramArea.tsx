"use client";

import { ArrowLeft, Blocks, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { countBlocks, rootList, type Block } from "@/lib/blocks";
import { BlockChip } from "../block/BlockChip";
import { EditableBlock, type EditableShared } from "./EditableBlock";

type ProgramAreaProps = EditableShared & {
  program: Block[];
  optimal?: number;
  onClear: () => void;
  onRun: () => void;
};

const tool =
  "toon flex items-center gap-1 rounded-full bg-paper px-3 py-0.5 font-ui text-sm font-bold whitespace-nowrap";

export function ProgramArea({
  program,
  optimal,
  onClear,
  onRun,
  ...shared
}: ProgramAreaProps) {
  const { texts, disabled } = shared;
  const score = texts.score.replace("{optimal}", String(optimal));

  return (
    <section
      aria-label={texts.programTitle}
      className="toon flex min-h-85 min-w-0 flex-1 flex-col overflow-hidden rounded-3xl bg-paper md:min-h-0"
    >
      <div className="flex items-center gap-2 border-b-[3px] border-ink bg-orange px-4 py-1.5">
        <h2 className="font-ui text-lg font-bold whitespace-nowrap">
          {texts.programTitle}
        </h2>
        <div className="ml-auto flex items-center gap-2">
          {optimal !== undefined && (
            <p className={tool} title={score}>
              <Blocks size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="sr-only">{score}</span>
              {countBlocks(program)} / {optimal}
              <Star
                size={16}
                strokeWidth={2.5}
                className="fill-orange"
                aria-hidden="true"
              />
            </p>
          )}
          <button
            type="button"
            onClick={onClear}
            disabled={disabled || program.length === 0}
            className={`${tool} pressable disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <Trash2 size={15} strokeWidth={2.5} aria-hidden="true" />
            {texts.clear}
          </button>
        </div>
      </div>
      <div className="dots scroll-soft relative flex min-h-0 flex-1 flex-col overflow-auto p-4">
        <BlockChip
          kind="start"
          label={texts.start}
          disabled={disabled}
          onClick={onRun}
        />
        <div
          data-list={rootList}
          className="relative mt-1.5 ml-5 flex flex-1 flex-col gap-1.5 border-l-4 border-dashed border-ink/25 pb-24 pl-3"
        >
          {program.map((block) => (
            <EditableBlock key={block.id} {...shared} block={block} />
          ))}
          {program.length === 0 && !shared.dragging && (
            <p className="pointer-events-none mt-3 flex items-center gap-3 font-ui text-xl font-semibold text-ink">
              <motion.span
                aria-hidden="true"
                animate={{ x: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-orange text-ink"
              >
                <ArrowLeft size={24} strokeWidth={3} />
              </motion.span>
              {texts.emptyHint}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
