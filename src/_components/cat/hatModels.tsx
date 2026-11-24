"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactElement } from "react";
import type * as THREE from "three";
import { Box } from "@/_components/puzzle/world3d/Box";
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

const sides = [-1, 1];

// Everyday hats; the top of the head is at y = 0.32.
export const hatModels: Record<string, ReactElement> = {
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
  beanie: (
    <>
      <Box
        size={[0.62, 0.2, 0.62]}
        position={[0, 0.42, 0]}
        material={look.sky}
      />
      <Box
        size={[0.66, 0.08, 0.66]}
        position={[0, 0.33, 0]}
        material={look.sky}
      />
      <mesh position={[0, 0.58, 0]} material={look.paper}>
        <sphereGeometry args={[0.09, 8, 6]} />
      </mesh>
    </>
  ),
  headphones: (
    <>
      <Box
        size={[0.62, 0.06, 0.1]}
        position={[0, 0.44, 0]}
        material={look.ink}
      />
      {sides.map((side) => (
        <group key={side} position={[side * 0.35, 0, 0]}>
          <Box
            size={[0.05, 0.36, 0.1]}
            position={[0, 0.27, 0]}
            material={look.ink}
          />
          <Box
            size={[0.1, 0.24, 0.24]}
            position={[0, 0.06, 0]}
            material={look.coral}
          />
        </group>
      ))}
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
};
