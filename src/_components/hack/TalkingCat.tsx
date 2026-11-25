"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/_components/ui/Button";
import type { HackTexts } from "@/lib/hackTexts";
import { playSound } from "@/lib/sound";

const letterMs = 32;

type TalkingCatProps = {
  texts: HackTexts["cat"];
  isReturning: boolean;
  onLeave: () => void;
};

export function TalkingCat({ texts, isReturning, onLeave }: TalkingCatProps) {
  const { dialogue, image } = texts;
  const [part, setPart] = useState(isReturning ? dialogue.length - 1 : 0);
  const [length, setLength] = useState(0);
  const line = dialogue[part];
  const isTalking = length < line.length;
  const isLast = part === dialogue.length - 1;

  useEffect(() => {
    if (!isTalking) return;
    const timer = window.setTimeout(() => {
      if (length % 3 === 0) playSound("voice");
      setLength(length + 1);
    }, letterMs);
    return () => window.clearTimeout(timer);
  }, [length, isTalking]);

  const next = () => {
    setPart(part + 1);
    setLength(0);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: "-30%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="glitch-box absolute bottom-24 -left-16 w-[85vw] max-w-md sm:-left-10"
      >
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          priority
          className={`h-auto w-full ${isTalking ? "talking" : ""}`}
        />
      </motion.div>
      <div className="toon absolute inset-x-3 bottom-3 rounded-3xl bg-paper p-4 pt-8 font-ui text-lg font-semibold text-ink sm:inset-x-6 sm:bottom-6 sm:p-6 sm:pt-12">
        <p className="toon absolute -top-5 left-5 -rotate-2 rounded-xl bg-grape px-4 py-1 font-display text-xl tracking-wide text-paper">
          {texts.name}
        </p>
        <p className="sr-only" aria-live="polite">
          {line}
        </p>
        <p aria-hidden="true" className="min-h-28 sm:min-h-20">
          {line.slice(0, length)}
        </p>
        <div className="mt-3 flex min-h-12 justify-end">
          {!isTalking &&
            (isLast ? (
              <Button
                href={texts.href}
                variant="mint"
                size="sm"
                icon="code"
                onClick={onLeave}
              >
                {texts.cta}
              </Button>
            ) : (
              <Button
                variant="grape"
                size="sm"
                icon="next"
                iconSide="end"
                onClick={next}
              >
                {texts.next}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
