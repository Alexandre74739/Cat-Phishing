"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";
import type { Enemy } from "@/lib/levels";
import { dirAngles, materials, turnTowards } from "./materials";

type WalkerProps = {
  enemy: Enemy;
  offset: { x: number; z: number };
  children: ReactNode;
};

export function Walker({ enemy, offset, children }: WalkerProps) {
  const ref = useRef<THREE.Group>(null);
  const placed = useRef(false);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    const x = enemy.x - offset.x;
    const z = enemy.y - offset.z;
    if (!placed.current) {
      group.position.set(x, 0, z);
      group.rotation.y = dirAngles[enemy.dir];
      placed.current = true;
    }
    group.position.x = THREE.MathUtils.damp(group.position.x, x, 9, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, z, 9, delta);
    group.rotation.y +=
      turnTowards(group.rotation.y, dirAngles[enemy.dir]) *
      Math.min(1, delta * 10);
  });

  return (
    <group ref={ref}>
      <mesh
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.shadow}
      >
        <circleGeometry args={[0.3, 20]} />
      </mesh>
      {children}
    </group>
  );
}
