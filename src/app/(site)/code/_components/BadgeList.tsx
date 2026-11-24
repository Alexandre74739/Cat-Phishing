"use client";

import { useSecrets } from "@/hooks/useSecrets";
import { useStars } from "@/hooks/useStars";
import { badges } from "@/lib/badges";
import { badgeLooks } from "./badgeLooks";

export function BadgeList({
  title,
  lockedLabel,
  secretLabel,
}: {
  title: string;
  lockedLabel: string;
  secretLabel: string;
}) {
  const stars = useStars();
  const secrets = useSecrets();

  return (
    <section aria-labelledby="badges-title" className="mt-20">
      <h2
        id="badges-title"
        className="text-center font-display text-3xl tracking-wide sm:text-4xl"
      >
        {title}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {badges.map((badge) => {
          const earned = badge.earned(stars, secrets);
          const isHidden = !earned && !!badge.hint;
          const { Icon, color } = badgeLooks[badge.id];
          return (
            <li
              key={badge.id}
              className={`toon flex flex-col items-center gap-2 rounded-3xl p-4 text-center ${earned ? "bg-paper" : "bg-paper/50 text-ink"}`}
            >
              <span
                className={`toon grid size-16 place-items-center rounded-2xl ${earned ? color : "bg-ink/10"}`}
              >
                <Icon size={30} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-ui text-lg leading-tight font-bold">
                {isHidden ? secretLabel : badge.name}
              </span>
              <span className="text-sm font-semibold">
                {earned
                  ? badge.text
                  : isHidden
                    ? badge.hint
                    : `${lockedLabel} ${badge.text}`}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
