"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqEntryProps = {
  item: FaqItem;
  id: string;
  open: boolean;
  onToggle: () => void;
};

export function FaqEntry({
  item: { question, answer },
  id,
  open,
  onToggle,
}: FaqEntryProps) {
  const reduceMotion = useReducedMotion();
  const slide = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="toon rounded-3xl bg-paper text-ink">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left font-ui text-lg font-semibold sm:px-6"
        >
          {question}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={slide}
            className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper"
          >
            <Plus size={20} strokeWidth={3} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-answer`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={slide}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-lg font-semibold sm:px-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
