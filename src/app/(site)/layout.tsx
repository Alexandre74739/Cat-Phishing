import { Header } from "@/_components/layout/Header";
import { defaultAvatarId } from "@/lib/avatars";
import { installGuide } from "@/lib/installGuide";
import { routes } from "@/lib/navigation";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header
        sections={[
          { id: "about", label: "About" },
          { id: "game", label: "The game" },
          { id: "puzzles", label: "Puzzles" },
          { id: "faq", label: "FAQ" },
        ]}
        actions={[
          {
            label: "Play",
            href: routes.play,
            icon: "next",
            iconSide: "end",
            variant: "sun",
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
    </>
  );
}
