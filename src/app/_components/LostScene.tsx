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
import { Button } from "@/_components/ui/Button";
import type { LostTexts } from "@/lib/lostTexts";

const pop = { type: "spring", stiffness: 260, damping: 20 } as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { ...pop, delay },
});

const sideIcons: { Icon: LucideIcon; className: string; rotate: number }[] = [
  { Icon: Cat, className: "left-[6%] top-[24%] bg-lilac", rotate: -8 },
  { Icon: Lock, className: "left-[14%] top-[50%] bg-orange", rotate: 10 },
  { Icon: Fish, className: "left-[7%] bottom-[18%] bg-mint", rotate: -12 },
  { Icon: Bug, className: "right-[6%] top-[24%] bg-orange-soft", rotate: 12 },
  {
    Icon: ShieldCheck,
    className: "right-[14%] top-[50%] bg-action-soft",
    rotate: -10,
  },
  { Icon: CodeXml, className: "right-[7%] bottom-[18%] bg-mint", rotate: 8 },
];

export function LostScene({ texts }: { texts: LostTexts }) {
  return (
    <main className="dots relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20 text-center sm:px-6">
      {sideIcons.map(({ Icon, className, rotate }, index) => (
        <motion.span
          key={className}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate }}
          transition={{ ...pop, delay: 0.3 + index * 0.08 }}
          className={`toon absolute hidden size-14 place-items-center rounded-2xl text-ink lg:grid ${className}`}
        >
          <Icon size={28} strokeWidth={2.5} />
        </motion.span>
      ))}
      <motion.p
        {...rise(0)}
        className="font-display text-7xl tracking-wide text-grape sm:text-8xl"
      >
        {texts.code}
      </motion.p>
      <motion.h1
        {...rise(0.1)}
        className="mt-4 font-display text-4xl leading-tight tracking-wide sm:text-5xl"
      >
        {texts.title}{" "}
        <motion.span
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ rotate: -3, scale: 1 }}
          transition={{ ...pop, delay: 0.3 }}
          className="toon inline-block rounded-xl bg-orange px-2"
        >
          {texts.highlight}
        </motion.span>
      </motion.h1>
      <motion.p
        {...rise(0.2)}
        className="mt-6 max-w-xl text-lg font-semibold sm:text-xl"
      >
        {texts.message}
      </motion.p>
      <motion.div
        {...rise(0.3)}
        className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
      >
        {texts.actions.map((action) => (
          <Button key={action.href} {...action}>
            {action.label}
          </Button>
        ))}
      </motion.div>
    </main>
  );
}
