"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import type { WorldEvent } from "@/_components/puzzle/world3d/types";
import {
  arrowGeometry,
  materials,
  palette,
} from "@/_components/puzzle/world3d/materials";
import type { Cat } from "@/lib/levels";
import { CatBody } from "./CatBody";
import { applyEvent, createMotion, stepCat } from "./catMotion";

type CatModelProps = {
  cat: Cat;
  event: WorldEvent;
  offset: { x: number; z: number };
};

export function CatModel({ cat, event, offset }: CatModelProps) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const motion = useRef(createMotion());

  useEffect(
    () => applyEvent(motion.current, event.kind, event.duration),
    [event],
  );

  useFrame((_, delta) => {
    if (root.current && body.current)
      stepCat(motion.current, root.current, body.current, cat, offset, delta);
  });

  return (
    <group ref={root}>
      <mesh
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.shadow}
      >
        <circleGeometry args={[0.32, 20]} />
      </mesh>
      <mesh
        position={[0, 0.03, 0.4]}
        geometry={arrowGeometry}
        material={materials.arrow}
      >
        <Edges color={palette.ink} />
      </mesh>
      <group ref={body}>
        <CatBody />
      </group>
    </group>
  );
}
