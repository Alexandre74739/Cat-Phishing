import "server-only";
import type { Collection } from "mongodb";
import {
  cleanAvatar,
  emptyCloudData,
  isValidCode,
  mergeData,
  sanitizeData,
} from "../cloud";
import {
  hashCode,
  hashToken,
  hasValidToken,
  newSalt,
  newToken,
  sameHash,
  type Account,
} from "./accounts";
import { json } from "./mongo";

type Body = Record<string, unknown>;
type Action = (
  accounts: Collection<Account>,
  id: string,
  pseudo: string,
  body: Body,
) => Promise<Response>;

const maxFails = 5;
const lockMs = 15 * 60_000;
const maxLockMs = 24 * 60 * 60_000;

const minutesLeft = (until: Date) =>
  Math.max(1, Math.ceil((until.getTime() - Date.now()) / 60_000));

const session = async (
  accounts: Collection<Account>,
  account: Pick<Account, "_id" | "pseudo" | "avatar" | "data">,
) =>
  json({
    token: await newToken(accounts, account._id),
    pseudo: account.pseudo,
    avatar: account.avatar,
    data: sanitizeData(account.data),
  });

const check: Action = async (accounts, id) =>
  json({
    free: !(await accounts.findOne({ _id: id }, { projection: { _id: 1 } })),
  });

const create: Action = async (accounts, id, pseudo, body) => {
  if (!isValidCode(body.code)) return json({ error: "badCode" }, 400);
  const salt = newSalt();
  const now = new Date();
  const account: Account = {
    _id: id,
    pseudo,
    avatar: cleanAvatar(body.avatar),
    salt,
    hash: hashCode(body.code, salt),
    tokens: [],
    data: sanitizeData(body.data),
    fails: 0,
    locks: 0,
    lockUntil: null,
    createdAt: now,
    updatedAt: now,
  };
  try {
    await accounts.insertOne(account);
  } catch (error) {
    if ((error as { code?: number }).code === 11000)
      return json({ error: "taken" }, 409);
    throw error;
  }
  return session(accounts, account);
};

const login: Action = async (accounts, id, _pseudo, body) => {
  if (!isValidCode(body.code)) return json({ error: "badCode" }, 400);
  // The attempt is counted before checking, in one atomic update, so parallel calls cannot get extra tries.
  const now = new Date();
  const account = await accounts.findOneAndUpdate(
    {
      _id: id,
      fails: { $lt: maxFails },
      $or: [{ lockUntil: null }, { lockUntil: { $lte: now } }],
    },
    { $inc: { fails: 1 } },
    { returnDocument: "after" },
  );
  if (!account) {
    const locked = await accounts.findOne(
      { _id: id },
      { projection: { lockUntil: 1 } },
    );
    if (!locked) return json({ error: "unknown" }, 404);
    const retryIn = locked.lockUntil
      ? minutesLeft(locked.lockUntil)
      : lockMs / 60_000;
    return json({ error: "locked", retryIn }, 429);
  }
  if (!sameHash(hashCode(body.code, account.salt), account.hash)) {
    if (account.fails < maxFails)
      return json({ error: "badCode", left: maxFails - account.fails }, 401);
    const until = new Date(
      Date.now() + Math.min(maxLockMs, lockMs * 2 ** account.locks),
    );
    await accounts.updateOne(
      { _id: id },
      { $set: { fails: 0, lockUntil: until }, $inc: { locks: 1 } },
    );
    return json({ error: "locked", retryIn: minutesLeft(until) }, 429);
  }
  await accounts.updateOne(
    { _id: id },
    { $set: { fails: 0, locks: 0, lockUntil: null, updatedAt: now } },
  );
  return session(accounts, {
    ...account,
    data: account.data ?? emptyCloudData(),
  });
};

const sync: Action = async (accounts, id, _pseudo, body) => {
  const tokenHash = hashToken(body.token);
  const account = await accounts.findOne({ _id: id });
  if (!account || !hasValidToken(account, tokenHash))
    return json({ error: "auth" }, 401);
  const data = mergeData(sanitizeData(account.data), sanitizeData(body.data));
  const now = new Date();
  await accounts.updateOne(
    { _id: id, "tokens.hash": tokenHash },
    { $set: { data, updatedAt: now, "tokens.$.at": now } },
  );
  return json({ data });
};

const logout: Action = async (accounts, id, _pseudo, body) => {
  await accounts.updateOne(
    { _id: id },
    { $pull: { tokens: { hash: hashToken(body.token) } } },
  );
  return json({ ok: true });
};

const remove: Action = async (accounts, id, _pseudo, body) => {
  const account = await accounts.findOne({ _id: id });
  if (!account || !hasValidToken(account, hashToken(body.token)))
    return json({ error: "auth" }, 401);
  await accounts.deleteOne({ _id: id });
  return json({ ok: true });
};

export const accountActions: Record<string, Action> = {
  check,
  create,
  login,
  sync,
  logout,
  delete: remove,
};
