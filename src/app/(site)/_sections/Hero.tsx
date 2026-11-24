"use client";

import { Play } from "lucide-react";
import { motion } from "motion/react";
import { Button, type ButtonAction } from "@/_components/ui/Button";
import { CheckList } from "@/_components/ui/CheckList";
import { GutterTiles, NearTiles } from "./Tiles";

type HeroProps = {
  title: string;
  highlight: string;
  description: string;
  actions: ButtonAction[];
  highlights: string[];
  video?: { src: string; poster?: string; label: string };
};

const pop = { type: "spring", stiffness: 260, damping: 20 } as const;

export function Hero({
  title,
  highlight,
  description,
  actions,
  highlights,
  video,
}: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="dots absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pb-44 min-[1600px]:pb-16">
        <GutterTiles />
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={pop}
          className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <NearTiles column="text" />
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[1.05] tracking-wide sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {title}{" "}
            <span className="whitespace-nowrap text-grape">{highlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-ink sm:text-xl xl:text-2xl">
            {description}
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            {actions.map((action) => (
              <Button key={action.href} {...action}>
                {action.label}
              </Button>
            ))}
          </div>
          <CheckList
            items={highlights}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start xl:text-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...pop, delay: 0.15 }}
          className="relative mr-3 mb-3"
        >
          <NearTiles column="video" />
          <div
            aria-hidden="true"
            className="toon absolute inset-0 translate-x-3 translate-y-3 rounded-[30px] bg-grape"
          />
          <div className="toon dots relative aspect-video w-full overflow-hidden rounded-[30px] bg-mint">
            {video ? (
              <video
                src={video.src}
                poster={video.poster}
                aria-label={video.label}
                autoPlay
                muted
                loop
                playsInline
                className="size-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="grid size-full place-items-center"
              >
                <span className="toon grid size-20 place-items-center rounded-full bg-paper text-ink">
                  <Play size={36} strokeWidth={3} className="translate-x-0.5" />
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
