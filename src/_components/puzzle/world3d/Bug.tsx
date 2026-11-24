"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { Box, Details, type Detail } from "./Box";
import { materials } from "./materials";

const face: Detail[] = [
  [[0.14, 0.14, 0.04], [-0.14, 0.36, 0.31], materials.eye],
  [[0.14, 0.14, 0.04], [0.14, 0.36, 0.31], materials.eye],
  [[0.07, 0.07, 0.03], [-0.12, 0.34, 0.335], materials.ink],
  [[0.07, 0.07, 0.03], [0.16, 0.34, 0.335], materials.ink],
  [[0.2, 0.05, 0.03], [0, 0.18, 0.315], materials.ink],
];

export function Bug({ seed }: { seed: number }) {
  const body = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!body.current) return;
    const time = clock.elapsedTime * 6 + seed;
    const squash = Math.sin(time * 2) * 0.05;
    body.current.position.y = Math.abs(Math.sin(time)) * 0.18;
    body.current.scale.set(1 + squash, 1 - squash, 1 + squash);
  });

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <mesh
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.shadow}
      >
        <circleGeometry args={[0.3, 20]} />
      </mesh>
      <group ref={body}>
        <Box
          size={[0.3, 0.3, 0.3]}
          position={[0, 0.27, 0]}
          material={materials.slimeCore}
          edges={false}
        />
        <Box
          size={[0.6, 0.56, 0.6]}
          position={[0, 0.28, 0]}
          material={materials.slime}
        />
        <Details parts={face} />
      </group>
    </group>
  );
}
