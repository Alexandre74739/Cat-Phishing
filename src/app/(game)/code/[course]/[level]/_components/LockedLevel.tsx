import { LockedCourse } from "@/_components/puzzle/LockedCourse";
import type { CourseLock } from "@/lib/courseProgress";
import type { Course } from "@/lib/courses";
import { LevelHeader } from "./LevelHeader";
import type { LevelTexts } from "./types";

type LockedLevelProps = {
  course: Course;
  number: number;
  lock: CourseLock;
  texts: LevelTexts;
};

export function LockedLevel({ course, number, lock, texts }: LockedLevelProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <LevelHeader course={course} current={number} texts={texts.nav} />
      <main className="grid flex-1 place-items-center p-4">
        <div className="toon w-full max-w-xl rounded-[30px] bg-paper p-8">
          <LockedCourse title={course.title} lock={lock} texts={texts.locked} />
        </div>
      </main>
    </div>
  );
}
