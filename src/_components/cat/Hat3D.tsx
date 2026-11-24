"use client";

import { fancyHatModels } from "./fancyHatModels";
import { hatModels } from "./hatModels";

export function Hat3D({ id }: { id: string }) {
  return hatModels[id] ?? fancyHatModels[id] ?? null;
}
