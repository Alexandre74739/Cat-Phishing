"use client";

import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { outfitMaterials as look } from "./materials";

const eyeX = [-0.14, 0.14];

const faces: Record<string, ReactElement> = {
  mustache: (
    <>
      {[-1, 1].map((side) => (
        <Box
          key={side}
          size={[0.16, 0.05, 0.03]}
          position={[side * 0.08, -0.09, 0.345]}
          rotation={[0, 0, side * 0.25]}
          material={look.ink}
          edges={false}
        />
      ))}
    </>
  ),
  monocle: (
    <mesh position={[0.14, 0.06, 0.37]} material={look.gold}>
      <torusGeometry args={[0.12, 0.025, 6, 16]} />
    </mesh>
  ),
  pixel: (
    <group position={[0, 0.06, 0.37]}>
      <Box
        size={[0.66, 0.05, 0.03]}
        position={[0, 0.06, 0]}
        material={look.ink}
        edges={false}
      />
      {eyeX.map((x) => (
        <group key={x} position={[x, -0.01, 0]}>
          <Box
            size={[0.24, 0.1, 0.03]}
            position={[0, 0, 0]}
            material={look.ink}
            edges={false}
          />
          <Box
            size={[0.04, 0.04, 0.01]}
            position={[-0.06, 0.01, 0.02]}
            material={look.paper}
            edges={false}
          />
        </group>
      ))}
    </group>
  ),
  glasses: (
    <group position={[0, 0.06, 0.37]}>
      {eyeX.map((x) => (
        <mesh key={x} position={[x, 0, 0]} material={look.ink}>
          <torusGeometry args={[0.11, 0.022, 6, 16]} />
        </mesh>
      ))}
      <Box
        size={[0.07, 0.03, 0.03]}
        position={[0, 0.02, 0]}
        material={look.ink}
        edges={false}
      />
    </group>
  ),
  shades: (
    <group position={[0, 0.06, 0.37]}>
      {eyeX.map((x) => (
        <Box
          key={x}
          size={[0.22, 0.16, 0.03]}
          position={[x, 0, 0]}
          material={look.ink}
          edges={false}
        />
      ))}
      <Box
        size={[0.08, 0.03, 0.03]}
        position={[0, 0.03, 0]}
        material={look.ink}
        edges={false}
      />
    </group>
  ),
  visor: (
    <Box
      size={[0.68, 0.18, 0.06]}
      position={[0, 0.06, 0.37]}
      material={look.visor}
    />
  ),
  mask: (
    <Box
      size={[0.66, 0.2, 0.02]}
      position={[0, 0.06, 0.335]}
      material={look.grape}
      edges={false}
    />
  ),
};

export function Face3D({ id }: { id: string }) {
  return faces[id] ?? null;
}
