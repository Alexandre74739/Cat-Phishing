import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageItems } from "@/lib/pagination";

export type PagerTexts = {
  label: string;
  page: string;
  previous: string;
  next: string;
};

type PagerProps = {
  page: number;
  pages: number;
  texts: PagerTexts;
  onPage: (page: number) => void;
};

const button =
  "toon pressable grid size-12 place-items-center rounded-full font-ui text-xl font-bold disabled:opacity-40";

export function Pager({ page, pages, texts, onPage }: PagerProps) {
  if (pages <= 1) return null;

  return (
    <nav
      aria-label={texts.label}
      className="mt-10 flex items-center justify-center gap-2 sm:gap-3"
    >
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        aria-label={texts.previous}
        className={`${button} bg-paper`}
      >
        <ArrowLeft size={22} strokeWidth={3} aria-hidden="true" />
      </button>
      {pageItems(page, pages).map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => onPage(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`${texts.page} ${item + 1}`}
            className={`${button} ${item === page ? "bg-grape text-paper" : "bg-paper"}`}
          >
            {item + 1}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="w-6 text-center font-ui text-xl font-bold text-ink"
          >
            …
          </span>
        ),
      )}
      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page === pages - 1}
        aria-label={texts.next}
        className={`${button} bg-paper`}
      >
        <ArrowRight size={22} strokeWidth={3} aria-hidden="true" />
      </button>
    </nav>
  );
}
