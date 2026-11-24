"use client";

import { useState } from "react";
import { CatModel } from "@/_components/cat/CatModel";
import { cellKey, type World } from "@/lib/levels";
import { Burst, burstColors, type BurstSpec } from "./Burst";
import { Fit } from "./Fit";
import { Lights } from "./Lights";
import { Tile } from "./Tile";
import { Chest } from "./Chest";
import { Bug } from "./Bug";
import { Gem } from "./Gem";
import { VirusModel } from "./VirusModel";
import type { WorldEvent } from "./types";

export function Scene({ world, event }: { world: World; event: WorldEvent }) {
  const offset = { x: (world.width - 1) / 2, z: (world.height - 1) / 2 };
  const [bursts, setBursts] = useState<BurstSpec[]>([]);
  const [seenKey, setSeenKey] = useState(event.key);

  if (event.key !== seenKey) {
    setSeenKey(event.key);
    const color = burstColors[event.kind as keyof typeof burstColors];
    const at = event.at ?? world.cat;
    if (color)
      setBursts((list) => [
        ...list,
        {
          id: event.key,
          position: [at.x - offset.x, 0.5, at.y - offset.z],
          color,
          count: event.kind === "win" ? 30 : 12,
        },
      ]);
  }

  return (
    <>
      <Fit width={world.width} height={world.height} />
      <Lights />
      {world.tiles.map((row, y) =>
        row.map((tile, x) => (
          <group key={`${x},${y}`} position={[x - offset.x, 0, y - offset.z]}>
            <Tile
              tile={tile}
              x={x}
              y={y}
              south={y === world.height - 1}
              east={x === world.width - 1}
            />
            {world.goal.x === x && world.goal.y === y && (
              <Chest open={event.kind === "win"} />
            )}
            {world.gems.includes(cellKey({ x, y })) && <Gem />}
            {world.bugs.includes(cellKey({ x, y })) && <Bug seed={x * 7 + y} />}
          </group>
        )),
      )}
      {world.viruses.map((virus) => (
        <VirusModel key={virus.id} virus={virus} offset={offset} />
      ))}
      <CatModel cat={world.cat} event={event} offset={offset} />
      {bursts.map((spec) => (
        <Burst
          key={spec.id}
          spec={spec}
          onDone={(id) => setBursts((list) => list.filter((b) => b.id !== id))}
        />
      ))}
    </>
  );
}
