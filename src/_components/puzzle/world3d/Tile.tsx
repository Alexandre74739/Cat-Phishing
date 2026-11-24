"use client";

import type { Tile as TileKind } from "@/lib/levels";
import { Box, Details, type Detail } from "./Box";
import { Component } from "./Component";
import { Lava, Stream } from "./Liquid";
import { groundMaterials, hash, materials } from "./materials";
import { Gate, SpamRock } from "./Obstacles";

const boardTraces: Detail[] = [
  [[0.44, 0.012, 0.05], [0.18, 0.006, 0.42], materials.boardTrace],
  [[0.05, 0.012, 0.3], [0.42, 0.006, 0.25], materials.boardTrace],
];

const sideTraces = (seed: number, south: boolean, east: boolean) => {
  const y = -0.3 - (seed % 3) * 0.18;
  const pad = seed % 2 ? 0.35 : -0.35;
  const parts: Detail[] = [];
  if (south)
    parts.push(
      [[0.7, 0.04, 0.02], [0, y, 0.505], materials.trace],
      [[0.1, 0.1, 0.02], [pad, y, 0.505], materials.trace],
    );
  if (east)
    parts.push(
      [[0.02, 0.04, 0.7], [0.505, y, 0], materials.trace],
      [[0.02, 0.1, 0.1], [0.505, y, -pad], materials.trace],
    );
  return parts;
};

type TileProps = {
  tile: TileKind;
  x: number;
  y: number;
  south: boolean;
  east: boolean;
  eastWest: boolean;
};

export function Tile({ tile, x, y, south, east, eastWest }: TileProps) {
  const wall = tile === "#";
  const seed = hash(x, y);

  if (tile === "~" || tile === "=")
    return <Stream seed={seed} bridged={tile === "="} />;
  if (tile === "L") return <Lava seed={seed} />;

  return (
    <group>
      <Box
        size={[1, 1, 1]}
        position={[0, -0.5, 0]}
        material={groundMaterials(wall, (x + y) % 2 === 0)}
      />
      {(south || east) && <Details parts={sideTraces(seed, south, east)} />}
      {wall && (
        <>
          {seed % 3 === 0 && <Details parts={boardTraces} />}
          <Component seed={seed} />
        </>
      )}
      {tile === "R" && <SpamRock seed={seed} />}
      {(tile === "D" || tile === "O") && (
        <Gate open={tile === "O"} eastWest={eastWest} />
      )}
    </group>
  );
}
