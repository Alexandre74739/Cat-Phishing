"use client";

import { Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CatFace, type CatMood } from "@/_components/cat/CatFace";
import type { Course, Level } from "@/lib/courses";
import { speak } from "@/lib/speech";
import type { LevelTexts } from "./types";

type StoryBubbleProps = {
  course: Course;
  level: Level;
  number: number;
  message: string;
  mood: CatMood;
  texts: LevelTexts["story"];
  difficulty: string;
};

export function StoryBubble(props: StoryBubbleProps) {
  const { course, level, number, message, mood, texts } = props;

  return (
    <div className="flex items-start gap-2">
      <motion.span
        key={message}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 0.35 }}
        className="shrink-0"
      >
        <CatFace mood={mood} size={64} />
      </motion.span>
      <div className="toon relative min-h-19 flex-1 rounded-3xl bg-paper px-4 py-2.5">
        <span
          aria-hidden="true"
          className="absolute top-6 -left-2.75 size-4 rotate-45 border-b-[3px] border-l-[3px] border-ink bg-paper"
        />
        <h1 className="mb-0.5 pr-10 font-ui text-sm font-bold text-grape">
          {course.title} · {number}. {level.title}{" "}
          <span className="ml-1 rounded-full bg-lilac px-2 py-0.5 text-xs text-ink">
            {level.concept}
          </span>{" "}
          <span
            className={`rounded-full px-2 py-0.5 text-xs text-ink ${course.color}`}
          >
            {props.difficulty}
          </span>
        </h1>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={message}
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="pr-10 text-[15px] leading-snug font-bold"
          >
            {message}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          aria-label={texts.listen}
          title={texts.listen}
          onClick={() => speak(message)}
          className="toon pressable absolute top-2 right-2 grid size-9 place-items-center rounded-full bg-sky text-ink"
        >
          <Volume2 size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
