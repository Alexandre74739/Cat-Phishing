"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { playClickSound } from "@/lib/sound";
import {
  icons,
  sizes,
  variants,
  type ButtonIcon,
  type ButtonVariant,
} from "./buttonLooks";

export type { ButtonIcon, ButtonVariant };

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
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
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
  type = "button",
  disabled,
  fullWidth,
  className = "",
  onClick,
}: ButtonProps) {
  const Icon = icon && icons[icon];
  const classes = `${variants[variant]} ${sizes[size].className} ${iconSide === "end" ? "flex-row-reverse" : ""} toon pressable inline-flex items-center justify-center gap-2 rounded-full font-ui font-semibold disabled:opacity-50 ${fullWidth ? "w-full py-2 text-center text-balance" : "whitespace-nowrap"} ${className}`;
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
        type={type}
        disabled={disabled}
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
