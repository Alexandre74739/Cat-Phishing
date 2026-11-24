"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Button, type ButtonAction } from "@/_components/ui/Button";
import { FaqEntry, type FaqItem } from "./FaqEntry";

type FaqProps = {
  id: string;
  title: string;
  intro: string;
  items: FaqItem[];
  action: ButtonAction;
};

const pop = { type: "spring", stiffness: 200, damping: 22 } as const;

export function Faq({ id, title, intro, items, action }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={pop}
          className="text-center lg:text-left"
        >
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-ink lg:mx-0">
            {intro}
          </p>
          <Button {...action} className="mt-8 w-full sm:w-auto">
            {action.label}
          </Button>
        </motion.div>
        <ul className="flex flex-col gap-4">
          {items.map((item, index) => (
            <motion.li
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...pop, delay: index * 0.05 }}
            >
              <FaqEntry
                item={item}
                id={`${id}-${index}`}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
