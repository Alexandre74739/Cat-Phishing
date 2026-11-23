import { ImageResponse } from "next/og";
import { AppIcon } from "@/_components/ui/AppIcon";
import { readAppIconDataUri } from "@/lib/appIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const src = await readAppIconDataUri();
  return new ImageResponse(
    <AppIcon src={src} size={size.width} padding={0.1} />,
    size,
  );
}
