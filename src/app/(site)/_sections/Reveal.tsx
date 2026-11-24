"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useCenteredTop } from "@/hooks/useCenteredTop";
import { toRevealWords } from "@/lib/revealWords";
import { RevealBurst } from "./RevealBurst";
import { RevealWord } from "./RevealWord";

type RevealProps = {
  id: string;
  text: string;
  keywords: string[];
  badge: string;
};

const keywordColors = ["bg-orange", "bg-lilac", "bg-mint", "bg-orange-soft"];
const revealEnd = 0.7;
const firstLineVisible = 48;

export function Reveal({ id, text, keywords, badge }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textTop = useCenteredTop(stickyRef, contentRef);
  const [revealed, setRevealed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${textTop + firstLineVisible}px end`, "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setRevealed(
      (wasRevealed) =>
        progress >= revealEnd || (wasRevealed && progress > revealEnd - 0.05),
    );
  });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative h-[200svh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16"
      >
        <div
          ref={contentRef}
          className="relative mx-auto max-w-6xl text-center"
        >
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-snug tracking-wide sm:text-4xl lg:text-5xl"
          >
            {toRevealWords(text, keywords, revealEnd).map(
              ({ word, range, keywordIndex }, index) => (
                <RevealWord
                  key={`${word}-${index}`}
                  word={word}
                  range={range}
                  progress={scrollYProgress}
                  color={
                    keywordIndex === null
                      ? undefined
                      : keywordColors[keywordIndex % keywordColors.length]
                  }
                  revealed={revealed}
                  delay={(keywordIndex ?? 0) * 0.12}
                />
              ),
            )}
          </h2>
          <RevealBurst active={revealed} badge={badge} />
        </div>
      </div>
    </section>
  );
}
