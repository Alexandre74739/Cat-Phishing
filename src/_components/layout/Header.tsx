"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/_components/ui/Avatar";
import {
  Button,
  type ButtonIcon,
  type ButtonVariant,
} from "@/_components/ui/Button";
import {
  InstallButton,
  type InstallTexts,
} from "@/_components/ui/InstallButton";
import { Logo } from "@/_components/ui/Logo";
import { playClickSound } from "@/lib/sound";

const MotionLink = motion.create(Link);

type HeaderSection = { id: string; label: string };

type HeaderAction = {
  label: string;
  href: string;
  icon: ButtonIcon;
  iconSide?: "start" | "end";
  variant: ButtonVariant;
};

type HeaderProps = {
  sections: HeaderSection[];
  actions: HeaderAction[];
  install: InstallTexts;
  account: { label: string; href: string; avatarId: string };
};

export function Header({ sections, actions, install, account }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="relative z-10 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo small />
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/#${section.id}`}
                    className="flex min-h-12 items-center rounded-full px-2 font-ui text-lg font-semibold text-ink hover:text-grape motion-safe:transition-colors"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul
            aria-label="Get in"
            className="ml-auto flex items-center gap-3 lg:ml-0"
          >
            <li>
              <Link
                href={account.href}
                aria-label={account.label}
                title={account.label}
                onClick={playClickSound}
                className="toon pressable grid size-12 place-items-center rounded-full bg-paper"
              >
                <Avatar id={account.avatarId} size={32} />
              </Link>
            </li>
            <li className="hidden lg:block">
              <InstallButton {...install} />
            </li>
            {actions.map((action) => (
              <li key={action.href} className="hidden lg:block">
                <Button
                  href={action.href}
                  variant={action.variant}
                  icon={action.icon}
                  iconSide={action.iconSide}
                  size="sm"
                >
                  {action.label}
                </Button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              playClickSound();
              setIsOpen((open) => !open);
            }}
            className="toon pressable grid size-12 place-items-center rounded-full bg-paper text-ink lg:hidden"
          >
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              className="block"
            >
              {isOpen ? (
                <X size={26} strokeWidth={3} aria-hidden="true" />
              ) : (
                <Menu size={26} strokeWidth={3} aria-hidden="true" />
              )}
            </motion.span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b-[3px] border-ink bg-cream lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <MotionLink
                    href={`/#${section.id}`}
                    onClick={close}
                    whileHover="hover"
                    className="toon pressable flex items-center justify-between rounded-2xl bg-paper px-4 py-3 font-ui text-xl font-semibold text-ink"
                  >
                    {section.label}
                    <motion.span variants={{ hover: { x: 6 } }}>
                      <ArrowRight
                        size={20}
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </motion.span>
                  </MotionLink>
                </motion.li>
              ))}
              <li className="mt-2 grid gap-3 sm:grid-cols-2">
                {actions.map((action) => (
                  <Button
                    key={action.href}
                    href={action.href}
                    variant={action.variant}
                    icon={action.icon}
                    iconSide={action.iconSide}
                    onClick={close}
                  >
                    {action.label}
                  </Button>
                ))}
                <InstallButton {...install} inline />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
