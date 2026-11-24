"use client";

import { ArrowRight, Blocks, Download, Gamepad2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { playClickSound } from "@/lib/sound";

const variants = {
  grape: "bg-grape text-paper",
  orange: "bg-orange text-ink",
  mint: "bg-mint text-ink",
};

const sizes = {
  md: { className: "min-h-14 px-7 text-xl", icon: 22 },
  sm: { className: "min-h-12 px-5 text-lg", icon: 20 },
};

const icons = {
  play: Gamepad2,
  code: Blocks,
  install: Download,
  next: ArrowRight,
};

export type ButtonVariant = keyof typeof variants;
export type ButtonIcon = keyof typeof icons;

export type ButtonAction = {
  label: string;
  href: string;
  variant: ButtonVariant;
  icon: ButtonIcon;
  iconSide?: "start" | "end";
};

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  icon?: ButtonIcon;
  iconSide?: "start" | "end";
  expanded?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "grape",
  size = "md",
  icon,
  iconSide = "start",
  expanded,
  className = "",
  onClick,
}: ButtonProps) {
  const Icon = icon && icons[icon];
  const classes = `${variants[variant]} ${sizes[size].className} ${iconSide === "end" ? "flex-row-reverse" : ""} toon pressable inline-flex items-center justify-center gap-2 rounded-full font-ui font-semibold whitespace-nowrap ${className}`;
  const handleClick = () => {
    playClickSound();
    onClick?.();
  };
  const content = (
    <>
      {Icon && (
        <Icon
          size={sizes[size].icon}
          strokeWidth={2.5}
          aria-hidden="true"
          className="shrink-0"
        />
      )}
      {children}
    </>
  );

  if (!href) {
    return (
      <button
        type="button"
        aria-expanded={expanded}
        onClick={handleClick}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={classes}>
      {content}
    </Link>
  );
}
