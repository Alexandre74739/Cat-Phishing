// Placeholder until the final mascot and logo are decided.
export function LogoMark({ size }: { size: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className="shrink-0 stroke-ink"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      <path d="M9 16 13 4l9 9Z" className="fill-pink" />
      <path d="M39 16 35 4l-9 9Z" className="fill-pink" />
      <rect x="5" y="12" width="38" height="32" rx="9" className="fill-sky" />
      <path d="M5 22h38" strokeWidth="2" className="opacity-25" />
      <circle cx="17" cy="29" r="3" className="fill-ink" strokeWidth="0" />
      <circle cx="31" cy="29" r="3" className="fill-ink" strokeWidth="0" />
      <path d="M21.5 35h5L24 37.5Z" className="fill-pink" strokeWidth="1.5" />
    </svg>
  );
}
