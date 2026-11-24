"use client";

import { ArrowLeft, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import type { PlayerTexts } from "@/lib/playerTexts";
import { playClickSound } from "@/lib/sound";
import { PlayerDialogView } from "./PlayerDialogView";
import { dialogTitleId, type PlayerScreen } from "./types";

type PlayerDialogProps = { texts: PlayerTexts; onClose: () => void };

const parentOf = (screen: PlayerScreen): PlayerScreen =>
  screen.name === "edit" || screen.name === "remove"
    ? { name: "player", id: screen.id }
    : { name: "players" };

export function PlayerDialog({ texts, onClose }: PlayerDialogProps) {
  const [screen, setScreen] = useState<PlayerScreen>({ name: "players" });
  const box = useRef<HTMLDivElement>(null);
  useDismiss(true, onClose, { box });

  useEffect(() => box.current?.focus(), [screen.name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/50 px-3 py-8 sm:items-center sm:px-6"
    >
      <motion.div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative w-full max-w-125 outline-none"
      >
        <span
          aria-hidden="true"
          className="toon absolute inset-0 translate-x-2 translate-y-2 rounded-[30px] bg-grape sm:translate-x-3 sm:translate-y-3"
        />
        <div className="toon relative rounded-[30px] bg-paper px-4 pt-18 pb-6 text-center text-ink sm:px-8 sm:pb-8">
          {screen.name !== "players" && (
            <CornerButton
              label={texts.back}
              side="left-4"
              onClick={() => setScreen(parentOf(screen))}
            >
              <ArrowLeft size={24} strokeWidth={3} aria-hidden="true" />
            </CornerButton>
          )}
          <CornerButton label={texts.close} side="right-4" onClick={onClose}>
            <X size={24} strokeWidth={3} aria-hidden="true" />
          </CornerButton>
          <PlayerDialogView texts={texts} screen={screen} go={setScreen} />
        </div>
      </motion.div>
    </motion.div>
  );
}

type CornerButtonProps = {
  label: string;
  side: string;
  children: ReactNode;
  onClick: () => void;
};

function CornerButton({ label, side, children, onClick }: CornerButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        playClickSound();
        onClick();
      }}
      className={`toon pressable absolute top-4 ${side} grid size-12 place-items-center rounded-full bg-paper text-ink`}
    >
      {children}
    </button>
  );
}
