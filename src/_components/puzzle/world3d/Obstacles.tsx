"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Box, Details, type Detail } from "./Box";
import { materials } from "./materials";

const envelopes: Detail[] = [
  [[0.26, 0.18, 0.03], [-0.1, 0.42, 0.37], materials.mail],
  [[0.26, 0.04, 0.035], [-0.1, 0.46, 0.375], materials.ink],
  [[0.03, 0.18, 0.26], [0.37, 0.25, 0.08], materials.mail],
  [[0.035, 0.04, 0.26], [0.375, 0.29, 0.08], materials.ink],
];

export function SpamRock({ seed }: { seed: number }) {
  return (
    <group rotation={[0, (seed % 5) * 0.12, 0]}>
      <Box
        size={[0.74, 0.62, 0.74]}
        position={[0, 0.31, 0]}
        material={materials.rock}
      />
      <Box
        size={[0.42, 0.24, 0.42]}
        position={[0.08, 0.74, -0.06]}
        material={materials.rockDark}
      />
      <Details parts={envelopes} />
    </group>
  );
}

const frame: Detail[] = [
  [[0.14, 1.05, 0.2], [-0.43, 0.52, 0], materials.gatePost],
  [[0.14, 1.05, 0.2], [0.43, 0.52, 0], materials.gatePost],
  [[1, 0.16, 0.22], [0, 1.1, 0], materials.gatePost],
];

type GateProps = { open: boolean; eastWest: boolean };

export function Gate({ open, eastWest }: GateProps) {
  const leaf = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (leaf.current)
      leaf.current.rotation.y = THREE.MathUtils.damp(
        leaf.current.rotation.y,
        open ? -Math.PI / 2 : 0,
        6,
        delta,
      );
  });

  return (
    <group rotation={[0, eastWest ? Math.PI / 2 : 0, 0]}>
      <Details parts={frame} />
      <group ref={leaf} position={[-0.36, 0, 0]}>
        <Box
          size={[0.72, 0.95, 0.1]}
          position={[0.36, 0.48, 0]}
          material={materials.gate}
        />
        <Box
          size={[0.2, 0.22, 0.14]}
          position={[0.36, 0.5, 0]}
          material={materials.gold}
        />
      </group>
    </group>
  );
}

export function KeyItem() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 2.2;
    ref.current.position.y = 0.5 + Math.sin(clock.elapsedTime * 3) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh material={materials.gold} position={[0, 0.12, 0]} castShadow>
        <torusGeometry args={[0.13, 0.05, 8, 16]} />
      </mesh>
      <Box
        size={[0.07, 0.32, 0.07]}
        position={[0, -0.12, 0]}
        material={materials.gold}
      />
      <Box
        size={[0.12, 0.05, 0.07]}
        position={[0.07, -0.22, 0]}
        material={materials.gold}
        edges={false}
      />
    </group>
  );
}
