"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import type { Enemy } from "@/lib/levels";
import { Box, Details, type Detail } from "./Box";
import { materials } from "./materials";
import { Walker } from "./Walker";

const spikes: Detail[] = [
  [[0.12, 0.12, 0.12], [0, 0.3, 0], materials.virusSpike],
  [[0.12, 0.12, 0.12], [0.28, 0, 0], materials.virusSpike],
  [[0.12, 0.12, 0.12], [-0.28, 0, 0], materials.virusSpike],
  [[0.12, 0.12, 0.12], [0, 0, -0.28], materials.virusSpike],
];

const face: Detail[] = [
  [[0.12, 0.12, 0.04], [-0.1, 0.04, 0.23], materials.eye],
  [[0.12, 0.12, 0.04], [0.1, 0.04, 0.23], materials.eye],
  [[0.05, 0.06, 0.03], [-0.09, 0.03, 0.255], materials.ink],
  [[0.05, 0.06, 0.03], [0.09, 0.03, 0.255], materials.ink],
  [[0.14, 0.03, 0.03], [-0.1, 0.13, 0.245], materials.ink],
  [[0.14, 0.03, 0.03], [0.1, 0.13, 0.245], materials.ink],
  [[0.18, 0.04, 0.03], [0, -0.1, 0.245], materials.ink],
];

type VirusModelProps = { virus: Enemy; offset: { x: number; z: number } };

export function VirusModel({ virus, offset }: VirusModelProps) {
  const body = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (body.current)
      body.current.rotation.z =
        Math.sin(clock.elapsedTime * 5 + virus.id) * 0.15;
  });

  return (
    <Walker enemy={virus} offset={offset}>
      <group ref={body} position={[0, 0.36, 0]} scale={1.25}>
        <Box
          size={[0.44, 0.44, 0.44]}
          position={[0, 0, 0]}
          material={materials.virus}
        />
        <Details parts={spikes} />
        <Details parts={face} />
      </group>
    </Walker>
  );
}
