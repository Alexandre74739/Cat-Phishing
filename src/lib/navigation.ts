export const routes = {
  home: "/",
  play: "/play",
  code: "/code",
  cosplay: "/cosplay",
  legalNotice: "/legal-notice",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const levelHref = (course: string, level: number) =>
  `${routes.code}/${course}/${level}`;
