import type { LegalTexts } from "@/_components/layout/LegalPage";
import { routes } from "../navigation";
import { contactLink, updated } from "./contact";

export const termsTexts: LegalTexts = {
  title: "Terms of use",
  updated,
  intro:
    "The house rules of the app. By using Cat-phishing, you agree to them.",
  sections: [
    {
      title: "The app",
      paragraphs: [
        "Cat-phishing is a free companion app for a party card game, for players aged 12 and up. There is nothing to buy in the app.",
      ],
    },
    {
      title: "Nicknames",
      paragraphs: [
        "Pick a nickname, not your full name. Keep it friendly: no insults, no hate, nothing that pretends to be someone else.",
        "We may delete an online save with a nickname that breaks these rules.",
      ],
    },
    {
      title: "Your 4-digit code",
      paragraphs: [
        "Your code unlocks your online save. Keep it secret, like a real password: never share it, even with a cat.",
        "If someone tries too many wrong codes, the save is locked for a while to protect it.",
      ],
    },
    {
      title: "Play fair",
      paragraphs: ["Please don't:"],
      items: [
        "Try to break, overload or hack the app or its server",
        "Use robots or scripts to create saves or win stars",
        "Use someone else's save without their permission",
      ],
    },
    {
      title: "No guarantee",
      paragraphs: [
        "We do our best to keep the app working, but it is a student project: it can have bugs or be offline sometimes. Your progress on the device can be lost if you clear your browser data.",
        "We can change the app or these terms at any time. The date at the top shows the last update.",
      ],
    },
    {
      title: "Questions",
      paragraphs: [
        "Something wrong or unclear? Write to us. You can also read how we handle your data.",
      ],
      links: [contactLink, { label: "Privacy policy", href: routes.privacy }],
    },
  ],
};
