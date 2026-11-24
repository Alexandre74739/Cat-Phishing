"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Avatar } from "@/_components/ui/Avatar";
import { usePlayers } from "@/hooks/usePlayers";
import type { PlayerTexts } from "@/lib/playerTexts";
import { playClickSound } from "@/lib/sound";
import { PlayerDialog } from "./PlayerDialog";

export function PlayerMenu({ texts }: { texts: PlayerTexts }) {
  const { active } = usePlayers();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={texts.open}
        aria-haspopup="dialog"
        title={texts.open}
        onClick={() => {
          playClickSound();
          setIsOpen(true);
        }}
        className="toon pressable grid size-12 place-items-center rounded-full bg-paper"
      >
        <Avatar id={active.avatar} size={32} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <PlayerDialog texts={texts} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
