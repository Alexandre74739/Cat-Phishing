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
  shake?: boolean;
  children?: ReactNode;
};

const colors = {
  paper: { box: "bg-paper text-ink", title: "" },
  mint: { box: "bg-mint text-ink", title: "" },
  night: { box: "bg-card-back text-cream", title: "text-orange" },
  virus: { box: "bg-virus-deep text-cream", title: "text-virus-light" },
};

export function Panel({
  title,
  text,
  color = "paper",
  card,
  shake,
  children,
}: PanelProps) {
  const look = colors[color];

  return (
    <motion.section
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={
        shake ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1 }
      }
      transition={{ duration: 0.4 }}
      className={`toon scroll-soft flex h-56 shrink-0 flex-col gap-2 overflow-y-auto rounded-2xl p-4 ${look.box}`}
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
          <h2
            className={`font-display text-2xl leading-tight tracking-wide break-words ${look.title}`}
          >
            {title}
          </h2>
          {text && <p className="mt-1 font-semibold sm:text-lg">{text}</p>}
        </div>
      </div>
      {children && (
        <div className="mt-auto flex flex-col gap-2">{children}</div>
      )}
    </motion.section>
  );
}
