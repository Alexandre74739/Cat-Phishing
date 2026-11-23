"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

type DismissOptions = {
  box?: RefObject<HTMLElement | null>;
  closeAboveWidth?: number;
};

export function useDismiss(
  isOpen: boolean,
  close: () => void,
  { box, closeAboveWidth }: DismissOptions = {},
) {
  const onClose = useEffectEvent(close);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (box && !box.current?.contains(event.target as Node)) onClose();
    };
    const onResize = () => {
      if (closeAboveWidth && window.innerWidth >= closeAboveWidth) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, box, closeAboveWidth]);
}
