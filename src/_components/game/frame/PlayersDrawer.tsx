"use client";

import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { CloseButton } from "@/_components/ui/CloseButton";
import { useDismiss } from "@/hooks/useDismiss";

type PlayersDrawerProps = {
  title: string;
  close: string;
  onClose: () => void;
  children: ReactNode;
};

export function PlayersDrawer({
  title,
  close,
  onClose,
  children,
}: PlayersDrawerProps) {
  const box = useRef<HTMLDivElement>(null);
  useDismiss(true, onClose, { box, closeAboveWidth: 1024 });

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-ink/40"
      />
      <motion.div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l-[3px] border-ink bg-cream p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl tracking-wide">{title}</h2>
          <CloseButton label={close} onClick={onClose} autoFocus />
        </div>
        <div className="scroll-soft mt-4 min-h-0 flex-1 overflow-y-auto p-1">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
