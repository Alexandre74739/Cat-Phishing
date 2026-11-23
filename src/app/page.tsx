import { routes } from "@/lib/navigation";
import { About } from "./_sections/About";
import { Hero } from "./_sections/Hero";
import { Reveal } from "./_sections/Reveal";

export default function Home() {
  return (
    <main>
      <Hero
        title="Don't get"
        highlight="cat-phished!"
        description="The party card game where cats pass a virus around the table. One phone, zero chill, and code puzzles you'll want to replay."
        actions={[
          {
            label: "Play now",
            href: routes.play,
            variant: "sun",
            icon: "next",
            iconSide: "end",
          },
          {
            label: "Start coding",
            href: routes.code,
            variant: "sky",
            icon: "code",
          },
        ]}
        highlights={["Ages 12+", "One shared phone", "Code puzzles"]}
      />
      <Reveal
        id="intro"
        text="Six cats in your hand. One virus on the phone. Drop your cards fast, pass the virus on, and pray it's not yours when someone slips up!"
        keywords={["cats", "virus", "fast", "slips"]}
        badge="Message decrypted!"
      />
      <About
        id="about"
        title="About Cat-phishing"
        rows={[
          {
            title: "One phone, one virus, zero chill",
            description:
              "Everyone starts with six colorful cats: Charo, Chapardeur, Chad, Chapin, Charal and Chalon. The virus doesn't exist on paper, it only lives in the app, on top of someone's cards. Manage to lay down one of your cats and you can send the virus to another player. But watch out: when someone makes a mistake, they lose, and so does whoever is holding the virus.",
            highlights: [
              "6 cat cards and 2 action cards per player",
              "The virus only lives in the app",
              "One phone passed around the table",
              "A mistake costs you and the virus holder",
            ],
            action: {
              label: "Play now",
              href: routes.play,
              variant: "sun",
              icon: "next",
              iconSide: "end",
            },
            illustration: "play",
          },
          {
            title: "Made for the whole table",
            description:
              "Cat-phishing is made for players aged 12 and up: friends, family or classmates. One phone sits in the middle of the table and goes from hand to hand, so nobody needs their own device. We only ask for a nickname, and your data stays in Europe.",
            highlights: [
              "Just a nickname, no email",
              "No ads, no trackers",
              "Data stored in Europe",
              "Works on a single phone",
            ],
            illustration: "safe",
          },
          {
            title: "Code your cube cat",
            description:
              "Snap code blocks together to guide a cube-shaped cat through 3D puzzles. Each level is a small challenge: plan your moves, press play and watch your cat follow your code step by step. Missed it? Fix your program and try again until your cat makes it.",
            highlights: [
              "Drag-and-drop code blocks",
              "3D puzzle worlds",
              "Levels that get trickier",
              "Think like a real programmer",
            ],
            action: {
              label: "Start coding",
              href: routes.code,
              variant: "sky",
              icon: "code",
            },
            illustration: "code",
          },
        ]}
      />
    </main>
  );
}
