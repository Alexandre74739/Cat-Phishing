"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { CardId } from "@/lib/cards";
import { GameCard } from "../cards/GameCard";

type PanelProps = {
  title: string;
  text?: string;
  color?: keyof typeof colors;
  card?: CardId;
  children?: ReactNode;
};

const colors = { paper: "bg-paper", mint: "bg-mint" };

export function Panel({
  title,
  text,
  color = "paper",
  card,
  children,
}: PanelProps) {
  return (
    <motion.section
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`toon scroll-soft flex max-h-[45%] shrink-0 flex-col gap-3 overflow-y-auto rounded-2xl p-4 text-ink ${colors[color]}`}
    >
      <div
        className={`flex items-center gap-3 ${card ? "text-left" : "justify-center text-center"}`}
      >
        {card && (
          <GameCard
            card={card}
            sizes="56px"
            className="w-14 shrink-0 -rotate-6"
          />
        )}
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight tracking-wide break-words">
            {title}
          </h2>
          {text && <p className="mt-1 font-semibold sm:text-lg">{text}</p>}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
