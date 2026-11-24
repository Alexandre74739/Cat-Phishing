import { Circle, CircleCheck } from "lucide-react";
import type { CourseLock } from "@/lib/courseProgress";

type CourseChecklistProps = {
  courses: CourseLock["courses"];
  doneLabel: string;
  label?: string;
  className?: string;
};

export function CourseChecklist({
  courses,
  doneLabel,
  label,
  className = "justify-center",
}: CourseChecklistProps) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {courses.map((course) => (
        <li
          key={course.slug}
          className={`flex min-h-9 items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 font-ui text-sm font-bold text-ink ${course.done ? "bg-mint" : "bg-paper"}`}
        >
          {course.done ? (
            <CircleCheck size={18} strokeWidth={2.75} aria-hidden="true" />
          ) : (
            <Circle size={18} strokeWidth={2.75} aria-hidden="true" />
          )}
          {course.title}
          {course.done && <span className="sr-only">{doneLabel}</span>}
        </li>
      ))}
    </ul>
  );
}
