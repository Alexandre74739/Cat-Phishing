"use client";

import { useMemo, useState } from "react";
import { useProgramRunner } from "@/hooks/useProgramRunner";
import { earnedBadges } from "@/lib/badges";
import { countBlocks, type Block } from "@/lib/blocks";
import { levelKey, type Course } from "@/lib/courses";
import { buildWorld } from "@/lib/levels";
import { markHackTrained } from "@/lib/hackPassStore";
import { getStars, recordKey, saveStars } from "@/lib/progress";
import { starsFor, type Outcome } from "@/lib/runtime";
import { playSound } from "@/lib/sound";
import { newPiece } from "@/lib/treasureMap";

type Win = {
  stars: number;
  used: number;
  badges: string[];
  piece?: string;
};

export function useLevelGame(course: Course, number: number) {
  const level = course.levels[number - 1];
  const initialWorld = useMemo(() => buildWorld(level), [level]);
  const [fast, setFast] = useState(false);
  const runner = useProgramRunner(initialWorld, fast);
  const [program, setProgram] = useState<Block[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [win, setWin] = useState<Win | null>(null);
  const [shake, setShake] = useState(0);
  const [fails, setFails] = useState(0);

  const finish = (result: Outcome) => {
    setOutcome(result);
    if (!result.ok) {
      setShake((count) => count + 1);
      setFails((count) => count + 1);
      return;
    }
    markHackTrained();
    const used = countBlocks(program);
    const stars = starsFor(used, level.optimal);
    const starsBefore = getStars();
    const before = earnedBadges(starsBefore).map((badge) => badge.id);
    const key = levelKey(course.slug, number);
    saveStars(key, stars);
    if (used < level.optimal) saveStars(recordKey(key), 1);
    const badges = earnedBadges(getStars())
      .filter((badge) => !before.includes(badge.id))
      .map((badge) => badge.name);
    const piece = newPiece(starsBefore, getStars());
    setTimeout(() => setWin({ stars, used, badges, piece }), 700);
  };

  const reset = () => {
    runner.reset();
    setOutcome(null);
  };

  return {
    level,
    program,
    world: runner.world,
    event: runner.event,
    activeId: runner.activeId,
    running: runner.running,
    outcome,
    win,
    shake,
    fails,
    fast,
    toggleFast: () => setFast((value) => !value),
    edit: (next: Block[]) => {
      reset();
      setProgram(next);
    },
    run: () => {
      if (runner.running) return;
      if (program.length === 0) {
        setOutcome({ ok: false, reason: "empty" });
        playSound("nothing");
        return;
      }
      setOutcome(null);
      runner.run(program, finish);
    },
    reset,
    stop: runner.stop,
    closeWin: () => setWin(null),
    replay: () => {
      setWin(null);
      reset();
    },
  };
}

export type LevelGameState = ReturnType<typeof useLevelGame>;
