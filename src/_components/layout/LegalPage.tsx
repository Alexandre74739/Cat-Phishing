import Link from "next/link";

type LegalLink = { label: string; href: string };

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: LegalLink[];
};

export type LegalTexts = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const linkStyle =
  "inline-flex min-h-11 items-center rounded-lg font-ui font-semibold break-all text-grape underline decoration-[3px] underline-offset-4";

export function LegalPage({ title, updated, intro, sections }: LegalTexts) {
  return (
    <main className="dots min-h-svh px-4 pt-28 pb-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-center font-ui font-semibold text-ink-soft">
          {updated}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-semibold text-ink">
          {intro}
        </p>
        <div className="mt-12 flex flex-col gap-6">
          {sections.map((section) => (
            <LegalBlock key={section.title} {...section} />
          ))}
        </div>
      </div>
    </main>
  );
}

function LegalBlock({ title, paragraphs, items, links }: LegalSection) {
  return (
    <section className="toon rounded-3xl bg-paper p-5 text-ink sm:p-8">
      <h2 className="font-display text-2xl tracking-wide sm:text-3xl">
        {title}
      </h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-lg font-semibold">
          {paragraph}
        </p>
      ))}
      {items && (
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-6 text-lg font-semibold marker:text-grape">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {links && (
        <ul className="mt-3 flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link href={link.href} className={linkStyle}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={linkStyle}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
