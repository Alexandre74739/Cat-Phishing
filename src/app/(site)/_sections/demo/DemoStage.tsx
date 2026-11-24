"use client";

import { CatMessage } from "@/_components/puzzle/CatMessage";
import { WorldView } from "@/_components/puzzle/WorldView";
import type { WorldEvent } from "@/_components/puzzle/world3d/types";
import type { World } from "@/lib/levels";
import type { DemoTexts } from "./types";
import type { DemoState } from "./useDemo";

const moods = {
  idle: "happy",
  running: "think",
  short: "sad",
  far: "sad",
} as const;

type DemoStageProps = {
  texts: Pick<DemoTexts, "world" | "messages">;
  world: World;
  event: WorldEvent;
  state: DemoState;
  hasBlocks: boolean;
};

export function DemoStage({
  texts,
  world,
  event,
  state,
  hasBlocks,
}: DemoStageProps) {
  const message =
    state === "idle" && !hasBlocks
      ? texts.messages.empty
      : texts.messages[state];

  return (
    <div className="flex flex-col gap-4">
      <WorldView world={world} event={event} texts={texts.world} />
      <CatMessage message={message} mood={moods[state]} />
    </div>
  );
}
