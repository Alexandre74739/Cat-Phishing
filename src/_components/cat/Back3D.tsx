"use client";

import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { outfitMaterials as look } from "./materials";

const sides = [-1, 1];

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
  cape: (
    <Box
      size={[0.6, 0.62, 0.04]}
      position={[0, -0.06, -0.37]}
      rotation={[0.12, 0, 0]}
      material={look.coral}
    />
  ),
  wings: (
    <>
      {sides.map((side) => (
        <group
          key={side}
          position={[side * 0.24, 0.08, -0.36]}
          rotation={[0, side * -0.4, 0]}
        >
          <Box
            size={[0.4, 0.3, 0.03]}
            position={[side * 0.18, 0.08, 0]}
            rotation={[0, 0, side * 0.35]}
            material={look.lilac}
          />
          <Box
            size={[0.26, 0.2, 0.03]}
            position={[side * 0.14, -0.16, 0]}
            rotation={[0, 0, side * -0.3]}
            material={look.pink}
          />
        </group>
      ))}
    </>
  ),
  jetpack: (
    <>
      {sides.map((side) => (
        <group key={side} position={[side * 0.13, 0, -0.43]}>
          <mesh material={look.steel} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.44, 10]} />
          </mesh>
          <mesh
            position={[0, -0.3, 0]}
            rotation={[Math.PI, 0, 0]}
            material={look.orange}
          >
            <coneGeometry args={[0.08, 0.18, 8]} />
          </mesh>
        </group>
      ))}
    </>
  ),
};

export function Back3D({ id }: { id: string }) {
  return backs[id] ?? null;
}
