"use client";

import { Cat, ShieldAlert, Smartphone, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button, type ButtonAction } from "@/_components/ui/Button";
import { IconBurst } from "./IconBurst";

type BannerProps = {
  id: string;
  title: string;
  highlight: string;
  text: string;
  action: ButtonAction;
};

const floatingIcons = [
  { Icon: Cat, className: "left-[4%] top-8 bg-sun", rotate: -12 },
  { Icon: Smartphone, className: "left-[10%] bottom-14 bg-pink", rotate: 8 },
  { Icon: ShieldAlert, className: "right-[4%] top-8 bg-lilac", rotate: 12 },
  { Icon: Zap, className: "right-[10%] bottom-16 bg-mint", rotate: -8 },
];

const pop = { type: "spring", stiffness: 260, damping: 18 } as const;
const slant = "[clip-path:polygon(0_0,100%_0,100%_calc(100%-40px),0_100%)]";

export function Banner({ id, title, highlight, text, action }: BannerProps) {
  const highlightRef = useRef<HTMLSpanElement>(null);
  const burst = useInView(highlightRef, { once: true, amount: "all" });

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 bg-ink py-[3px] ${slant}`}
    >
      <div
        className={`relative overflow-hidden bg-sky-soft pt-10 pb-16 sm:pt-12 sm:pb-20 ${slant}`}
      >
        {floatingIcons.map(({ Icon, className, rotate }, index) => (
          <motion.span
            key={className}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate }}
            viewport={{ once: true }}
            transition={{ ...pop, delay: 0.2 + index * 0.1 }}
            className={`absolute hidden rounded-2xl xl:block ${className}`}
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="toon grid size-14 place-items-center rounded-2xl text-ink"
            >
              <Icon size={28} strokeWidth={2.5} />
            </motion.span>
          </motion.span>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={pop}
          className="relative isolate mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:gap-10 lg:text-left"
        >
          <div className="flex-1">
            <h2
              id={`${id}-title`}
              className="font-display text-3xl leading-tight tracking-wide text-ink sm:text-4xl lg:text-5xl"
            >
              {title}{" "}
              <span ref={highlightRef} className="relative inline-block">
                <IconBurst active={burst} spread={0.5} className="-z-10" />
                <motion.span
                  initial={{ rotate: 0, scale: 0.8 }}
                  whileInView={{ rotate: -3, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...pop, delay: 0.3 }}
                  className="toon inline-block rounded-xl bg-sun px-2"
                >
                  {highlight}
                </motion.span>
              </span>
            </h2>
            <p className="mt-4 max-w-3xl text-lg font-semibold text-ink sm:text-xl">
              {text}
            </p>
          </div>
          <Button {...action} className="w-full shrink-0 sm:w-auto">
            {action.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
