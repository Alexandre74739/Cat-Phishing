import type { ReactNode } from "react";
import { blockLooks, type BlockLookKind } from "./blockLooks";

type BlockChipProps = {
  kind: BlockLookKind;
  label: string;
  active?: boolean;
  children?: ReactNode;
};

type BlockChipButtonProps = BlockChipProps & {
  disabled?: boolean;
  onClick?: () => void;
};

export function BlockChip({
  kind,
  label,
  active,
  children,
  disabled,
  onClick,
}: BlockChipButtonProps) {
  const { color } = blockLooks[kind];
  const hat = kind === "start";
  const className = `toon block w-fit max-w-full text-left font-ui text-[17px] font-semibold text-ink select-none ${color} ${hat ? "rounded-t-[26px] rounded-b-2xl px-3 pt-3 pb-2" : "rounded-2xl px-3 py-1.5"} ${active ? "running-glow" : ""}`;
  const content = (
    <BlockLabel kind={kind} label={label}>
      {children}
    </BlockLabel>
  );

  if (!onClick) return <span className={className}>{content}</span>;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${className} pressable disabled:opacity-60`}
    >
      {content}
    </button>
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
