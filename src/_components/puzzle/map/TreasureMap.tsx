"use client";

import { Flag, Flame, KeyRound, MapPin, Route } from "lucide-react";
import { motion } from "motion/react";
import type { CourseLock } from "@/lib/courseProgress";
import { MapPiece } from "./MapPiece";

const icons: Record<string, typeof MapPin> = {
  "boot-camp": Flag,
  "password-valley": KeyRound,
  "server-volcano": Flame,
  "master-maze": Route,
};

type TreasureMapProps = {
  pieces: CourseLock["courses"];
  fresh?: string[];
  label: string;
  className?: string;
  delay?: number;
};

export function TreasureMap({
  pieces,
  fresh = [],
  label,
  className = "size-48",
  delay = 0.4,
}: TreasureMapProps) {
  const complete = pieces.length > 0 && pieces.every(({ done }) => done);
  const order = pieces
    .map((piece, index) => ({ piece, index }))
    .sort((a, b) => Number(a.piece.done) - Number(b.piece.done));

  return (
    <svg
      viewBox="-6 -6 212 212"
      className={`max-w-full ${className}`}
      role="img"
      aria-label={label}
    >
      {order.map(({ piece, index }) => (
        <MapPiece
          key={piece.slug}
          index={index}
          title={piece.title}
          color={piece.color}
          Icon={icons[piece.slug] ?? MapPin}
          found={piece.done}
          fresh={fresh.includes(piece.slug)}
          delay={delay}
        />
      ))}
      {complete && (
        <motion.g
          initial={fresh.length ? { opacity: 0, scale: 0 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.8, type: "spring", stiffness: 260 }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="20"
            strokeWidth="3"
            className="fill-paper stroke-ink"
          />
          <path
            d="M91 91 L109 109 M109 91 L91 109"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-coral"
          />
        </motion.g>
      )}
    </svg>
  );
}
