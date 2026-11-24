import { database, json } from "@/lib/db/mongo";

// Called daily by a Vercel cron (vercel.json) so the free Atlas cluster is never paused for inactivity.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`)
    return json({ ok: false }, 401);
  try {
    await (await database()).command({ ping: 1 });
    return json({ ok: true });
  } catch {
    return json({ ok: false }, 503);
  }
}
