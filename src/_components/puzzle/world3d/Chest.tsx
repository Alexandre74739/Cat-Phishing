"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Box, Details, type Detail } from "./Box";
import { materials } from "./materials";

const lock: Detail[] = [
  [[0.14, 0.2, 0.06], [0, 0.38, 0.28], materials.gold],
  [[0.6, 0.04, 0.4], [0, 0.42, 0], materials.coins],
];

export function Chest({ open }: { open: boolean }) {
  const lid = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (lid.current)
      lid.current.rotation.x = THREE.MathUtils.damp(
        lid.current.rotation.x,
        open ? -1.9 : 0,
        6,
        delta,
      );
    if (beam.current)
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        (open ? 0.3 : 0.14) + Math.sin(clock.elapsedTime * 4) * 0.08;
  });

  return (
    <group>
      <Box
        size={[0.7, 0.42, 0.52]}
        position={[0, 0.21, 0]}
        material={materials.wood}
      />
      <Details parts={lock} />
      <group ref={lid} position={[0, 0.41, -0.28]}>
        <Box
          size={[0.74, 0.18, 0.56]}
          position={[0, 0.09, 0.28]}
          material={materials.wood}
        />
      </group>
      <mesh ref={beam} position={[0, 1.6, 0]} material={materials.beam}>
        <cylinderGeometry args={[0.45, 0.45, 3, 12, 1, true]} />
      </mesh>
    </group>
  );
}
