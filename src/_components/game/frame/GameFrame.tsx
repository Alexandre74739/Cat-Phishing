"use client";

import { Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import { playClickSound } from "@/lib/sound";
import { PlayersDrawer } from "./PlayersDrawer";

export type SideTexts = { title: string; open: string; close: string };

type GameFrameProps = {
  toolbar: ReactNode;
  side: SideTexts;
  players: ReactNode;
  children: ReactNode;
};

export function GameFrame({
  toolbar,
  side,
  players,
  children,
}: GameFrameProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 gap-5">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
        <div className="flex min-h-12 shrink-0 items-center justify-between gap-3">
          {toolbar}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setOpen(true);
            }}
            aria-expanded={open}
            className="toon pressable flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-paper px-4 font-ui font-semibold lg:hidden"
          >
            <Users size={20} strokeWidth={2.75} aria-hidden="true" />
            {side.open}
          </button>
        </div>
        {children}
      </div>
      <aside
        aria-label={side.title}
        className="toon hidden w-80 shrink-0 flex-col rounded-3xl bg-paper p-4 lg:flex"
      >
        <h2 className="font-display text-2xl tracking-wide">{side.title}</h2>
        <div className="scroll-soft mt-3 min-h-0 flex-1 overflow-y-auto p-1">
          {players}
        </div>
      </aside>
      {open && (
        <PlayersDrawer
          title={side.title}
          close={side.close}
          onClose={() => setOpen(false)}
        >
          {players}
        </PlayersDrawer>
      )}
    </div>
  );
}
