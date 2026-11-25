import { cleanPseudo, pseudoKey } from "@/lib/cloud";
import { accountActions } from "@/lib/db/accountActions";
import { accounts } from "@/lib/db/accounts";
import { database, json } from "@/lib/db/mongo";
import { clientIp, isAllowed } from "@/lib/db/rateLimit";
import { isSameOrigin, readJsonBody } from "@/lib/db/request";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "forbidden" }, 403);
  const body = await readJsonBody(request);
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
