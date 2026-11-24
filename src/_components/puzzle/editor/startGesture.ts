import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import type { Block } from "@/lib/blocks";
import { holdDelay, type Gesture } from "./types";

// Touch: a still press (or a sideways slide) grabs the block, a vertical swipe keeps scrolling.
export function startGesture(
  event: ReactPointerEvent,
  block: Block,
  fromPalette: boolean,
  pending: RefObject<Gesture | null>,
  begin: (gesture: Gesture) => void,
) {
  if (event.button !== 0 || pending.current) return;
  if ((event.target as HTMLElement).closest("button") && !fromPalette) return;
  event.stopPropagation();
  const touch = event.pointerType === "touch";
  if (!touch) event.preventDefault();
  const rect = event.currentTarget.getBoundingClientRect();
  const gesture: Gesture = {
    pointerId: event.pointerId,
    block,
    fromPalette,
    startX: event.clientX,
    startY: event.clientY,
    x: event.clientX,
    y: event.clientY,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    touch,
    armed: !touch,
    started: false,
    timer: 0,
  };
  try {
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  } catch {}
  if (touch)
    gesture.timer = window.setTimeout(() => {
      if (pending.current !== gesture || gesture.started) return;
      gesture.armed = true;
      begin(gesture);
    }, holdDelay);
  pending.current = gesture;
}
