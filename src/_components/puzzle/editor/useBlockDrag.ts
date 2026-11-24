"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { insertBlock, removeBlock, type Block } from "@/lib/blocks";
import { playSound } from "@/lib/sound";
import { findDropTarget } from "./dropTarget";
import { startGesture } from "./startGesture";
import {
  touchLift,
  type DropTarget,
  type Dragging,
  type Gesture,
} from "./types";

type DragOptions = {
  program: Block[];
  disabled: boolean;
  onChange: (program: Block[]) => void;
  onTap: (block: Block, fromPalette: boolean) => void;
};

export function useBlockDrag({
  program,
  disabled,
  onChange,
  onTap,
}: DragOptions) {
  const [dragging, setDragging] = useState<Dragging | null>(null);
  const [target, setTarget] = useState<DropTarget | null>(null);
  const [overTrash, setOverTrash] = useState(false);
  const [hiddenId, setHiddenId] = useState<string | null>(null);
  const pending = useRef<Gesture | null>(null);
  const targetRef = useRef<DropTarget | null>(null);

  const follow = (gesture: Gesture) => {
    const lift = gesture.touch ? touchLift : 0;
    const { block, x, y, offsetX, offsetY } = gesture;
    setDragging({ block, x, y, offsetX, offsetY, lift });
    const found = findDropTarget(x, y - lift);
    targetRef.current = found.target;
    setTarget(found.target);
    setOverTrash(found.overTrash);
  };

  const begin = (gesture: Gesture) => {
    gesture.started = true;
    playSound("pick");
    if (gesture.touch) navigator.vibrate?.(12);
    if (!gesture.fromPalette) setHiddenId(gesture.block.id);
    follow(gesture);
  };

  const clear = (gesture: Gesture) => {
    window.clearTimeout(gesture.timer);
    pending.current = null;
    targetRef.current = null;
    setTarget(null);
    setDragging(null);
    setOverTrash(false);
    setHiddenId(null);
  };

  const finish = useEffectEvent((gesture: Gesture) => {
    const drop = targetRef.current;
    clear(gesture);
    if (!gesture.started) return onTap(gesture.block, gesture.fromPalette);
    const base = gesture.fromPalette
      ? program
      : removeBlock(program, gesture.block.id);
    if (drop) {
      onChange(insertBlock(base, drop.listId, drop.index, gesture.block));
      playSound("snap");
    } else if (!gesture.fromPalette) {
      onChange(base);
      playSound("trash");
    }
  });

  const move = useEffectEvent((event: PointerEvent) => {
    const gesture = pending.current;
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    gesture.x = event.clientX;
    gesture.y = event.clientY;
    if (gesture.started) return follow(gesture);
    const dx = gesture.x - gesture.startX;
    const dy = gesture.y - gesture.startY;
    const distance = Math.hypot(dx, dy);
    if (gesture.touch && !gesture.armed) {
      if (distance < 8) return;
      if (Math.abs(dx) < Math.abs(dy)) return clear(gesture);
      gesture.armed = true;
    }
    if (distance >= 6) begin(gesture);
  });

  useEffect(() => {
    const matches = (event: PointerEvent) =>
      pending.current?.pointerId === event.pointerId ? pending.current : null;
    const up = (event: PointerEvent) => {
      const gesture = matches(event);
      if (gesture) finish(gesture);
    };
    const cancel = (event: PointerEvent) => {
      const gesture = matches(event);
      if (gesture) clear(gesture);
    };
    const blockScroll = (event: TouchEvent) => {
      if (pending.current?.armed && event.cancelable) event.preventDefault();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    window.addEventListener("touchmove", blockScroll, { passive: false });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, []);

  const grab = (
    event: ReactPointerEvent,
    block: Block,
    fromPalette: boolean,
  ) => {
    if (!disabled) startGesture(event, block, fromPalette, pending, begin);
  };

  return { dragging, target, overTrash, hiddenId, grab };
}
