import { connection } from "next/server";
import { isShowPhase } from "@/lib/hackShow";
import { database, json } from "@/lib/db/mongo";
import { clientIp, isAllowed } from "@/lib/db/rateLimit";
import { isSameOrigin, readJsonBody } from "@/lib/db/request";
import { isShowAdmin, readShow, writeShow } from "@/lib/db/show";

// Every phone polls this: the CDN shares one answer per second so the database sees ~1 read/s.
export async function GET() {
  await connection();
  try {
    return Response.json(
      { state: await readShow(), now: Date.now() },
      { headers: { "cache-control": "public, max-age=0, s-maxage=1" } },
    );
  } catch {
    return json({ error: "server" }, 500);
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "forbidden" }, 403);
  const body = await readJsonBody(request);
  if (!body) return json({ error: "badRequest" }, 400);
  try {
    if (!(await isAllowed(await database(), "show", clientIp(request))))
      return json({ error: "tooMany" }, 429);
    if (!(await isShowAdmin(body.pseudo, body.token)))
      return json({ error: "forbidden" }, 403);
    const state = isShowPhase(body.phase)
      ? await writeShow(body.phase)
      : await readShow();
    return json({ state });
  } catch {
    return json({ error: "server" }, 500);
  }
}
