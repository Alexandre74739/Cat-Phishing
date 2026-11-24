"use client";

import { ArrowUp, Biohazard } from "lucide-react";
import { motion } from "motion/react";
import { CatFace } from "@/_components/cat/CatFace";
import type { WorldEvent } from "@/_components/puzzle/world3d/types";
import { cellKey, type World } from "@/lib/levels";
import { BugTile } from "./BugTile";
import { ChestIcon } from "./ChestIcon";
import { Piece } from "./Piece";

type World2DProps = { world: World; event: WorldEvent; label: string };

export function World2D({ world, event, label }: World2DProps) {
  const size = `min(${96 / world.width}cqw, ${94 / world.height}cqh)`;
  const won = event.kind === "win";
  const hurt = event.kind === "bump" || event.kind === "caught";

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
              className={`relative grid place-items-center ${tile === "#" ? "bg-block-dark" : (x + y) % 2 ? "bg-lane-alt" : "bg-lane"}`}
            >
              {tile === "#" && (
                <span
                  className={`absolute inset-[14%] rounded-[18%] border-[3px] border-ink shadow-[3px_4px_0_color-mix(in_srgb,var(--color-ink)_35%,transparent)] ${(x * 7 + y * 3) % 2 ? "bg-block" : "bg-block-alt"}`}
                >
                  <span className="absolute inset-x-[18%] top-[26%] h-[12%] rounded-full bg-ink/80" />
                  <span className="absolute inset-x-[18%] top-[50%] h-[12%] rounded-full bg-ink/80" />
                </span>
              )}
              {world.goal.x === x && world.goal.y === y && (
                <ChestIcon open={won} />
              )}
              {world.bugs.includes(cellKey({ x, y })) && <BugTile />}
              {world.gems.includes(cellKey({ x, y })) && (
                <span className="absolute inset-[30%] rotate-45 rounded-[15%] border-[3px] border-ink bg-gem motion-safe:animate-pulse" />
              )}
            </div>
          )),
        )}
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
