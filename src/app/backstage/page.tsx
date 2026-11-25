import type { Metadata } from "next";
import { routes } from "@/lib/navigation";
import { Backstage } from "./_components/Backstage";

export const metadata: Metadata = {
  title: "Backstage · Cat-phishing",
  robots: { index: false, follow: false },
};

export default function BackstagePage() {
  return (
    <Backstage
      texts={{
        title: "Backstage",
        locked: "Nothing to see here.",
        error: "Connection lost, try again.",
        phases: {
          off: "> status: all phones safe",
          hack: "> status: hack running",
          talk: "> status: Meownymous is talking",
        },
        hack: "Hack every phone",
        talk: "Meownymous talks",
        restore: "Restore the app",
        back: { label: "Back home", href: routes.home },
      }}
    />
  );
}
