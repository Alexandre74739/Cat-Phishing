"use client";

import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { outfitMaterials as look } from "./materials";
import { wingModels } from "./wingModels";

const backs: Record<string, ReactElement> = {
  backpack: (
    <>
      <Box
        size={[0.42, 0.42, 0.16]}
        position={[0, -0.02, -0.4]}
        material={look.sky}
      />
      <Box
        size={[0.3, 0.12, 0.05]}
        position={[0, -0.1, -0.5]}
        material={look.sky}
      />
    </>
  ),
  bow: (
    <group position={[0, 0.2, -0.36]}>
      {[-1, 1].map((side) => (
        <Box
          key={side}
          size={[0.22, 0.16, 0.05]}
          position={[side * 0.13, 0, 0]}
          rotation={[0, 0, side * 0.4]}
          material={look.pink}
        />
      ))}
      <Box
        size={[0.08, 0.08, 0.07]}
        position={[0, 0, -0.01]}
        material={look.pink}
      />
    </group>
  ),
  cape: (
    <Box
      size={[0.6, 0.62, 0.04]}
      position={[0, -0.06, -0.37]}
      rotation={[0.12, 0, 0]}
      material={look.coral}
    />
  ),
  shield: (
    <group position={[0, 0, -0.38]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh material={look.sky} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
      </mesh>
      <mesh position={[0, -0.03, 0]} material={look.mint}>
        <cylinderGeometry args={[0.14, 0.14, 0.03, 12]} />
      </mesh>
    </group>
  ),
};

export function Back3D({ id }: { id: string }) {
  return backs[id] ?? wingModels[id] ?? null;
}
