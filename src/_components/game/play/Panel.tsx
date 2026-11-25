"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  text?: string;
  color?: "paper" | "coral" | "lilac" | "sky";
  shake?: boolean;
  children?: ReactNode;
};

const colors = {
  paper: "bg-paper",
  coral: "bg-coral",
  lilac: "bg-lilac",
  sky: "bg-sky-soft",
};

export function Panel({
  title,
  text,
  color = "paper",
  shake,
  children,
}: PanelProps) {
  return (
    <motion.section
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={
        shake ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1 }
      }
      transition={{ duration: 0.4 }}
      className={`toon scroll-soft flex h-56 shrink-0 flex-col gap-2 overflow-y-auto rounded-4xl p-4 ${colors[color]}`}
    >
      <div className="text-center">
        <h2 className="font-display text-2xl leading-tight tracking-wide break-words">
          {title}
        </h2>
        {text && <p className="mt-1 font-semibold sm:text-lg">{text}</p>}
      </div>
      {children && (
        <div className="mt-auto flex flex-col gap-2">{children}</div>
      )}
    </motion.section>
  );
}
