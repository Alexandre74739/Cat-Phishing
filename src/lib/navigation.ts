export const routes = {
  home: "/",
  play: "/play",
  code: "/code",
  account: "/account",
} as const;

export const levelHref = (course: string, level: number) =>
  `${routes.code}/${course}/${level}`;
