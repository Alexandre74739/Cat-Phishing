import type { Metadata } from "next";
import { Header } from "@/_components/layout/Header";
import { MotionProvider } from "@/_components/layout/MotionProvider";
import { routes } from "@/lib/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cat-phishing",
  description:
    "The party card game where cats pass a virus around and crack code puzzles. One phone, all your friends.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-svh">
        <MotionProvider>
          <Header
            sections={[
              { id: "about", label: "About" },
              { id: "game", label: "The game" },
              { id: "puzzles", label: "Puzzles" },
              { id: "how-to-play", label: "How to play" },
              { id: "faq", label: "FAQ" },
            ]}
            actions={[
              {
                label: "Play",
                href: routes.play,
                icon: "play",
                variant: "mint",
              },
              {
                label: "Code",
                href: routes.code,
                icon: "code",
                variant: "sun",
              },
            ]}
          />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
