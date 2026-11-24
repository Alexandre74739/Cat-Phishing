import type { ButtonAction } from "@/_components/ui/Button";
import { routes } from "./navigation";

export type LostTexts = {
  code: string;
  title: string;
  highlight: string;
  message: string;
  actions: ButtonAction[];
};

export const lostTexts: LostTexts = {
  code: "404",
  title: "Page",
  highlight: "not found!",
  message:
    "Our cat chased this page into the void. It was probably a phishing link anyway.",
  actions: [
    { label: "Back home", href: routes.home, variant: "orange", icon: "home" },
    { label: "Code puzzles", href: routes.code, variant: "mint", icon: "code" },
  ],
};
