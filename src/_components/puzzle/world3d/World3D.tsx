"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import type { World } from "@/lib/levels";
import { GLBoundary } from "./GLBoundary";
import { Scene } from "./Scene";
import type { WorldEvent } from "./types";

type World3DProps = {
  world: World;
  event: WorldEvent;
  label: string;
  fallback: ReactNode;
};

export function World3D({ world, event, label, fallback }: World3DProps) {
  return (
    <GLBoundary fallback={fallback}>
      <Canvas
        shadows
        orthographic
        dpr={[1, 2]}
        camera={{ position: [9, 17, 11], zoom: 40, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        role="img"
        aria-label={label}
      >
        <Scene world={world} event={event} />
      </Canvas>
    </GLBoundary>
  );
}
