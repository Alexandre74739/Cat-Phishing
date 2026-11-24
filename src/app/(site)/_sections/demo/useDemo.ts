"use client";

import { useState } from "react";
import { useProgramRunner } from "@/hooks/useProgramRunner";
import { createBlock, type Block } from "@/lib/blocks";
import { buildWorld } from "@/lib/levels";
import type { Outcome } from "@/lib/runtime";
import { playSound } from "@/lib/sound";

const initialWorld = buildWorld({
  grid: ["#######", "#S...C#", "#######"],
  startDir: 1,
});

export const maxBlocks = 7;

export type DemoState = "idle" | "running" | "short" | "far";

export function useDemo() {
  const runner = useProgramRunner(initialWorld);
  const [program, setProgram] = useState<Block[]>([]);
  const [result, setResult] = useState<"idle" | "short" | "far">("idle");
  const [won, setWon] = useState(false);
  const state: DemoState = runner.running ? "running" : result;

  const edit = (next: Block[], sound: "snap" | "trash") => {
    if (runner.running) return;
    runner.reset();
    setProgram(next);
    setResult("idle");
    playSound(sound);
  };

  const finish = (outcome: Outcome) => {
    if (outcome.ok) {
      setResult("idle");
      setTimeout(() => setWon(true), 700);
      return;
    }
    setResult(outcome.reason === "blocked" ? "far" : "short");
  };

  return {
    program,
    world: runner.world,
    event: runner.event,
    activeId: runner.activeId,
    state,
    won,
    add: () =>
      program.length < maxBlocks &&
      edit([...program, createBlock("forward")], "snap"),
    clear: () => edit([], "trash"),
    run: () => {
      if (runner.running || program.length === 0) return;
      setResult("idle");
      runner.run(program, finish);
    },
    replay: () => {
      setWon(false);
      runner.reset();
    },
    closeWin: () => setWon(false),
  };
}
