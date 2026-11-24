// No value import here: the API route sanitizes saved secret badges with this file.
export const secretBadgeIds = ["stylist"] as const;

export type SecretBadgeId = (typeof secretBadgeIds)[number];

export const cleanSecrets = (raw: unknown): SecretBadgeId[] =>
  Array.isArray(raw) ? secretBadgeIds.filter((id) => raw.includes(id)) : [];
