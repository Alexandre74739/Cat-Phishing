"use client";

import { AnimatePresence } from "motion/react";
import { WinDialog } from "@/_components/puzzle/WinDialog";
import { WorldView } from "@/_components/puzzle/WorldView";
import { ProgramEditor } from "@/_components/puzzle/editor/ProgramEditor";
import { courses } from "@/lib/courses";
import { LevelHeader } from "./LevelHeader";
import { RunControls } from "./RunControls";
import { StoryBubble } from "./StoryBubble";
import type { LevelTexts } from "./types";
import { useLevelGame } from "./useLevelGame";
import { helpLine } from "./helpLine";
import { winLink } from "./winLink";

type LevelGameProps = {
  courseIndex: number;
  number: number;
  texts: LevelTexts;
};

export function LevelGame({ courseIndex, number, texts }: LevelGameProps) {
  const course = courses[courseIndex];
  const game = useLevelGame(course, number);
  const { outcome, level, win } = game;
  const message = game.running
    ? texts.messages.running
    : !outcome
      ? level.goal
      : outcome.ok
        ? texts.messages.win
        : `${texts.messages[outcome.reason]} ${helpLine(outcome.reason, game.fails, level.tip, texts.help)}`;
  const mood = game.running
    ? "think"
    : !outcome
      ? "happy"
      : outcome.ok
        ? "wow"
        : "sad";

  return (
    <div className="flex min-h-dvh flex-col bg-cream lg:h-dvh lg:min-h-155 lg:overflow-hidden">
      <LevelHeader course={course} current={number} texts={texts.nav} />
      <main className="flex min-h-0 flex-1 flex-col gap-3 p-3 lg:flex-row">
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[min(40vw,560px)]">
          <StoryBubble
            course={course}
            level={level}
            number={number}
            message={message}
            mood={mood}
            texts={texts.story}
            difficulty={texts.difficulty[course.difficulty - 1]}
          />
          <WorldView
            world={game.world}
            event={game.event}
            texts={texts.world}
            shake={game.shake}
            className="aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:min-h-0 lg:flex-1"
          />
          <RunControls texts={texts.controls} game={game} />
        </div>
        <ProgramEditor
          program={game.program}
          palette={level.blocks}
          texts={texts.editor}
          activeId={game.activeId}
          disabled={game.running}
          optimal={level.optimal}
          onChange={game.edit}
        />
      </main>
      <AnimatePresence>
        {win && (
          <WinDialog
            texts={texts.win}
            stars={win.stars}
            detail={
              win.used < level.optimal
                ? texts.win.beatCatchat
                : win.stars === 3
                  ? texts.win.perfect
                  : texts.win.improve
                      .replace("{optimal}", String(level.optimal))
                      .replace("{used}", String(win.used))
            }
            badges={{ label: texts.win.newBadge, names: win.badges }}
            next={winLink(courseIndex, number, texts.win)}
            onClose={game.closeWin}
            onReplay={game.replay}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
