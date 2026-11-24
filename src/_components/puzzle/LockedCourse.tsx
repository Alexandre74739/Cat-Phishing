import { CircleCheck, Circle, Lock, Star } from "lucide-react";
import type { CourseLock } from "@/lib/courseProgress";

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
        {texts.text.replace("{stars}", String(lock.stars.need))}
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {lock.courses.map((course) => (
          <li
            key={course.slug}
            className={`flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 font-ui text-sm font-bold ${course.done ? "bg-mint" : "bg-paper"}`}
          >
            {course.done ? (
              <CircleCheck size={16} strokeWidth={2.75} aria-hidden="true" />
            ) : (
              <Circle size={16} strokeWidth={2.75} aria-hidden="true" />
            )}
            {course.title}
            {course.done && <span className="sr-only">{texts.done}</span>}
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-1.5 font-ui text-xl font-bold">
        <Star size={22} strokeWidth={2.5} aria-hidden="true" />
        {lock.stars.have} / {lock.stars.need}
        <span className="sr-only">{texts.stars}</span>
      </p>
    </div>
  );
}
