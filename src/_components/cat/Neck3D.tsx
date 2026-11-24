"use client";

import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { outfitMaterials as look } from "./materials";

const sides = [-1, 1];

// The bottom of the head is at y = -0.32, its front at z = 0.32.
const necks: Record<string, ReactElement> = {
  bell: (
    <>
      <Box
        size={[0.68, 0.08, 0.68]}
        position={[0, -0.25, 0]}
        material={look.coral}
      />
      <mesh position={[0, -0.31, 0.36]} material={look.gold}>
        <sphereGeometry args={[0.06, 8, 6]} />
      </mesh>
    </>
  ),
  bowtie: (
    <group position={[0, -0.22, 0.35]}>
      {sides.map((side) => (
        <Box
          key={side}
          size={[0.14, 0.12, 0.04]}
          position={[side * 0.08, 0, 0]}
          rotation={[0, 0, side * 0.3]}
          material={look.sky}
        />
      ))}
      <Box
        size={[0.06, 0.06, 0.06]}
        position={[0, 0, 0.01]}
        material={look.sky}
      />
    </group>
  ),
  scarf: (
    <>
      <Box
        size={[0.7, 0.12, 0.7]}
        position={[0, -0.24, 0]}
        material={look.mint}
      />
      <Box
        size={[0.12, 0.26, 0.05]}
        position={[0.16, -0.36, 0.36]}
        material={look.mint}
      />
    </>
  ),
  lanyard: (
    <>
      {sides.map((side) => (
        <Box
          key={side}
          size={[0.03, 0.22, 0.02]}
          position={[side * 0.08, -0.2, 0.335]}
          rotation={[0, 0, side * 0.45]}
          material={look.sky}
          edges={false}
        />
      ))}
      <Box
        size={[0.16, 0.2, 0.02]}
        position={[0, -0.36, 0.34]}
        material={look.paper}
      />
      <Box
        size={[0.16, 0.05, 0.01]}
        position={[0, -0.3, 0.355]}
        material={look.sky}
        edges={false}
      />
    </>
  ),
  chain: (
    <>
      <Box
        size={[0.7, 0.04, 0.7]}
        position={[0, -0.26, 0]}
        material={look.gold}
        edges={false}
      />
      <mesh
        position={[0, -0.33, 0.36]}
        rotation={[Math.PI / 2, 0, 0]}
        material={look.gold}
      >
        <cylinderGeometry args={[0.08, 0.08, 0.03, 12]} />
      </mesh>
    </>
  ),
};

export function Neck3D({ id }: { id: string }) {
  return necks[id] ?? null;
}
