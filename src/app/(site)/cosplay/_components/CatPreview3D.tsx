"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import type * as THREE from "three";
import { CatBody } from "@/_components/cat/CatBody";
import { Trail } from "@/_components/cat/Trail";
import { Fit } from "@/_components/puzzle/world3d/Fit";
import { GLBoundary } from "@/_components/puzzle/world3d/GLBoundary";
import { Lights } from "@/_components/puzzle/world3d/Lights";
import { materials } from "@/_components/puzzle/world3d/materials";
import type { Outfit } from "@/lib/outfits";

function Walker({ outfit, still }: { outfit: Outfit; still: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!root.current || !body.current || still) return;
    const time = clock.elapsedTime * 0.9;
    root.current.position.set(Math.sin(time) * 1.1, 0, Math.cos(time) * 0.7);
    root.current.rotation.y = time + Math.PI / 2;
    body.current.position.y =
      0.33 + Math.abs(Math.sin(clock.elapsedTime * 6)) * 0.12;
  });

  return (
    <>
      <Trail target={root} kind={outfit.trail} />
      <group ref={root} rotation={[0, 0.5, 0]}>
        <mesh
          position={[0, 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.shadow}
        >
          <circleGeometry args={[0.32, 20]} />
        </mesh>
        <group ref={body} position={[0, 0.33, 0]}>
          <CatBody outfit={outfit} />
        </group>
      </group>
    </>
  );
}

type CatPreview3DProps = { outfit: Outfit; label: string; fallback: ReactNode };

export function CatPreview3D({ outfit, label, fallback }: CatPreview3DProps) {
  const still = useReducedMotion() ?? false;

  return (
    <GLBoundary fallback={fallback}>
      <Canvas
        shadows
        orthographic
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        role="img"
        aria-label={label}
      >
        <Fit width={3} height={3} />
        <Lights />
        <mesh position={[0, -0.25, 0]} material={materials.board} receiveShadow>
          <cylinderGeometry args={[1.8, 1.8, 0.5, 8]} />
        </mesh>
        <mesh position={[0, -0.75, 0]} material={materials.island}>
          <cylinderGeometry args={[1.8, 1.3, 0.5, 8]} />
        </mesh>
        <Walker outfit={outfit} still={still} />
      </Canvas>
    </GLBoundary>
  );
}
