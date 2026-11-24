"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { StepKind } from "@/lib/runtime";
import { flat, palette } from "./materials";

export type BurstSpec = {
  id: number;
  position: THREE.Vector3Tuple;
  color: string;
  count: number;
};

export const burstColors: Partial<Record<StepKind, string>> = {
  bump: palette.coral,
  caught: palette.coral,
  grab: palette.gem,
  zap: palette.slime,
  key: palette.orange,
  bridge: palette.wood,
  smash: palette.rock,
  open: palette.orange,
  splash: palette.sky,
  burn: palette.lava,
  win: palette.orange,
};

function spawn({ position, count }: BurstSpec) {
  return Array.from({ length: count }, () => ({
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 4,
      2.5 + Math.random() * 3,
      (Math.random() - 0.5) * 4,
    ),
    position: new THREE.Vector3(...position),
  }));
}

type BurstProps = { spec: BurstSpec; onDone: (id: number) => void };

export function Burst({ spec, onDone }: BurstProps) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const parts = useMemo(() => spawn(spec), [spec]);
  const material = useMemo(() => flat(spec.color), [spec.color]);
  const life = useRef(0);

  useFrame((_, delta) => {
    life.current += delta;
    parts.forEach((part, index) => {
      part.velocity.y -= 9 * delta;
      part.position.addScaledVector(part.velocity, delta);
      const mesh = meshes.current[index];
      if (!mesh) return;
      mesh.position.copy(part.position);
      mesh.scale.setScalar(Math.max(0, 1 - life.current));
      mesh.rotation.x += delta * 6;
    });
    if (life.current > 1) onDone(spec.id);
  });

  return parts.map((_, index) => (
    <mesh
      key={index}
      ref={(mesh) => {
        meshes.current[index] = mesh;
      }}
      material={material}
    >
      <boxGeometry args={[0.12, 0.12, 0.12]} />
    </mesh>
  ));
}
