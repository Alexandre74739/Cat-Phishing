import { ImageResponse } from "next/og";
import { AppIcon } from "@/_components/ui/AppIcon";
import { isPwaIconName, pwaIcons, readAppIconDataUri } from "@/lib/appIcon";

export function generateStaticParams() {
  return Object.keys(pwaIcons).map((name) => ({ name }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/icons/[name]">,
) {
  const { name } = await params;
  if (!isPwaIconName(name)) return new Response(null, { status: 404 });

  const { size, maskable } = pwaIcons[name];
  const src = await readAppIconDataUri();
  return new ImageResponse(
    <AppIcon src={src} size={size} padding={maskable ? 0.2 : 0.06} />,
    { width: size, height: size },
  );
}
