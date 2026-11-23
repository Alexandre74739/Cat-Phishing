import Link from "next/link";
import { routes } from "@/lib/navigation";
import { LogoMark } from "./LogoMark";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      href={routes.home}
      aria-label="Cat-phishing, home"
      className="flex items-center gap-2 rounded-xl select-none"
    >
      <LogoMark size={small ? 40 : 48} />
      <span
        className={`${small ? "text-2xl" : "text-3xl"} translate-y-0.5 font-display leading-none text-ink`}
      >
        Cat<span className="text-grape">phishing</span>
      </span>
    </Link>
  );
}
