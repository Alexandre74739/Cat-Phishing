import type { ReactNode } from "react";
import { blockLooks, type BlockLookKind } from "./blockLooks";

type BlockChipProps = {
  kind: BlockLookKind;
  label: string;
  active?: boolean;
  children?: ReactNode;
};

export function BlockChip({ kind, label, active, children }: BlockChipProps) {
  const { color } = blockLooks[kind];
  const hat = kind === "start";

  return (
    <span
      className={`toon block w-fit max-w-full font-ui text-[17px] font-semibold text-ink select-none ${color} ${hat ? "rounded-t-[26px] rounded-b-2xl px-3 pt-3 pb-2" : "rounded-2xl px-3 py-1.5"} ${active ? "running-glow" : ""}`}
    >
      <BlockLabel kind={kind} label={label}>
        {children}
      </BlockLabel>
    </span>
  );
}

export function BlockLabel({ kind, label, children }: BlockChipProps) {
  const { Icon } = blockLooks[kind];

  return (
    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-lg bg-paper/70"
      >
        <Icon
          size={17}
          strokeWidth={2.75}
          fill={kind === "start" ? "currentColor" : "none"}
        />
      </span>
      <span>{label}</span>
      {children}
    </span>
  );
}
