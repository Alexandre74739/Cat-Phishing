import { ArrowRight, Bug } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";

type PhoneVisualProps = {
  holder: string;
  status: string;
  action: string;
  next: string;
};

export function PhoneVisual({
  holder,
  status,
  action,
  next,
}: PhoneVisualProps) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3">
      <div className="toon w-40 shrink-0 -rotate-3 rounded-[28px] bg-ink p-2">
        <div className="flex flex-col items-center gap-2 rounded-[22px] bg-paper px-3 pt-2 pb-4">
          <span className="h-1.5 w-10 rounded-full bg-lilac" />
          <span className="relative mt-1">
            <Avatar id="1f98a" size={48} />
            <span className="toon absolute -right-2 -bottom-1 grid size-7 place-items-center rounded-full bg-mint text-ink motion-safe:animate-bounce">
              <Bug size={14} strokeWidth={3} />
            </span>
          </span>
          <span className="font-display text-lg tracking-wide">{holder}</span>
          <span className="rounded-full bg-orange-soft px-3 py-0.5 font-ui text-xs font-semibold">
            {status}
          </span>
          <span className="toon mt-1 w-full rounded-full bg-orange py-1 text-center font-ui text-sm font-semibold">
            {action}
          </span>
        </div>
      </div>
      <ArrowRight
        size={32}
        strokeWidth={3}
        className="shrink-0 text-ink motion-safe:animate-pulse"
      />
      <span className="flex flex-col items-center gap-1">
        <span className="toon grid size-16 place-items-center rounded-full bg-paper">
          <Avatar id="1f989" size={40} />
        </span>
        <span className="font-display tracking-wide">{next}</span>
      </span>
    </div>
  );
}
