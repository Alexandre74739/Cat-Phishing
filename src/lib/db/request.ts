import "server-only";

const maxBodyLength = 60_000;

// Browsers always send Origin on POST: calls from another site are refused.
export function isSameOrigin(request: Request) {
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

export async function readJsonBody(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return null;
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
