import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/_components/ui/Logo";
import type { Course } from "@/lib/courses";
import { routes } from "@/lib/navigation";
import { LevelNav } from "./LevelNav";
import { ScoreChips } from "./ScoreChips";
import type { LevelTexts } from "./types";

type LevelHeaderProps = {
  course: Course;
  current: number;
  texts: LevelTexts["nav"];
};

export function LevelHeader({ course, current, texts }: LevelHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex min-h-18 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b-[3px] border-ink bg-paper px-3 py-2 sm:px-4 lg:flex-nowrap">
      <Link
        href={routes.code}
        className="toon pressable flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 font-ui font-semibold whitespace-nowrap"
      >
        <ArrowLeft size={20} strokeWidth={2.75} aria-hidden="true" />
        {texts.back}
      </Link>
      <span className="hidden sm:block">
        <Logo small />
      </span>
      <LevelNav course={course} current={current} texts={texts} />
      <ScoreChips course={course} texts={texts} />
    </header>
  );
}
