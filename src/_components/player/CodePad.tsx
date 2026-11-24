"use client";

import { Delete, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { codeLength } from "@/lib/cloud";
import { fillText } from "@/lib/fillText";
import { playClickSound } from "@/lib/sound";

type CodePadProps = {
  value: string[];
  progressLabel: string;
  eraseLabel: string;
  clearLabel: string;
  onChange: (code: string[]) => void;
};

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function CodePad({
  value,
  progressLabel,
  eraseLabel,
  clearLabel,
  onChange,
}: CodePadProps) {
  const isFull = value.length >= codeLength;
  const add = (digit: string) => onChange([...value, digit]);

  return (
    <div className="mx-auto w-full max-w-72">
      <p
        aria-live="polite"
        aria-label={fillText(progressLabel, {
          count: value.length,
          total: codeLength,
        })}
        className="grid grid-cols-4 gap-2"
      >
        {Array.from({ length: codeLength }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={`grid aspect-square place-items-center rounded-2xl border-[3px] font-display text-3xl ${value[index] ? "border-ink bg-paper shadow-pop" : "border-dashed border-ink/30 bg-cream"}`}
          >
            {value[index] && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {value[index]}
              </motion.span>
            )}
          </span>
        ))}
      </p>
      <div className="toon mt-4 grid grid-cols-3 gap-2 rounded-3xl bg-lilac p-3">
        {digits.map((digit) => (
          <Key key={digit} disabled={isFull} onPress={() => add(digit)}>
            {digit}
          </Key>
        ))}
        <Key
          label={clearLabel}
          tone="bg-orange-soft"
          disabled={!value.length}
          onPress={() => onChange([])}
        >
          <RotateCcw size={22} strokeWidth={2.75} aria-hidden="true" />
        </Key>
        <Key disabled={isFull} onPress={() => add("0")}>
          0
        </Key>
        <Key
          label={eraseLabel}
          tone="bg-orange-soft"
          disabled={!value.length}
          onPress={() => onChange(value.slice(0, -1))}
        >
          <Delete size={24} strokeWidth={2.5} aria-hidden="true" />
        </Key>
      </div>
    </div>
  );
}

type KeyProps = {
  label?: string;
  tone?: string;
  disabled: boolean;
  children: ReactNode;
  onPress: () => void;
};

function Key({
  label,
  tone = "bg-paper",
  disabled,
  children,
  onPress,
}: KeyProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={() => {
        playClickSound();
        onPress();
      }}
      className={`toon pressable grid min-h-12 place-items-center rounded-2xl font-display text-2xl disabled:opacity-40 sm:min-h-14 sm:text-3xl ${tone}`}
    >
      {children}
    </button>
  );
}
