"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { createTrail } from "./codeTrail";

const glyphSize = 16;

export function CodeRain({ words }: { words: string[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const styles = getComputedStyle(element);
    const green = styles.getPropertyValue("--color-terminal").trim();
    const black = styles.getPropertyValue("--color-void").trim();
    const ratio = Math.min(window.devicePixelRatio, 2);
    const width = element.clientWidth;
    const height = element.clientHeight;
    element.width = width * ratio;
    element.height = height * ratio;
    context.scale(ratio, ratio);
    context.fillStyle = black;
    context.fillRect(0, 0, width, height);
    context.font = `bold ${glyphSize}px monospace`;

    const text = words.join(" ");
    const randomIndex = () => Math.floor(Math.random() * text.length);
    const drops = Array.from({ length: Math.ceil(width / glyphSize) }, () => ({
      y: Math.random() * -height,
      index: randomIndex(),
    }));
    const trail = createTrail(text);
    const touch = (count: number) => (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      trail.add(event.clientX - box.left, event.clientY - box.top, count);
    };
    const onDown = touch(10);
    const onMove = touch(2);
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointermove", onMove);
    const stepMs = reduceMotion ? 250 : 45;
    let last = 0;
    let frame = 0;

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (time - last < stepMs) return;
      last = time;
      context.globalAlpha = 0.12;
      context.fillStyle = black;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;
      context.fillStyle = green;
      drops.forEach((drop, column) => {
        context.fillText(
          text[drop.index % text.length],
          column * glyphSize,
          drop.y,
        );
        drop.index += 1;
        drop.y += glyphSize;
        if (drop.y > height && Math.random() > 0.95) {
          drop.y = 0;
          drop.index = randomIndex();
        }
      });
      trail.draw(context, green);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointermove", onMove);
    };
  }, [words, reduceMotion]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="absolute inset-0 size-full touch-none"
    />
  );
}
