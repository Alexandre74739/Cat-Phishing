import Image from "next/image";
import { avatarSrc } from "@/lib/avatars";

type AvatarProps = { id: string; size?: number };

export function Avatar({ id, size = 40 }: AvatarProps) {
  return (
    <Image
      src={avatarSrc(id)}
      alt=""
      width={size}
      height={size}
      draggable={false}
      unoptimized
      className="select-none"
    />
  );
}
