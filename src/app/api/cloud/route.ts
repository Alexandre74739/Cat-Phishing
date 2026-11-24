import { cleanPseudo, pseudoKey } from "@/lib/cloud";
import { accountActions } from "@/lib/db/accountActions";
import { accounts } from "@/lib/db/accounts";
import { database, json } from "@/lib/db/mongo";
import { clientIp, isAllowed } from "@/lib/db/rateLimit";

const maxBodyLength = 60_000;

// Browsers always send Origin on POST: calls from another site are refused.
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return (
      new URL(origin).host ===
      (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))
    );
  } catch {
    return false;
  }
}

async function readBody(request: Request) {
  const raw = await request.text();
  if (raw.length > maxBodyLength) return null;
  try {
    const body: unknown = JSON.parse(raw);
    return body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "badRequest" }, 415);
  const body = await readBody(request);
  if (!body) return json({ error: "badRequest" }, 400);

  const action = accountActions[String(body.action)];
  if (!action) return json({ error: "badRequest" }, 400);
  const pseudo = cleanPseudo(body.pseudo);
  if (!pseudo) return json({ error: "badPseudo" }, 400);

  try {
    const collection = await accounts();
    if (
      !(await isAllowed(
        await database(),
        String(body.action),
        clientIp(request),
      ))
    )
      return json({ error: "tooMany" }, 429);
    return await action(collection, pseudoKey(pseudo), pseudo, body);
  } catch {
    return json({ error: "server" }, 500);
  }
}
