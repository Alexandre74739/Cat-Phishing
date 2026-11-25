"use client";

import { useEffect } from "react";
import type { HackStage } from "@/lib/hackShow";
import { playSound } from "@/lib/sound";

const overlayAttribute = "data-hack-overlay";

export function useHackEffects(stage: HackStage, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;
    const others = [...document.body.children].filter(
      (element) => !element.hasAttribute(overlayAttribute),
    );
    others.forEach((element) => element.setAttribute("inert", ""));
    return () => others.forEach((element) => element.removeAttribute("inert"));
  }, [isActive]);

  useEffect(() => {
    const root = document.documentElement;
    if (!isActive) return;
    root.dataset.hack = stage;
    if (stage === "glitch") playSound("hum");
    if (stage === "cut") playSound("shutdown");
    return () => {
      delete root.dataset.hack;
    };
  }, [stage, isActive]);
}
