"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import type * as THREE from "three";

type Size = { width: number; height: number };

function fitCamera(camera: THREE.Camera, view: Size, grid: Size) {
  const ortho = camera as THREE.OrthographicCamera;
  const span = grid.width + grid.height;
  ortho.position.set(9, 17, 11);
  ortho.lookAt(0, -0.3, 0);
  ortho.zoom = Math.min(
    view.width / (0.74 * span + 0.4),
    view.height / (0.55 * span + 1),
  );
  ortho.updateProjectionMatrix();
}

export function Fit({ width, height }: Size) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    fitCamera(camera, size, { width, height });
  }, [camera, size, width, height]);

  return null;
}
