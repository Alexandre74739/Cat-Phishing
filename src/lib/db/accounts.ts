import "server-only";
import type { Collection } from "mongodb";
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type { CloudData } from "../cloud";
import { database } from "./mongo";

export type Account = {
  _id: string;
  pseudo: string;
  avatar: string;
  salt: string;
  hash: string;
  tokens: { hash: string; at: Date }[];
  data: CloudData;
  fails: number;
  locks: number;
  lockUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const day = 24 * 60 * 60_000;
const maxTokens = 10;
const tokenLifetimeMs = 180 * day;
// GDPR retention: an account unused for 12 months is deleted by MongoDB itself.
const retentionSeconds = 365 * 24 * 60 * 60;

let isIndexed = false;

export async function accounts(): Promise<Collection<Account>> {
  const collection = (await database()).collection<Account>("accounts");
  if (!isIndexed) {
    await collection.createIndex(
      { updatedAt: 1 },
      { expireAfterSeconds: retentionSeconds },
    );
    isIndexed = true;
  }
  return collection;
}

export const newSalt = () => randomBytes(16).toString("hex");

export const hashCode = (code: string[], salt: string) =>
  scryptSync(code.join("-"), salt, 32).toString("hex");

export const hashToken = (token: unknown) =>
  typeof token === "string" && token
    ? createHash("sha256").update(token).digest("hex")
    : "";

export const sameHash = (a: string, b: string) =>
  a.length === b.length &&
  timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));

export const hasValidToken = (account: Account, tokenHash: string) =>
  !!tokenHash &&
  account.tokens.some(
    (token) =>
      token.hash === tokenHash &&
      Date.now() - new Date(token.at).getTime() < tokenLifetimeMs,
  );

export async function newToken(collection: Collection<Account>, id: string) {
  const token = randomBytes(24).toString("hex");
  await collection.updateOne(
    { _id: id },
    {
      $push: {
        tokens: {
          $each: [{ hash: hashToken(token), at: new Date() }],
          $slice: -maxTokens,
        },
      },
    },
  );
  return token;
}
