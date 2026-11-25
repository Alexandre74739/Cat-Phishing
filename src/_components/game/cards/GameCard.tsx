import Image from "next/image";
import { cardHeight, cardImage, cardWidth, type CardId } from "@/lib/cards";

type GameCardProps = {
  card: CardId;
  alt?: string;
  sizes?: string;
  className?: string;
};

export function GameCard({
  card,
  alt = "",
  sizes = "128px",
  className = "",
}: GameCardProps) {
  return (
    <span className={`block rounded-xl ${className}`}>
      <Image
        src={cardImage(card)}
        alt={alt}
        width={cardWidth}
        height={cardHeight}
        sizes={sizes}
        draggable={false}
        className="block aspect-400/612 h-auto w-full rounded-xl border-[3px] border-ink object-cover select-none"
      />
    </span>
  );
}
