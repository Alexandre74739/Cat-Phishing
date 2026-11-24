"use client";

import { Edges } from "@react-three/drei";
import type { ReactElement } from "react";
import { Box } from "@/_components/puzzle/world3d/Box";
import { palette } from "@/_components/puzzle/world3d/materials";
import { outfitMaterials as look } from "./materials";

// Party and costume hats; the top of the head is at y = 0.32.
export const fancyHatModels: Record<string, ReactElement> = {
  party: (
    <>
      <mesh position={[0, 0.52, 0]} material={look.pink} castShadow>
        <coneGeometry args={[0.16, 0.42, 10]} />
        <Edges color={palette.ink} threshold={30} />
      </mesh>
      <mesh position={[0, 0.75, 0]} material={look.gold}>
        <sphereGeometry args={[0.06, 8, 6]} />
      </mesh>
    </>
  ),
  wizard: (
    <>
      <mesh position={[0, 0.35, 0]} material={look.grape} castShadow>
        <cylinderGeometry args={[0.44, 0.44, 0.04, 20]} />
        <Edges color={palette.ink} threshold={20} />
      </mesh>
      <mesh
        position={[0, 0.66, 0]}
        rotation={[0.12, 0, 0]}
        material={look.grape}
      >
        <coneGeometry args={[0.24, 0.6, 12]} />
        <Edges color={palette.ink} threshold={30} />
      </mesh>
    </>
  ),
  tophat: (
    <>
      <mesh position={[0, 0.35, 0]} material={look.midnight} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 20]} />
        <Edges color={palette.ink} threshold={20} />
      </mesh>
      <mesh position={[0, 0.56, 0]} material={look.midnight} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.4, 16]} />
        <Edges color={palette.ink} threshold={20} />
      </mesh>
      <mesh position={[0, 0.41, 0]} material={look.coral}>
        <cylinderGeometry args={[0.225, 0.225, 0.07, 16]} />
      </mesh>
    </>
  ),
  crown: (
    <>
      <mesh position={[0, 0.42, 0]} material={look.gold} castShadow>
        <cylinderGeometry args={[0.27, 0.27, 0.18, 10, 1, true]} />
        <Edges color={palette.ink} threshold={20} />
      </mesh>
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = (index / 5) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.sin(angle) * 0.24, 0.58, Math.cos(angle) * 0.24]}
            material={look.gold}
          >
            <coneGeometry args={[0.07, 0.15, 6]} />
          </mesh>
        );
      })}
    </>
  ),
  helmet: (
    <>
      <Box
        size={[0.7, 0.22, 0.7]}
        position={[0, 0.42, 0]}
        material={look.rock}
      />
      <Box
        size={[0.08, 0.22, 0.52]}
        position={[0, 0.63, 0]}
        material={look.coral}
      />
    </>
  ),
  gradcap: (
    <>
      <Box
        size={[0.42, 0.12, 0.42]}
        position={[0, 0.38, 0]}
        material={look.midnight}
      />
      <Box
        size={[0.72, 0.04, 0.72]}
        position={[0, 0.46, 0]}
        rotation={[0, Math.PI / 4, 0]}
        material={look.midnight}
      />
      <Box
        size={[0.03, 0.22, 0.03]}
        position={[0.3, 0.37, 0.3]}
        material={look.gold}
        edges={false}
      />
    </>
  ),
};
