"use client";

import { Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { BlockChip } from "@/_components/puzzle/block/BlockChip";
import { useDismiss } from "@/hooks/useDismiss";
import type { Course } from "@/lib/courses";
import { playClickSound } from "@/lib/sound";
import { MiniMap } from "./MiniMap";
import type { HubTexts } from "./types";

export function CoursePreview({
  course,
  texts,
}: {
  course: Course;
  texts: HubTexts;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const level = course.levels[course.preview];
  const name = `${texts.level} ${course.preview + 1}: ${level.title}`;
  useDismiss(open, () => setOpen(false), { box });

  return (
    <div ref={box} className="relative">
      <div className="scene relative h-52 overflow-hidden rounded-2xl border-[3px] border-ink">
        <MiniMap level={level} label={`${texts.preview} ${name}`} />
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={texts.info}
        title={texts.info}
        onClick={() => {
          playClickSound();
          setOpen((value) => !value);
        }}
        className={`toon pressable absolute right-2 bottom-2 z-10 grid size-9 place-items-center rounded-full ${course.color}`}
      >
        {open ? (
          <X size={18} strokeWidth={3} aria-hidden="true" />
        ) : (
          <Info size={20} strokeWidth={3} aria-hidden="true" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="toon absolute inset-x-2 bottom-13 z-20 rounded-2xl bg-paper p-3"
          >
            <p className="font-ui text-sm font-bold">{texts.newBlocks}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {course.newBlocks.map((type) => (
                <li key={type}>
                  <BlockChip kind={type} label={texts.blocks[type]} />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
