"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseButton } from "@/_components/ui/CloseButton";
import { useDismiss } from "@/hooks/useDismiss";
import type { CardId } from "@/lib/cards";
import { playSound } from "@/lib/sound";
import { GameCard } from "./GameCard";

type CardZoomProps = {
  card: CardId;
  title: string;
  close: string;
  onClose: () => void;
  children: ReactNode;
};

export function CardZoom({
  card,
  title,
  close,
  onClose,
  children,
}: CardZoomProps) {
  const reduceMotion = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  useDismiss(true, onClose, { box });

  useEffect(() => playSound("zap"), []);

  return createPortal(
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/40 p-4">
      <motion.div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-zoom-title"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="toon scroll-soft flex max-h-full w-full max-w-2xl gap-4 overflow-y-auto rounded-4xl bg-cream p-5 sm:gap-6 sm:p-6"
      >
        <div className="glitch-box relative w-[38%] max-w-60 shrink-0 self-center -rotate-3">
          <GameCard
            card={card}
            alt={title}
            sizes="240px"
            className="shadow-pop"
          />
          <GameCard
            card={card}
            sizes="240px"
            className="glitch-layer hue-rotate-90"
          />
          <GameCard
            card={card}
            sizes="240px"
            className="glitch-layer -hue-rotate-90 [animation-delay:-1.2s]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h2
              id="card-zoom-title"
              className="font-display text-3xl tracking-wide sm:text-4xl"
            >
              {title}
            </h2>
            <CloseButton label={close} onClick={onClose} autoFocus />
          </div>
          {children}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
