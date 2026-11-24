"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { materials, palette } from "./materials";

export function Gem() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 2;
    ref.current.position.y = 0.5 + Math.sin(clock.elapsedTime * 3) * 0.08;
  });

  return (
    <mesh ref={ref} material={materials.gem} castShadow>
      <octahedronGeometry args={[0.3]} />
      <Edges color={palette.ink} />
    </mesh>
  );
}
