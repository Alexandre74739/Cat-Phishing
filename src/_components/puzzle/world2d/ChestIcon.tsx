export function ChestIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="size-4/5 stroke-ink"
      strokeWidth={3}
      strokeLinejoin="round"
    >
      {open ? (
        <path d="M6 22 L10 6 H38 L42 22 Z" className="fill-wood-dark" />
      ) : (
        <rect
          x={5}
          y={10}
          width={38}
          height={12}
          rx={3}
          className="fill-wood-dark"
        />
      )}
      {open && <rect x={8} y={18} width={32} height={6} className="fill-sun" />}
      <rect x={5} y={22} width={38} height={20} rx={3} className="fill-wood" />
      <path d="M14 10 V42 M34 10 V42" className="stroke-sun" strokeWidth={4} />
      <rect
        x={20}
        y={18}
        width={8}
        height={10}
        rx={1.5}
        className="fill-sun"
        strokeWidth={2}
      />
    </svg>
  );
}
