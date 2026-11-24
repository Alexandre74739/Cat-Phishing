"use client";

import { useEffect, useRef, useState } from "react";
import type { WorldEvent } from "@/_components/puzzle/world3d/types";
import type { Block } from "@/lib/blocks";
import type { World } from "@/lib/levels";
import { runProgram, type Outcome, type StepKind } from "@/lib/runtime";
import { playSound, type SoundName } from "@/lib/sound";

const steps: Record<StepKind, { delay: number; sound: SoundName }> = {
  move: { delay: 560, sound: "step" },
  turn: { delay: 380, sound: "turn" },
  grab: { delay: 560, sound: "grab" },
  zap: { delay: 560, sound: "zap" },
  nothing: { delay: 380, sound: "nothing" },
  wait: { delay: 560, sound: "wait" },
  jump: { delay: 760, sound: "jump" },
  key: { delay: 560, sound: "key" },
  bridge: { delay: 620, sound: "bridge" },
  smash: { delay: 620, sound: "smash" },
  open: { delay: 620, sound: "open" },
  splash: { delay: 900, sound: "splash" },
  burn: { delay: 900, sound: "burn" },
  bump: { delay: 650, sound: "bump" },
  caught: { delay: 900, sound: "caught" },
  check: { delay: 320, sound: "check" },
  win: { delay: 300, sound: "win" },
};

const fastFactor = 0.5;

export function useProgramRunner(initialWorld: World, fast = false) {
  const [world, setWorld] = useState(initialWorld);
  const [event, setEvent] = useState<WorldEvent>({ kind: "reset", key: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const eventKey = useRef(1);
  const fastRef = useRef(fast);

  useEffect(() => {
    fastRef.current = fast;
  }, [fast]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const stop = () => {
    clearTimeout(timer.current);
    setActiveId(null);
    setRunning(false);
  };

  const reset = () => {
    clearTimeout(timer.current);
    setWorld(initialWorld);
    setActiveId(null);
    setRunning(false);
    setEvent({ kind: "reset", key: eventKey.current++ });
  };

  const run = (program: Block[], onFinish: (outcome: Outcome) => void) => {
    reset();
    setRunning(true);
    playSound("click");
    const playback = runProgram(initialWorld, program);
    const tick = () => {
      const next = playback.next();
      if (next.done) {
        setActiveId(null);
        setRunning(false);
        if (!next.value.ok) playSound("fail");
        return onFinish(next.value);
      }
      const { kind, world: stepWorld, blockId, at } = next.value;
      setWorld(stepWorld);
      setActiveId(blockId);
      const delay = steps[kind].delay * (fastRef.current ? fastFactor : 1);
      setEvent({ kind, at, duration: delay / 1000, key: eventKey.current++ });
      playSound(steps[kind].sound);
      timer.current = setTimeout(tick, delay);
    };
    timer.current = setTimeout(tick, 300);
  };

  return { world, event, activeId, running, run, stop, reset };
}
