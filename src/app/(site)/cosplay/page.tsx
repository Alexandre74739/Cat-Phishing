import type { Metadata } from "next";
import { Wardrobe } from "./_components/Wardrobe";

export const metadata: Metadata = {
  title: "Cosplay · Cat-phishing",
  description: "Dress up the cube cat with the stars you win in code puzzles.",
};

export default function CosplayPage() {
  return (
    <main className="dots min-h-svh px-4 pt-28 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-6xl">
          Cosplay
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-semibold text-ink">
          Win stars and badges in the code puzzles to unlock new fur colors,
          hats, glasses, collars, capes and magic trails for your cube cat!
        </p>
        <Wardrobe
          texts={{
            preview: "Your cube cat in its outfit",
            stars: "stars won",
            nextGift: "Next gift: {item}",
            giftProgress: "Stars for the next gift",
            allUnlocked: "You unlocked everything. Amazing coder!",
            categories: "Outfit parts",
            slots: {
              fur: "Fur",
              hat: "Hats",
              face: "Face",
              neck: "Neck",
              back: "Back",
              trail: "Trails",
            },
            locked: "locked, {lock}",
            lockStars: "{count} stars",
            lockBadge: "Badge “{badge}”",
            newSecretBadge: "New secret badge: {badge}!",
          }}
        />
      </div>
    </main>
  );
}
