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
  "bg-pink",
  "bg-coral",
  "bg-sky",
  "bg-sun",
  "bg-mint",
  "bg-lilac",
];

const particles: Particle[] = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2;
  const distance = index % 2 === 0 ? 220 : 160;
  return {
    Icon: icons[index % icons.length],
    look: looks[index % looks.length],
    x: Math.cos(angle) * distance * 1.4,
    y: Math.sin(angle) * distance,
  };
});

const smooth = [0.22, 1, 0.36, 1] as const;

type RevealBurstProps = {
  active: boolean;
  badge: string;
};

export function RevealBurst({ active, badge }: RevealBurstProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <AnimatePresence>
          {active &&
            particles.map(({ Icon, look, x, y }, index) => (
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
      <div className="mt-8 flex min-h-14 justify-center">
        <AnimatePresence>
          {active && (
            <motion.p
              role="status"
              initial={{ opacity: 0, scale: 2.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.25, ease: "easeIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 14,
                delay: 0.4,
              }}
              className="toon flex items-center gap-3 rounded-2xl bg-mint px-5 py-2 font-display text-xl tracking-wide sm:text-2xl"
            >
              <ShieldCheck size={24} strokeWidth={2.75} aria-hidden="true" />
              {badge}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
