"use client";

import { ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconBurst } from "./IconBurst";

type RevealBurstProps = {
  active: boolean;
  badge: string;
};

export function RevealBurst({ active, badge }: RevealBurstProps) {
  return (
    <>
      <IconBurst active={active} />
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
