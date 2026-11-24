"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Virus } from "@/lib/levels";
import { Box, Details, type Detail } from "./Box";
import { dirAngles, materials } from "./materials";

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

type VirusModelProps = { virus: Virus; offset: { x: number; z: number } };

const turnTowards = (from: number, to: number) =>
  ((((to - from + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
  Math.PI;

export function VirusModel({ virus, offset }: VirusModelProps) {
  const ref = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const placed = useRef(false);

  useFrame(({ clock }, delta) => {
    const group = ref.current;
    if (!group || !body.current) return;
    if (!placed.current) {
      group.position.set(virus.x - offset.x, 0, virus.y - offset.z);
      group.rotation.y = dirAngles[virus.dir];
      placed.current = true;
    }
    group.position.x = THREE.MathUtils.damp(
      group.position.x,
      virus.x - offset.x,
      9,
      delta,
    );
    group.position.z = THREE.MathUtils.damp(
      group.position.z,
      virus.y - offset.z,
      9,
      delta,
    );
    group.rotation.y +=
      turnTowards(group.rotation.y, dirAngles[virus.dir]) *
      Math.min(1, delta * 10);
    const time = clock.elapsedTime * 5 + virus.id;
    body.current.rotation.z = Math.sin(time) * 0.15;
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
      <group ref={body} position={[0, 0.36, 0]} scale={1.25}>
        <Box
          size={[0.44, 0.44, 0.44]}
          position={[0, 0, 0]}
          material={materials.virus}
        />
        <Details parts={spikes} />
        <Details parts={face} />
      </group>
    </group>
  );
}
