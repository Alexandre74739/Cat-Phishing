"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type ReactElement } from "react";
import type * as THREE from "three";
import { Box } from "@/_components/puzzle/world3d/Box";
import { palette } from "@/_components/puzzle/world3d/materials";
import { outfitMaterials as look } from "./materials";

function Propeller() {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (blades.current) blades.current.rotation.y += delta * 9;
  });
  return (
    <group ref={blades} position={[0, 0.62, 0]}>
      <Box size={[0.5, 0.03, 0.09]} position={[0, 0, 0]} material={look.sky} />
      <Box
        size={[0.09, 0.03, 0.5]}
        position={[0, 0, 0]}
        material={look.orange}
      />
    </group>
  );
}

const cap = (material: THREE.Material) => (
  <>
    <Box size={[0.5, 0.1, 0.5]} position={[0, 0.37, 0]} material={material} />
    <Box
      size={[0.3, 0.05, 0.2]}
      position={[0, 0.35, 0.33]}
      material={material}
    />
  </>
);

const hats: Record<string, ReactElement> = {
  cap: cap(look.mint),
  propeller: (
    <>
      {cap(look.coral)}
      <Box
        size={[0.04, 0.2, 0.04]}
        position={[0, 0.5, 0]}
        material={look.ink}
        edges={false}
      />
      <Propeller />
    </>
  ),
  antenna: (
    <>
      <Box
        size={[0.04, 0.36, 0.04]}
        position={[0, 0.5, 0]}
        material={look.steel}
      />
      <mesh position={[0, 0.72, 0]} material={look.visor}>
        <sphereGeometry args={[0.08, 10, 8]} />
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
};

export function Hat3D({ id }: { id: string }) {
  return hats[id] ?? null;
}
