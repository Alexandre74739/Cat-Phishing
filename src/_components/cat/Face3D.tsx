"use client";

import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { outfitMaterials as look } from "./materials";

const eyeX = [-0.14, 0.14];

const faces: Record<string, ReactElement> = {
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
