"use client";

import { ArrowRight, RotateCcw, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CatFace } from "@/_components/cat/CatFace";
import { useDismiss } from "@/hooks/useDismiss";
import { playClickSound, playSound } from "@/lib/sound";

export type WinTexts = {
  title: string;
  text: string;
  stars: string;
  replay: string;
};

type WinDialogProps = {
  texts: WinTexts;
  stars: number;
  detail?: string;
  badges?: { label: string; names: string[] };
  next?: { label: string; href: string };
  onClose: () => void;
  onReplay: () => void;
};

const action =
  "toon pressable flex min-h-14 items-center justify-center gap-2 rounded-full px-5 font-ui text-lg font-semibold whitespace-nowrap";
const starDelay = 0.3;

export function WinDialog({
  texts,
  stars,
  detail,
  badges,
  next,
  onClose,
  onReplay,
}: WinDialogProps) {
  const box = useRef<HTMLDivElement>(null);
  useDismiss(true, onClose, { box });

  useEffect(() => {
    const timers = Array.from({ length: stars }, (_, index) =>
      setTimeout(
        () => playSound("star", index),
        (starDelay + index * 0.25) * 1000 + 150,
      ),
    );
    if (badges?.names.length)
      timers.push(setTimeout(() => playSound("badge"), 1400));
    return () => timers.forEach(clearTimeout);
  }, [stars, badges?.names.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 px-4 py-16"
    >
      <motion.div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="win-title"
        initial={{ scale: 0.4, rotate: -6, y: 60 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="toon relative w-110 max-w-full rounded-[32px] bg-paper p-6 pt-14 text-center sm:p-8 sm:pt-16"
      >
        <motion.span
          className="absolute -top-14 left-1/2 -ml-14"
          animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <CatFace mood="wow" size={112} />
        </motion.span>
        <h2 id="win-title" className="font-display text-4xl tracking-wide">
          {texts.title}
        </h2>
        <p className="my-4 flex justify-center gap-3" aria-label={texts.stars}>
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: starDelay + index * 0.25,
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Star
                size={52}
                strokeWidth={2.5}
                className={
                  index < stars
                    ? "fill-sun text-ink"
                    : "fill-ink/10 text-ink/30"
                }
              />
            </motion.span>
          ))}
        </p>
        <p className="text-lg font-semibold text-ink">{texts.text}</p>
        {detail && (
          <p className="mt-2 font-ui text-base font-semibold text-grape">
            {detail}
          </p>
        )}
        {badges && badges.names.length > 0 && (
          <motion.ul
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.3,
              type: "spring",
              stiffness: 300,
              damping: 14,
            }}
            aria-label={badges.label}
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
            {badges.names.map((name) => (
              <li
                key={name}
                className="toon flex items-center gap-2 rounded-full bg-lilac px-4 py-1.5 font-ui font-semibold"
              >
                <Trophy size={18} strokeWidth={2.5} aria-hidden="true" />
                {badges.label} {name}
              </li>
            ))}
          </motion.ul>
        )}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            autoFocus={!next}
            onClick={() => {
              playClickSound();
              onReplay();
            }}
            className={`${action} bg-paper sm:flex-1`}
          >
            <RotateCcw size={20} strokeWidth={2.5} aria-hidden="true" />
            {texts.replay}
          </button>
          {next && (
            <Link
              href={next.href}
              autoFocus
              onClick={playClickSound}
              className={`${action} bg-mint sm:flex-[1.6]`}
            >
              {next.label}
              <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
