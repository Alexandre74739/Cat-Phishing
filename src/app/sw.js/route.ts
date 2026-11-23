import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";

async function buildServiceWorker() {
  "use cache";
  cacheLife("max");
  const source = await readFile(
    join(process.cwd(), "src/lib/serviceWorker.js"),
    "utf8",
  );
  return `const APP_VERSION = ${JSON.stringify(process.env.APP_VERSION)};\n${source}`;
}

export async function GET() {
  return new Response(await buildServiceWorker(), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
