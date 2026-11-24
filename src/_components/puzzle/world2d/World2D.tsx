"use client";

import { ArrowUp, Biohazard, KeyRound } from "lucide-react";
import { motion } from "motion/react";
import { CatFace } from "@/_components/cat/CatFace";
import type { WorldEvent } from "@/_components/puzzle/world3d/types";
import { cellKey, type World } from "@/lib/levels";
import { BugTile } from "./BugTile";
import { ChestIcon } from "./ChestIcon";
import { Piece } from "./Piece";
import { TileArt } from "./TileArt";
import { tileBackground } from "./tileLooks";

type World2DProps = { world: World; event: WorldEvent; label: string };

export function World2D({ world, event, label }: World2DProps) {
  const size = `min(${96 / world.width}cqw, ${94 / world.height}cqh)`;
  const won = event.kind === "win";
  const hurt = ["bump", "caught", "splash", "burn"].includes(event.kind);

  return (
    <div
      role="img"
      aria-label={label}
      className="grid size-full place-items-center px-2 pt-12 pb-4"
      style={{ containerType: "size" }}
    >
      <div
        className="relative grid overflow-hidden rounded-xl border-[3px] border-ink shadow-[0_8px_0_0_var(--color-island),0_8px_0_3px_var(--color-ink)]"
        style={{ gridTemplateColumns: `repeat(${world.width}, ${size})` }}
      >
        {world.tiles.flatMap((row, y) =>
          row.map((tile, x) => (
            <div
              key={`${x},${y}`}
              style={{ width: size, height: size }}
              className={`relative grid place-items-center ${tileBackground(tile, (x + y) % 2 === 1)}`}
            >
              <TileArt tile={tile} odd={(x * 7 + y * 3) % 2 === 1} />
              {world.goal.x === x && world.goal.y === y && (
                <ChestIcon open={won} />
              )}
              {world.keys.includes(cellKey({ x, y })) && (
                <span className="toon absolute inset-[24%] grid place-items-center rounded-full bg-sun text-ink">
                  <KeyRound className="size-3/4" strokeWidth={2.75} />
                </span>
              )}
              {world.gems.includes(cellKey({ x, y })) && (
                <span className="absolute inset-[30%] rotate-45 rounded-[15%] border-[3px] border-ink bg-gem motion-safe:animate-pulse" />
              )}
            </div>
          )),
        )}
        {world.bugs.map((bug) => (
          <Piece key={bug.id} at={bug} size={size}>
            <BugTile />
          </Piece>
        ))}
        {world.viruses.map((virus) => (
          <Piece key={virus.id} at={virus} size={size}>
            <motion.span
              className="toon grid size-3/4 place-items-center rounded-lg bg-coral text-ink"
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
            >
              <Biohazard className="size-3/5" strokeWidth={2.5} />
            </motion.span>
          </Piece>
        ))}
        <Piece at={world.cat} size={size} shake={hurt} pulse={won}>
          <CatFace
            mood={won ? "wow" : hurt ? "sad" : "happy"}
            className="size-4/5"
          />
          <span
            className="absolute inset-0 grid justify-center text-sun"
            style={{ rotate: `${world.cat.dir * 90}deg` }}
          >
            <ArrowUp
              className="-mt-[30%] size-2/5 drop-shadow-[0_2px_0_var(--color-ink)]"
              strokeWidth={4}
            />
          </span>
        </Piece>
      </div>
    </div>
  );
}
