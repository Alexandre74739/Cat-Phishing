"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { pieceShapes } from "./pieceShapes";

type MapPieceProps = {
  index: number;
  title: string;
  color: string;
  Icon: LucideIcon;
  found: boolean;
  fresh: boolean;
  delay: number;
};

const sparkAngles = [0, 60, 120, 180, 240, 300];

export function MapPiece({
  index,
  title,
  color,
  Icon,
  found,
  fresh,
  delay,
}: MapPieceProps) {
  const { x, y, d } = pieceShapes[index];
  const cx = x + 50;
  const cy = y + 50;

  if (!found)
    return (
      <g>
        <title>{title}</title>
        <path
          d={d}
          strokeWidth="3"
          strokeDasharray="8 6"
          className="fill-cream stroke-ink-soft"
        />
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          fontSize="38"
          className="fill-ink-soft font-display"
        >
          ?
        </text>
      </g>
    );

  return (
    <motion.g
      initial={fresh ? { scale: 0, rotate: -30, opacity: 0 } : false}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 12 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <title>{title}</title>
      <path
        d={d}
        strokeWidth="4"
        strokeLinejoin="round"
        className="stroke-ink"
        style={{ fill: `var(--color-${color.replace("bg-", "")})` }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="27"
        strokeWidth="3"
        className="fill-paper stroke-ink"
      />
      <Icon
        x={cx - 17}
        y={cy - 17}
        size={34}
        strokeWidth={2.5}
        className="text-ink"
        aria-hidden="true"
      />
      {fresh &&
        sparkAngles.map((angle) => (
          <motion.circle
            key={angle}
            cx={cx}
            cy={cy}
            r="5"
            className="fill-orange stroke-ink"
            strokeWidth="2"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * 48,
              y: Math.sin((angle * Math.PI) / 180) * 48,
              opacity: 0,
            }}
            transition={{ delay: delay + 0.3, duration: 0.8 }}
          />
        ))}
    </motion.g>
  );
}
