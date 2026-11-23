"use client";

import { Blocks, Gamepad2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { playClickSound } from "@/lib/sound";

const variants = {
  grape: "bg-grape text-paper",
  sky: "bg-sky text-ink",
  sun: "bg-sun text-ink",
  mint: "bg-mint text-ink",
};

const sizes = {
  md: { className: "min-h-14 px-7 text-xl", icon: 22 },
  sm: { className: "min-h-12 px-5 text-lg", icon: 20 },
};

const icons = { play: Gamepad2, code: Blocks };

export type ButtonVariant = keyof typeof variants;
export type ButtonIcon = keyof typeof icons;

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  icon?: ButtonIcon;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "grape",
  size = "md",
  icon,
  onClick,
}: ButtonProps) {
  const Icon = icon && icons[icon];

  return (
    <Link
      href={href}
      onClick={() => {
        playClickSound();
        onClick?.();
      }}
      className={`${variants[variant]} ${sizes[size].className} toon pressable inline-flex items-center justify-center gap-2 rounded-full font-ui font-semibold whitespace-nowrap`}
    >
      {Icon && (
        <Icon
          size={sizes[size].icon}
          strokeWidth={2.5}
          aria-hidden="true"
          className="shrink-0"
        />
      )}
      {children}
    </Link>
  );
}
