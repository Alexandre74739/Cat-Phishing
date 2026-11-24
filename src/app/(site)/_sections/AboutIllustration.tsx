import { Blocks, Gamepad2, ShieldCheck } from "lucide-react";

// Temporary placeholders: the final illustrations will replace this component.
const illustrations = {
  play: { Icon: Gamepad2, back: "bg-orange", middle: "bg-orange-soft" },
  safe: { Icon: ShieldCheck, back: "bg-lilac", middle: "bg-scene-deep" },
  code: { Icon: Blocks, back: "bg-mint", middle: "bg-action-soft" },
};

export type AboutIllustrationName = keyof typeof illustrations;

export function AboutIllustration({ name }: { name: AboutIllustrationName }) {
  const { Icon, back, middle } = illustrations[name];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-md p-6"
    >
      <div
        className={`toon absolute inset-6 rotate-6 rounded-[30px] ${back}`}
      />
      <div
        className={`toon absolute inset-6 -rotate-3 rounded-[30px] ${middle}`}
      />
      <div className="toon dots relative grid size-full place-items-center rounded-[30px] bg-paper">
        <span className="toon grid size-28 place-items-center rounded-full bg-lilac text-ink">
          <Icon size={52} strokeWidth={2.25} />
        </span>
      </div>
    </div>
  );
}
