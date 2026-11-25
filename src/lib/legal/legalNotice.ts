import type { LegalTexts } from "@/_components/layout/LegalPage";
import { routes } from "../navigation";
import { contactLink, updated } from "./contact";

export const legalNoticeTexts: LegalTexts = {
  title: "Legal notice",
  updated,
  intro: "Who makes Cat-phishing, and who hosts it.",
  sections: [
    {
      title: "Publisher",
      paragraphs: [
        "Cat-phishing is a free, non-commercial student project.",
        "Publication director: Alexandre Perez.",
        "Team: Alexandre Perez, Sabry Cheribet, Lina Fil and Ambre Mercier-Dalmasso.",
      ],
      links: [contactLink],
    },
    {
      title: "Hosting",
      paragraphs: [
        "The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (vercel.com).",
        "Online saves are stored by MongoDB Atlas (MongoDB, Inc.) on servers located in the European Union.",
      ],
    },
    {
      title: "Content and credits",
      paragraphs: [
        "The game, its texts, its cats and its puzzles belong to the Cat-phishing team. Please don't copy them without asking.",
        "Avatars come from OpenMoji, the open-source emoji project, licensed under CC BY-SA 4.0.",
      ],
      links: [
        { label: "openmoji.org", href: "https://openmoji.org" },
        {
          label: "CC BY-SA 4.0 license",
          href: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
      ],
    },
    {
      title: "More",
      paragraphs: ["How we handle your data and the rules of the app:"],
      links: [
        { label: "Privacy policy", href: routes.privacy },
        { label: "Terms of use", href: routes.terms },
      ],
    },
  ],
};
