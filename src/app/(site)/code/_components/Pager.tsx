import { ArrowLeft, ArrowRight } from "lucide-react";

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
      className="mt-10 flex items-center justify-center gap-3"
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
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onPage(index)}
          aria-current={index === page ? "page" : undefined}
          aria-label={`${texts.page} ${index + 1}`}
          className={`${button} ${index === page ? "bg-grape text-paper" : "bg-paper"}`}
        >
          {index + 1}
        </button>
      ))}
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
