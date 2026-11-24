import type { Point } from "@/lib/levels";
import type { StepKind } from "@/lib/runtime";

export type WorldEvent = {
  kind: StepKind | "reset";
  at?: Point;
  duration?: number;
  key: number;
};
