"use client";

import { motion } from "motion/react";
import { Button, type ButtonAction } from "@/_components/ui/Button";
import { CheckList } from "@/_components/ui/CheckList";
import {
  AboutIllustration,
  type AboutIllustrationName,
} from "./AboutIllustration";

type AboutRowContent = {
  title: string;
  description: string;
  highlights: string[];
  action?: ButtonAction;
  illustration: AboutIllustrationName;
};

type AboutProps = {
  id: string;
  title: string;
  rows: AboutRowContent[];
};

const pop = { type: "spring", stiffness: 200, damping: 22 } as const;

export function About({ id, title, rows }: AboutProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <h2 id={`${id}-title`} className="sr-only">
        {title}
      </h2>
      <div className="mx-auto flex max-w-6xl flex-col gap-20 lg:gap-28">
        {rows.map((row, index) => (
          <AboutRow key={row.title} row={row} reversed={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function AboutRow({
  row: { title, description, highlights, action, illustration },
  reversed,
}: {
  row: AboutRowContent;
  reversed: boolean;
}) {
  const from = reversed ? 40 : -40;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, x: from }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={pop}
        className={reversed ? "lg:order-last" : ""}
      >
        <AboutIllustration name={illustration} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -from }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...pop, delay: 0.1 }}
        className="flex flex-col items-center text-center lg:items-start lg:text-left"
      >
        <h3 className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl">
          {title}
        </h3>
        <p className="mt-5 max-w-xl text-lg font-semibold text-ink-soft">
          {description}
        </p>
        <CheckList
          items={highlights}
          className="mt-6 flex flex-col gap-3 text-left"
        />
        {action && (
          <Button {...action} className="mt-8">
            {action.label}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
