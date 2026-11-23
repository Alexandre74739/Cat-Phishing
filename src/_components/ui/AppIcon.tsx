import { appColors } from "@/lib/appIcon";

type AppIconProps = { src: string; size: number; padding: number };

export function AppIcon({ src, size, padding }: AppIconProps) {
  const inner = Math.round(size * (1 - padding * 2));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appColors.background,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
      <img src={src} width={inner} height={inner} alt="" />
    </div>
  );
}
