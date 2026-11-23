"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Every animation goes through motion; reducedMotion="user" honors prefers-reduced-motion app-wide.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
