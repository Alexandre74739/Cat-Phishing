"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { Box, Details, type Detail } from "./Box";
import { materials } from "./materials";

const bridgeParts: Detail[] = [
  [[0.08, 0.14, 0.9], [0.4, 0.02, 0], materials.gatePost],
  [[0.08, 0.14, 0.9], [-0.4, 0.02, 0], materials.gatePost],
  [[0.9, 0.04, 0.06], [0, 0.07, 0.28], materials.streamBit],
  [[0.9, 0.04, 0.06], [0, 0.07, -0.28], materials.streamBit],
];

function Bed({ top }: { top: THREE.Material }) {
  const side = materials.island;
  return (
    <Box
      size={[1, 1, 1]}
      position={[0, -0.62, 0]}
      material={[side, side, top, side, side, side]}
    />
  );
}

export function Stream({ seed, bridged }: { seed: number; bridged: boolean }) {
  const bits = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    bits.current?.children.forEach((bit, index) => {
      const travel = (clock.elapsedTime * 0.5 + index / 3 + seed * 0.13) % 1;
      bit.position.x = travel - 0.5;
      bit.position.y = -0.1 + Math.sin(travel * Math.PI) * 0.04;
    });
  });

  return (
    <group>
      <Bed top={materials.streamBed} />
      <Box
        size={[1, 0.08, 1]}
        position={[0, -0.14, 0]}
        material={materials.stream}
        edges={false}
      />
      <group ref={bits}>
        {[-0.25, 0.1, 0.3].map((z) => (
          <mesh key={z} position={[0, -0.1, z]} material={materials.streamBit}>
            <boxGeometry args={[0.12, 0.04, 0.06]} />
          </mesh>
        ))}
      </group>
      {bridged && (
        <group>
          <Box
            size={[0.86, 0.12, 0.9]}
            position={[0, -0.04, 0]}
            material={materials.wood}
          />
          <Details parts={bridgeParts} />
        </group>
      )}
    </group>
  );
}

export function Lava({ seed }: { seed: number }) {
  const embers = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    materials.lava.emissiveIntensity = 0.75 + Math.sin(time * 3) * 0.3;
    embers.current?.children.forEach((ember, index) => {
      const rise = (time * 0.6 + index * 0.37 + seed * 0.11) % 1;
      ember.position.y = -0.1 + rise * 0.7;
      ember.scale.setScalar(1 - rise);
    });
  });

  return (
    <group>
      <Bed top={materials.lavaBed} />
      <Box
        size={[1, 0.08, 1]}
        position={[0, -0.12, 0]}
        material={materials.lava}
        edges={false}
      />
      <group ref={embers}>
        {[
          [-0.2, 0.15],
          [0.22, -0.1],
          [0, -0.3],
        ].map(([x, z]) => (
          <mesh
            key={`${x},${z}`}
            position={[x, 0, z]}
            material={materials.ember}
          >
            <boxGeometry args={[0.07, 0.07, 0.07]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
