import type { ReactNode } from "react";
import { dialogTitleId } from "./types";

export function ViewTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      id={dialogTitleId}
      className="font-display text-3xl tracking-wide break-words sm:text-4xl"
    >
      {children}
    </h2>
  );
}
