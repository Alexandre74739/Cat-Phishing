import { routes } from "@/lib/navigation";
import { About } from "./_sections/About";
import { Deck } from "./_sections/Deck";
import { Demo } from "./_sections/Demo";
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
      <Deck
        id="game"
        title="A party card game where the phone runs the virus & your hands do the rest"
        intro="Cat-phishing is a real card game first. Deal the cats, put the phone in the middle of the table and get ready to shout. The app keeps an eye on the virus, while everything else happens with your cards, your eyes and your reflexes."
        actions={[
          {
            label: "Start a game",
            href: routes.play,
            variant: "sun",
            icon: "play",
          },
          {
            label: "Try a puzzle",
            href: routes.code,
            variant: "sky",
            icon: "code",
          },
        ]}
        tiles={[
          {
            eyebrow: "In your hand",
            title: "Six cats in every hand",
            description:
              "Every player gets the same squad of six colorful cats: Charo, Chapardeur, Chad, Chapin, Charal and Chalon. Each one has its own color and its own attitude. Learn them by heart: when the game speeds up, you'll need to spot the right cat in a flash and lay it down without a second thought.",
            stat: "×6",
            size: "large",
            color: "sun",
            icon: "cats",
            visual: {
              kind: "fan",
              cards: [
                "Charo",
                "Chapardeur",
                "Chad",
                "Chapin",
                "Charal",
                "Chalon",
              ],
            },
          },
          {
            eyebrow: "Your lifesaver",
            title: "Non !",
            description:
              "The card everyone wants to keep. Someone plays a nasty cat-astrophe card on you? Non ! The virus is coming your way? Non ! Slam it on the table and the attack is blocked, like a firewall.",
            size: "tall",
            color: "pink",
            icon: "nope",
            visual: {
              kind: "card",
              card: "Non !",
              caption: "Blocks a cat-astrophe or the virus",
            },
          },
          {
            eyebrow: "Cat-astrophe cards",
            title: "Two tricks up your sleeve",
            description:
              "On top of your cats, you hold two action cards. Play them at the right moment to turn the game around. New effects are being tested right now: stay tuned!",
            stat: "×2",
            size: "small",
            color: "lilac",
            icon: "action",
          },
          {
            eyebrow: "On the phone",
            title: "The virus lives in the app",
            description:
              "There's no virus card in the deck. The phone in the middle of the table shows who is infected. Managed to lay down one of your cats? You can pass the virus to another player. Pick their name, hand them the phone and enjoy the panic.",
            size: "wide",
            color: "sky",
            icon: "phone",
            visual: {
              kind: "phone",
              holder: "Maya",
              status: "has the virus!",
              action: "Pass it on",
              next: "Tom",
            },
          },
        ]}
      />
      <Demo
        id="puzzles"
        title="Write your very first program, right here, in under a minute"
        intro="The cat wants to reach the treasure chest. Add “move forward” blocks, press Run, and fix your code if needed. No signup, no install: just you, a few blocks and a very motivated cat."
        texts={{
          world: {
            label:
              "The cube cat on a data path, with a treasure chest at the end",
            show2d: "2D view",
            show3d: "3D view",
          },
          program: {
            title: "My program",
            clear: "Clear",
            start: "when I run",
            forward: "move forward",
            add: "+ forward",
            run: "Run",
          },
          messages: {
            empty: "Add “move forward” blocks, then press Run!",
            idle: "Press Run to watch the cat move!",
            running: "Here we go…",
            short: "Almost! The cat didn't reach the chest. Add a block.",
            far: "Oops, too far: the cat hit the firewall! Remove a block.",
          },
          win: {
            title: "Access granted!",
            text: "You just wrote your very first program. Ready for the real puzzles?",
            stars: "3 stars out of 3",
            replay: "Play again",
            next: { label: "See all puzzles", href: routes.code },
          },
        }}
      />
    </main>
  );
}
