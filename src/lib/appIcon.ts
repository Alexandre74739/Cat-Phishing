import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";

export const appColors = { background: "#fbf1e5" };

export const pwaIcons = {
  "icon-192.png": { size: 192, maskable: false },
  "icon-512.png": { size: 512, maskable: false },
  "maskable-512.png": { size: 512, maskable: true },
} as const;

export type PwaIconName = keyof typeof pwaIcons;

export function isPwaIconName(name: string): name is PwaIconName {
  return name in pwaIcons;
}

export async function readAppIconDataUri() {
  "use cache";
  cacheLife("max");
  const png = await readFile(join(process.cwd(), "src/app/icon.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}
