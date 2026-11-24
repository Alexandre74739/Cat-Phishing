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
import { AnimatePresence, motion } from "motion/react";

type Particle = { Icon: LucideIcon; look: string; x: number; y: number };

const icons: LucideIcon[] = [Cat, Bug, Fish, Lock, ShieldCheck, CodeXml];
const looks = [
  "bg-lilac",
  "bg-orange-soft",
  "bg-action-soft",
  "bg-orange",
  "bg-mint",
  "bg-scene-deep",
];

const toParticles = (spread: number): Particle[] =>
  Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    const distance = (index % 2 === 0 ? 220 : 160) * spread;
    return {
      Icon: icons[index % icons.length],
      look: looks[index % looks.length],
      x: Math.cos(angle) * distance * 1.4,
      y: Math.sin(angle) * distance,
    };
  });

const smooth = [0.22, 1, 0.36, 1] as const;

type IconBurstProps = {
  active: boolean;
  spread?: number;
  className?: string;
};

export function IconBurst({
  active,
  spread = 1,
  className = "",
}: IconBurstProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid place-items-center ${className}`}
    >
      <AnimatePresence>
        {active &&
          toParticles(spread).map(({ Icon, look, x, y }, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x,
                y,
                scale: [0.4, 1.1, 1, 0.5],
                rotate: index % 2 === 0 ? 120 : -120,
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{
                duration: 1.6,
                delay: (index % 4) * 0.03,
                ease: smooth,
                opacity: { duration: 1.6, times: [0, 0.1, 0.65, 1] },
                scale: { duration: 1.6, times: [0, 0.25, 0.65, 1] },
              }}
              className={`toon absolute grid size-12 place-items-center rounded-xl text-ink ${look}`}
            >
              <Icon size={22} strokeWidth={2.5} />
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
