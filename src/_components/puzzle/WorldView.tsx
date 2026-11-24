"use client";

import { Gem, KeyRound } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { World } from "@/lib/levels";
import { playClickSound } from "@/lib/sound";
import { World2D } from "./world2d/World2D";
import type { WorldEvent } from "./world3d/types";

const World3D = dynamic(
  () => import("./world3d/World3D").then((module) => module.World3D),
  { ssr: false },
);

export type WorldViewTexts = {
  label: string;
  show2d: string;
  show3d: string;
  gems?: string;
  keys?: string;
};

type WorldViewProps = {
  world: World;
  event: WorldEvent;
  texts: WorldViewTexts;
  shake?: number;
  className?: string;
};

const chip =
  "toon flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 font-ui font-bold";

export function WorldView({
  world,
  event,
  texts,
  shake = 0,
  className = "aspect-4/3 sm:aspect-16/10",
}: WorldViewProps) {
  const [is3d, setIs3d] = useState(true);
  const flat = <World2D world={world} event={event} label={texts.label} />;

  return (
    <div
      key={shake}
      className={`toon scene relative w-full shrink-0 overflow-hidden rounded-3xl ${shake ? "shake" : ""} ${className}`}
    >
      <div className="absolute inset-0">
        {is3d ? (
          <World3D
            world={world}
            event={event}
            label={texts.label}
            fallback={flat}
          />
        ) : (
          flat
        )}
      </div>
      <div className="absolute top-2 left-2 flex flex-col items-start gap-1.5">
        {world.totalGems > 0 && (
          <p
            className={chip}
            aria-label={`${world.totalGems - world.gems.length} / ${world.totalGems} ${texts.gems ?? ""}`}
          >
            <Gem
              size={18}
              strokeWidth={2.5}
              className="fill-gem"
              aria-hidden="true"
            />
            {world.totalGems - world.gems.length} / {world.totalGems}
          </p>
        )}
        {world.keysHeld > 0 && (
          <p
            className={chip}
            aria-label={`${world.keysHeld} ${texts.keys ?? ""}`}
          >
            <KeyRound
              size={18}
              strokeWidth={2.5}
              className="fill-orange"
              aria-hidden="true"
            />
            {world.keysHeld}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          playClickSound();
          setIs3d((value) => !value);
        }}
        className="toon pressable absolute top-2 right-2 min-h-9 rounded-full bg-paper px-3 font-ui text-sm font-semibold"
      >
        {is3d ? texts.show2d : texts.show3d}
      </button>
    </div>
  );
}
