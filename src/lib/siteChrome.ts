import type { ComponentProps } from "react";
import type { Footer } from "@/_components/layout/Footer";
import type { Header } from "@/_components/layout/Header";
import { installGuide } from "./installGuide";
import { routes } from "./navigation";
import { playerTexts } from "./playerTexts";

const sections = [
  { id: "about", label: "About" },
  { id: "game", label: "The game" },
  { id: "puzzles", label: "Puzzles" },
  { id: "faq", label: "FAQ" },
];

const sectionLinks = sections.map((section) => ({
  label: section.label,
  href: `/#${section.id}`,
}));

const install = {
  label: "Install the app",
  help: {
    dialogLabel: "How to install the app",
    closeLabel: "Close",
    edgeLabel: "Or: open in Edge",
    guide: installGuide,
  },
};

export const headerTexts: ComponentProps<typeof Header> = {
  pages: [
    { label: "Play", href: routes.play, icon: "play" },
    { label: "Code puzzles", href: routes.code, icon: "code" },
    { label: "Cosplay", href: routes.cosplay, icon: "cat" },
  ],
  sections: { title: "Discover the game", links: sectionLinks },
  install,
  players: playerTexts,
  menu: { open: "Open menu", close: "Close menu" },
};

export const footerTexts: ComponentProps<typeof Footer> = {
  tagline:
    "The party card game where cats pass a virus around the table. One phone, all your friends.",
  action: {
    label: "Play now",
    href: routes.play,
    variant: "orange",
    icon: "next",
    iconSide: "end",
  },
  install,
  groups: [
    { title: "Explore", links: sectionLinks },
    {
      title: "Play",
      links: [
        { label: "Start a game", href: routes.play },
        { label: "Code puzzles", href: routes.code },
        { label: "Cosplay", href: routes.cosplay },
      ],
    },
  ],
  team: {
    title: "The team",
    members: ["Alexandre-Philippe Perez", "Sabry Cheribet", "Lina Fil"],
  },
  copyright: "© 2026 Cat-phishing",
  legal: [
    { label: "Legal notice", href: routes.legalNotice },
    { label: "Privacy policy", href: routes.privacy },
    { label: "Terms of use", href: routes.terms },
  ],
};
