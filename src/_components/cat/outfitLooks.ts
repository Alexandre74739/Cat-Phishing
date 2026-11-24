// Full class names so Tailwind finds them: each fur swaps the two tokens CatFace paints with.
export const furClasses: Record<string, string> = {
  ginger: "",
  snow: "[--color-fur:var(--color-fur-snow)] [--color-fur-dark:var(--color-fur-snow-dark)]",
  midnight:
    "[--color-fur:var(--color-fur-midnight)] [--color-fur-dark:var(--color-fur-midnight-dark)]",
  mint: "[--color-fur:var(--color-fur-mint)] [--color-fur-dark:var(--color-fur-mint-dark)]",
  bubblegum:
    "[--color-fur:var(--color-fur-bubblegum)] [--color-fur-dark:var(--color-fur-bubblegum-dark)]",
  lilac:
    "[--color-fur:var(--color-fur-lilac)] [--color-fur-dark:var(--color-fur-lilac-dark)]",
  gold: "[--color-fur:var(--color-fur-gold)] [--color-fur-dark:var(--color-fur-gold-dark)]",
  matrix:
    "[--color-fur:var(--color-fur-matrix)] [--color-fur-dark:var(--color-fur-matrix-dark)]",
  sky: "[--color-fur:var(--color-fur-sky)] [--color-fur-dark:var(--color-fur-sky-dark)]",
  coral:
    "[--color-fur:var(--color-fur-coral)] [--color-fur-dark:var(--color-fur-coral-dark)]",
  ash: "[--color-fur:var(--color-fur-ash)] [--color-fur-dark:var(--color-fur-ash-dark)]",
};

export const trailDots: Record<string, string[]> = {
  sparkles: ["bg-fur-gold", "bg-cream"],
  bubbles: ["bg-sky-soft", "bg-sky"],
  bits: ["bg-slime", "bg-slime-dark"],
  rainbow: [
    "bg-coral",
    "bg-orange",
    "bg-fur-gold",
    "bg-slime",
    "bg-sky",
    "bg-grape",
  ],
  flames: ["bg-lava", "bg-orange", "bg-fur-gold"],
  hearts: ["bg-pink", "bg-coral"],
  snow: ["bg-paper", "bg-sky-soft"],
  stars: ["bg-fur-gold", "bg-orange"],
  viruses: ["bg-coral", "bg-lava"],
};
