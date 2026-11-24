"use client";

import {
  Bug,
  Cat,
  CodeXml,
  Fish,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

type TileSpec = {
  Icon: LucideIcon;
  look: string;
  column: "text" | "video";
  near: string;
  gutter: string;
};

const tiles: TileSpec[] = [
  {
    Icon: Cat,
    look: "-rotate-6 bg-pink",
    column: "text",
    near: "top-full mt-12 left-[4%]",
    gutter: "top-[16%] right-full mr-14",
  },
  {
    Icon: Lock,
    look: "rotate-6 bg-sun",
    column: "video",
    near: "bottom-full mb-6 right-[8%]",
    gutter: "top-[18%] left-full ml-12",
  },
  {
    Icon: Fish,
    look: "rotate-6 bg-sky",
    column: "video",
    near: "bottom-full mb-6 left-[16%]",
    gutter: "top-[48%] right-full mr-24",
  },
  {
    Icon: ShieldCheck,
    look: "-rotate-12 bg-mint",
    column: "video",
    near: "top-full mt-14 left-[12%]",
    gutter: "top-[50%] left-full ml-24",
  },
  {
    Icon: Bug,
    look: "rotate-12 bg-coral",
    column: "text",
    near: "top-full mt-20 left-[46%]",
    gutter: "bottom-[12%] right-full mr-10",
  },
  {
    Icon: CodeXml,
    look: "-rotate-6 bg-lilac",
    column: "video",
    near: "top-full mt-10 right-[6%]",
    gutter: "bottom-[10%] left-full ml-14",
  },
];

export function GutterTiles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden min-[1600px]:block"
    >
      {tiles.map((tile, index) => (
        <Tile
          key={tile.look}
          tile={tile}
          index={index}
          className={`absolute ${tile.gutter}`}
        />
      ))}
    </div>
  );
}

export function NearTiles({ column }: { column: TileSpec["column"] }) {
  return tiles.map((tile, index) =>
    tile.column === column ? (
      <Tile
        key={tile.look}
        tile={tile}
        index={index}
        className={`absolute max-lg:hidden min-[1600px]:hidden ${tile.near}`}
      />
    ) : null,
  );
}

type TileProps = {
  tile: TileSpec;
  index: number;
  className: string;
};

function Tile({ tile: { Icon, look }, index, className }: TileProps) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: 0.3 + index * 0.08 },
        scale: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3 + index * 0.08,
        },
        y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`toon grid size-14 place-items-center rounded-2xl text-ink ${look} ${className}`}
    >
      <Icon size={26} strokeWidth={2.5} />
    </motion.span>
  );
}
