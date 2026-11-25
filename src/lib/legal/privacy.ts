import type { LegalTexts } from "@/_components/layout/LegalPage";
import { contactLink, updated } from "./contact";

export const privacyTexts: LegalTexts = {
  title: "Privacy policy",
  updated,
  intro:
    "We collect as little as possible. No email, no age, no ads, no trackers. Here is everything, in plain words.",
  sections: [
    {
      title: "On your phone",
      paragraphs: [
        "By default, everything stays on your device, in the browser storage. Nothing is sent to us.",
      ],
      items: [
        "Player names or nicknames and their avatars",
        "Stars, badges and the treasure map",
        "Your cube cat's outfit",
      ],
    },
    {
      title: "The online save (optional)",
      paragraphs: [
        "If you choose “Save online”, we store your progress so you can find it on another device. We keep:",
      ],
      items: [
        "Your nickname and avatar",
        "Your 4-digit code, scrambled (hashed) so nobody can read it, not even us",
        "Your stars, badges and cat outfit",
        "Scrambled login keys, so your device stays connected for up to 180 days",
        "The dates your save was created and last used, and wrong code attempts (to block guessers)",
      ],
    },
    {
      title: "Why we use it",
      paragraphs: [
        "Only to run the game and the online save you asked for. We never sell, share or use your data for ads.",
        "If you are under 15, ask a parent before creating an online save.",
      ],
    },
    {
      title: "How long we keep it",
      paragraphs: [
        "An online save that is not used for 12 months is deleted automatically.",
        "You can delete it any time: remove the player in the app and tick “Also delete the online save”.",
        "To stop robots, the server counts requests per internet address (IP). These counters are deleted within one hour.",
      ],
    },
    {
      title: "Where it is stored",
      paragraphs: [
        "Online saves are stored by MongoDB Atlas, in the European Union.",
        "The website is hosted by Vercel, which handles technical data such as your IP address to show you the pages.",
      ],
    },
    {
      title: "No cookies, no trackers",
      paragraphs: [
        "We use no advertising or tracking cookies and no analytics. Fonts are stored on our own server, so no outside service sees your visit.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You can ask to see, fix or delete your data, or say no to its use. Write to us and we will answer within one month.",
        "If you think we got it wrong, you can contact the CNIL, the French data protection authority (cnil.fr).",
      ],
      links: [contactLink],
    },
  ],
};
