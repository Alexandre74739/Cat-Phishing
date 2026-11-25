import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/navigation";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      href={routes.home}
      aria-label="Cat-phishing, home"
      className="flex shrink-0 items-center rounded-xl select-none"
    >
      <Image
        src="/logo.png"
        alt=""
        width={960}
        height={409}
        preload={small}
        sizes={small ? "136px" : "240px"}
        className={`${small ? "h-14" : "h-24"} w-auto`}
      />
    </Link>
  );
}
