import "server-only";
import type { Db } from "mongodb";

// Fixed-window counters per IP, deleted by MongoDB itself through a TTL index on expiresAt.
type Hit = { _id: string; count: number; expiresAt: Date };

const minute = 60_000;

const limits: Record<string, { max: number; windowMs: number }> = {
  check: { max: 60, windowMs: minute },
  create: { max: 5, windowMs: 60 * minute },
  login: { max: 20, windowMs: 15 * minute },
  sync: { max: 120, windowMs: minute },
  logout: { max: 30, windowMs: minute },
  delete: { max: 5, windowMs: 60 * minute },
  show: { max: 60, windowMs: minute },
};

let isIndexed = false;

export function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

export async function isAllowed(db: Db, action: string, ip: string) {
  const rule = limits[action];
  if (!rule) return true;
  const hits = db.collection<Hit>("rate-limits");
  if (!isIndexed) {
    await hits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    isIndexed = true;
  }
  const window = Math.floor(Date.now() / rule.windowMs);
  const hit = await hits.findOneAndUpdate(
    { _id: `${action}:${ip}:${window}` },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date((window + 1) * rule.windowMs) },
    },
    { upsert: true, returnDocument: "after" },
  );
  return (hit?.count ?? 0) <= rule.max;
}
