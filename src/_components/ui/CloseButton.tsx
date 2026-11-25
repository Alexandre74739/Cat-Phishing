"use client";

import { X } from "lucide-react";
import { playClickSound } from "@/lib/sound";

type CloseButtonProps = {
  label: string;
  onClick: () => void;
  autoFocus?: boolean;
  tone?: keyof typeof tones;
  className?: string;
};

const tones = {
  paper: "bg-paper text-ink",
  virus: "bg-virus-light text-virus-deep",
};

export function CloseButton({
  label,
  onClick,
  autoFocus,
  tone = "paper",
  className = "",
}: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        playClickSound();
        onClick();
      }}
      aria-label={label}
      autoFocus={autoFocus}
      className={`toon pressable grid size-12 shrink-0 place-items-center rounded-full ${tones[tone]} ${className}`}
    >
      <X size={22} strokeWidth={3} aria-hidden="true" />
    </button>
  );
}
