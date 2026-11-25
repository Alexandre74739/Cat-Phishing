"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { playSound } from "@/lib/sound";
import { pick, spread } from "./random";

const deformations = [
  "stretch-x",
  "stretch-y",
  "squash",
  "tear",
  "invert",
  "split",
  "shift",
];
const barColors = ["bg-virus", "bg-terminal", "bg-gem", "bg-pink", "bg-void"];
const barBase = "absolute inset-x-0 mix-blend-difference";
const barCount = 8;
const rampMs = 7000;
const tickMs = 90;

export function GlitchStorm({ alert }: { alert: string }) {
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const title = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.glitch = "calm";
    const clear = () => {
      delete root.dataset.glitch;
    };
    if (reduceMotion) return clear;
    const start = performance.now();
    const tick = () => {
      const intensity = Math.min(1, 0.3 + (performance.now() - start) / rampMs);
      root.dataset.glitch =
        Math.random() < intensity ? pick(deformations) : "calm";
      if (Math.random() < 0.2 + 0.35 * intensity) playSound("glitch");
      bars.current.forEach((bar) => {
        if (!bar) return;
        bar.className = `${barBase} ${pick(barColors)}`;
        bar.style.opacity = String(
          Math.random() < intensity * 0.8 ? 0.4 + Math.random() * 0.6 : 0,
        );
        bar.style.top = `${Math.random() * 100}%`;
        bar.style.height = `${1 + Math.random() * 14 * intensity}%`;
        bar.style.transform = `translateX(${spread(60)}%) scaleX(${1 + Math.random() * 2})`;
      });
      if (title.current)
        title.current.style.transform = `translateX(${spread(30 * intensity)}%) scale(${1 + Math.random() * 1.6 * intensity}, ${1 - Math.random() * 0.5 * intensity}) skewX(${spread(50 * intensity)}deg)`;
    };
    const timer = window.setInterval(tick, tickMs);
    return () => {
      window.clearInterval(timer);
      clear();
    };
  }, [reduceMotion]);

  return (
    <>
      {Array.from({ length: barCount }, (_, index) => (
        <span
          key={index}
          ref={(bar) => {
            bars.current[index] = bar;
          }}
          aria-hidden="true"
          className={`${barBase} opacity-0`}
        />
      ))}
      <div
        ref={title}
        className="absolute inset-x-4 top-1/3 text-center will-change-transform"
      >
        <p
          data-text={alert}
          className="glitch font-display text-4xl tracking-wide text-virus uppercase"
        >
          {alert}
        </p>
      </div>
    </>
  );
}
