import Image from "next/image";

type Illustration = {
  back: string;
  middle: string;
  cat: { src: string; width: number; height: number; flip?: boolean };
};

const illustrations = {
  play: {
    back: "bg-orange",
    middle: "bg-grape",
    cat: { src: "/cats/meownymous.webp", width: 290, height: 395 },
  },
  safe: {
    back: "bg-mint",
    middle: "bg-lilac",
    cat: {
      src: "/cats/root-kitty.webp",
      width: 327,
      height: 407,
      flip: true,
    },
  },
  code: {
    back: "bg-mint",
    middle: "bg-orange",
    cat: { src: "/cats/trojan-cat.webp", width: 287, height: 405 },
  },
} satisfies Record<string, Illustration>;

export type AboutIllustrationName = keyof typeof illustrations;

export function AboutIllustration({ name }: { name: AboutIllustrationName }) {
  const { back, middle, cat }: Illustration = illustrations[name];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-md p-6"
    >
      <div className={`toon absolute inset-6 rotate-6 rounded-3xl ${back}`} />
      <div
        className={`toon absolute inset-6 -rotate-3 rounded-3xl ${middle}`}
      />
      <div className="toon relative grid size-full place-items-center overflow-hidden rounded-3xl bg-paper">
        <span className="relative flex h-3/4 flex-col items-center justify-end">
          <Image
            src={cat.src}
            alt=""
            width={cat.width}
            height={cat.height}
            sizes="240px"
            draggable={false}
            className={`relative z-10 h-full w-auto select-none ${cat.flip ? "-scale-x-100" : ""}`}
          />
          <span className="-mt-4 h-6 w-4/5 rounded-[50%] bg-ink/10" />
        </span>
      </div>
    </div>
  );
}
