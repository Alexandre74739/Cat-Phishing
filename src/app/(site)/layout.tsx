import { Footer } from "@/_components/layout/Footer";
import { Header } from "@/_components/layout/Header";
import { defaultAvatarId } from "@/lib/avatars";
import { installGuide } from "@/lib/installGuide";
import { routes } from "@/lib/navigation";

const sections = [
  { id: "about", label: "About" },
  { id: "game", label: "The game" },
  { id: "puzzles", label: "Puzzles" },
  { id: "faq", label: "FAQ" },
];

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header
        sections={sections}
        actions={[
          {
            label: "Play",
            href: routes.play,
            icon: "next",
            iconSide: "end",
            variant: "orange",
          },
        ]}
        install={{
          label: "Install the app",
          help: {
            dialogLabel: "How to install the app",
            closeLabel: "Close",
            edgeLabel: "Or: open in Edge",
            guide: installGuide,
          },
        }}
        account={{
          label: "My account",
          href: routes.account,
          avatarId: defaultAvatarId,
        }}
      />
      {children}
      <Footer
        tagline="The party card game where cats pass a virus around the table. One phone, all your friends."
        action={{
          label: "Play now",
          href: routes.play,
          variant: "mint",
          icon: "next",
          iconSide: "end",
        }}
        groups={[
          {
            title: "Explore",
            links: sections.map((section) => ({
              label: section.label,
              href: `/#${section.id}`,
            })),
          },
          {
            title: "Play",
            links: [
              { label: "Start a game", href: routes.play },
              { label: "Code puzzles", href: routes.code },
              { label: "My account", href: routes.account },
            ],
          },
        ]}
        team={{
          title: "The team",
          members: ["Alexandre-Philippe Perez", "Sabry Cheribet", "Lina Fil"],
        }}
        copyright="© 2026 Cat-phishing"
        legal={[
          { label: "Legal notice", href: routes.legalNotice },
          { label: "Privacy policy", href: routes.privacy },
          { label: "Terms of use", href: routes.terms },
        ]}
      />
    </>
  );
}
