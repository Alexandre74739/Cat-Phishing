import Link from "next/link";
import type { ReactNode } from "react";
import { Button, type ButtonAction } from "@/_components/ui/Button";
import { Logo } from "@/_components/ui/Logo";

type FooterLink = { label: string; href: string };

type FooterGroup = { title: string; links: FooterLink[] };

type FooterProps = {
  tagline: string;
  action: ButtonAction;
  groups: FooterGroup[];
  team: { title: string; members: string[] };
  copyright: string;
  legal: FooterLink[];
};

const slant = "[clip-path:polygon(0_40px,100%_0,100%_100%,0_100%)]";

export function Footer({
  tagline,
  action,
  groups,
  team,
  copyright,
  legal,
}: FooterProps) {
  return (
    <footer className={`bg-ink pt-[3px] ${slant}`}>
      <div className={`bg-lilac px-4 pt-20 pb-12 sm:px-6 ${slant}`}>
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-sm text-lg font-semibold text-ink">{tagline}</p>
            <Button {...action} className="w-full max-w-sm sm:w-fit">
              {action.label}
            </Button>
          </div>
          {groups.map((group) => (
            <FooterColumn key={group.title} title={group.title} isNav>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-lg font-ui text-lg font-semibold text-ink decoration-grape decoration-[3px] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          ))}
          <FooterColumn title={team.title}>
            {team.members.map((member) => (
              <li
                key={member}
                className="flex min-h-11 items-center font-ui text-lg font-semibold text-ink"
              >
                {member}
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center font-ui font-semibold text-paper sm:flex-row sm:text-left">
          <p>{copyright}</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-5">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-lg underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  isNav = false,
  children,
}: {
  title: string;
  isNav?: boolean;
  children: ReactNode;
}) {
  const Wrapper = isNav ? "nav" : "div";
  return (
    <Wrapper aria-label={isNav ? title : undefined}>
      <h2 className="font-display text-xl tracking-wide text-ink">{title}</h2>
      <ul className="mt-3 flex flex-col">{children}</ul>
    </Wrapper>
  );
}
