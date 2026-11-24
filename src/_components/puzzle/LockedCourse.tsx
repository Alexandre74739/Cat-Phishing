import { Lock, Star } from "lucide-react";
import type { CourseLock } from "@/lib/courseProgress";
import { fillText } from "@/lib/fillText";
import { CourseChecklist } from "./CourseChecklist";

export type LockedCourseTexts = {
  text: string;
  stars: string;
  done: string;
};

type LockedCourseProps = {
  title: string;
  lock: CourseLock;
  texts: LockedCourseTexts;
};

export function LockedCourse({ title, lock, texts }: LockedCourseProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="grid size-16 place-items-center rounded-full border-[3px] border-ink bg-cream">
        <Lock size={30} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h2 className="font-ui text-3xl font-bold">{title}</h2>
      <p className="max-w-sm font-bold">
        {fillText(texts.text, { stars: lock.stars.need })}
      </p>
      <CourseChecklist courses={lock.courses} doneLabel={texts.done} />
      <p className="flex items-center gap-1.5 font-ui text-xl font-bold">
        <Star size={22} strokeWidth={2.5} aria-hidden="true" />
        {lock.stars.have} / {lock.stars.need}
        <span className="sr-only">{texts.stars}</span>
      </p>
    </div>
  );
}
