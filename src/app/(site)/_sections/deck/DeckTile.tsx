"use client";

import { Cat, Hand, Smartphone, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { DeckVisual } from "./DeckVisual";
import type { DeckTileContent } from "./types";

const icons = {
  cats: Cat,
  nope: Hand,
  action: Sparkles,
  phone: Smartphone,
};

const sizes = {
  large: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  tall: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  small: "sm:col-span-2 lg:col-span-2",
  wide: "sm:col-span-2 lg:col-span-4 lg:flex-row lg:items-center",
};

const colors = {
  sun: "bg-sun-soft",
  pink: "bg-pink",
  lilac: "bg-lilac",
  sky: "bg-sky-soft",
};

type DeckTileProps = {
  tile: DeckTileContent;
  index: number;
};

export function DeckTile({
  tile: { eyebrow, title, description, stat, size, color, icon, visual },
  index,
}: DeckTileProps) {
  const Icon = icons[icon];
  const large = size === "large";

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: index * 0.07,
      }}
      className={`toon relative flex flex-col gap-6 overflow-hidden rounded-[30px] p-6 text-ink sm:p-8 ${colors[color]} ${sizes[size]}`}
    >
      <div className="relative flex-1">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper py-1 pr-4 pl-1 font-ui text-sm font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
              <Icon size={16} strokeWidth={2.75} aria-hidden="true" />
            </span>
            {eyebrow}
          </span>
          {stat && (
            <span className="toon grid size-14 shrink-0 rotate-6 place-items-center rounded-2xl bg-paper font-display text-2xl">
              {stat}
            </span>
          )}
        </div>
        <h3
          className={`mt-4 font-display leading-tight tracking-wide ${large ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 font-semibold ${large ? "max-w-2xl text-lg" : "text-base"}`}
        >
          {description}
        </p>
      </div>
      {visual && (
        <div className="relative flex lg:min-w-0 lg:flex-1 [&>*]:flex-1">
          <DeckVisual visual={visual} />
        </div>
      )}
    </motion.li>
  );
}
