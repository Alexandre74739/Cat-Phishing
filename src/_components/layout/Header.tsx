"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { PlayerMenu } from "@/_components/player/PlayerMenu";
import type { ButtonIcon } from "@/_components/ui/Button";
import { icons } from "@/_components/ui/buttonLooks";
import {
  InstallButton,
  type InstallTexts,
} from "@/_components/ui/InstallButton";
import { Logo } from "@/_components/ui/Logo";
import { useDismiss } from "@/hooks/useDismiss";
import type { PlayerTexts } from "@/lib/playerTexts";
import { playClickSound } from "@/lib/sound";

type HeaderLink = { label: string; href: string };

type HeaderPage = HeaderLink & { icon: ButtonIcon };

type HeaderProps = {
  pages: HeaderPage[];
  sections: { title: string; links: HeaderLink[] };
  install: InstallTexts;
  players: PlayerTexts;
  menu: { open: string; close: string };
};

export function Header({
  pages,
  sections,
  install,
  players,
  menu,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const box = useRef<HTMLElement>(null);
  const close = () => setIsOpen(false);
  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useDismiss(isOpen, close, { box, closeAboveWidth: 1024 });

  return (
    <header ref={box} className="fixed inset-x-0 top-0 z-40">
      <div className="relative z-10 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-items-start">
          <Logo small />
          <nav aria-label="Pages" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {pages.map((page) => (
                <li key={page.href}>
                  <PageLink page={page} isCurrent={isCurrent(page.href)} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-3 lg:justify-self-end">
            <PlayerMenu texts={players} />
            <span className="hidden lg:block">
              <InstallButton {...install} />
            </span>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? menu.close : menu.open}
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
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {pages.map((page, index) => (
                  <motion.li
                    key={page.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <PageTile
                      page={page}
                      isCurrent={isCurrent(page.href)}
                      onClick={close}
                    />
                  </motion.li>
                ))}
              </ul>
              <div>
                <p className="font-display text-lg tracking-wide text-ink">
                  {sections.title}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sections.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex min-h-12 items-center rounded-full border-[3px] border-ink bg-paper px-4 font-ui text-lg font-semibold text-ink hover:bg-lilac motion-safe:transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <InstallButton {...install} inline />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

type PageLinkProps = {
  page: HeaderPage;
  isCurrent: boolean;
  onClick?: () => void;
};

function PageLink({ page, isCurrent }: PageLinkProps) {
  return (
    <Link
      href={page.href}
      aria-current={isCurrent ? "page" : undefined}
      className={`flex min-h-12 items-center rounded-lg font-ui text-lg font-semibold decoration-[3px] underline-offset-8 hover:text-grape motion-safe:transition-colors ${isCurrent ? "text-grape underline" : "text-ink"}`}
    >
      {page.label}
    </Link>
  );
}

function PageTile({ page, isCurrent, onClick }: PageLinkProps) {
  const Icon = icons[page.icon];
  return (
    <Link
      href={page.href}
      onClick={onClick}
      aria-current={isCurrent ? "page" : undefined}
      className={`toon pressable flex items-center gap-3 rounded-2xl px-4 py-3 font-ui text-xl font-semibold text-ink ${isCurrent ? "bg-lilac" : "bg-paper"}`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border-[3px] border-ink bg-orange-soft">
        <Icon size={22} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="grow">{page.label}</span>
      <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
    </Link>
  );
}
