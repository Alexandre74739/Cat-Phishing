import type { Metadata } from "next";
import { PartyGame } from "@/_components/game/PartyGame";

export const metadata: Metadata = {
  title: "Play · Cat-phishing",
  description:
    "Game Assistant Mode: read the rules, seat the players and pass the cat-ware around the table.",
};

export default function PlayPage() {
  return (
    <PartyGame
      texts={{
        rules: {
          title: "How to play",
          step: "Step {current} of {total}",
          prev: "Previous rule",
          next: "Next",
          skip: "Skip",
          start: "Seat the players",
          resume: "Back to the game",
          slides: [
            {
              icon: "setup",
              eyebrow: "Setup · 2 min",
              title: "Deal the cards",
              visual: {
                kind: "families",
                cards: [
                  { card: "feline-system", name: "Feline-system" },
                  { card: "script-kitty", name: "Script Kitty" },
                  { card: "root-kitty", name: "Root-kitty" },
                  { card: "trojan-cat", name: "Trojan Cat" },
                  { card: "stalker-cat", name: "Stalker-cat" },
                  { card: "meownymous", name: "Meownymous" },
                ],
              },
              points: [
                "3 to 6 players.",
                "Each player gets the 6 Cat cards of one color, face down.",
                "Shuffle the Cat-astrophe cards and deal 2 to each player. Keep them hidden!",
              ],
            },
            {
              icon: "call",
              eyebrow: "Your turn",
              title: "Play & call",
              visual: { kind: "deck", caption: "The center pile" },
              points: [
                "Lay 1 Cat card face up on the center pile and call any family: “I ask for Meownymous!”",
                "Everyone else races: the first to slap a matching card wins.",
                "Too slow? Take your card back. The fastest player calls next.",
              ],
            },
            {
              icon: "catware",
              eyebrow: "The digital bomb",
              title: "Pass the cat-ware",
              visual: {
                kind: "card",
                card: "cat-ware",
                caption: "Only on the phone",
              },
              points: [
                "The cat-ware only lives on this phone: everyone can see who holds it.",
                "Win a race while holding it? You may pass it to a player who didn't play a card this turn.",
              ],
            },
            {
              icon: "breach",
              eyebrow: "Explosion!",
              title: "Security breach",
              points: [
                "You call a family nobody has? You're out!",
                "At the same moment, the cat-ware explodes on its holder. No Furr-wall? Out too!",
                "The app gives the cat-ware to a random survivor. The player on the left of the asker plays next.",
              ],
            },
            {
              icon: "cards",
              eyebrow: "Cat-astrophe cards",
              title: "Your secret weapons",
              visual: {
                kind: "actions",
                cards: [
                  {
                    card: "furr-wall",
                    name: "Furr-wall",
                    effect:
                      "Blocks the explosion when the cat-ware blows up on you.",
                  },
                  {
                    card: "paws-word",
                    name: "Paws-word",
                    effect:
                      "Any time: cancels a Claw-jacking, a Spy-cat or a cat-ware sent to you.",
                  },
                  {
                    card: "claw-jacking",
                    name: "Claw-jacking",
                    effect: "Your turn: steal 1 random card from a player.",
                  },
                  {
                    card: "spy-cat",
                    name: "Spy-cat",
                    effect: "Your turn: secretly look at a player's hand.",
                  },
                ],
              },
              points: ["Used cards go to a separate discard pile."],
            },
            {
              icon: "win",
              eyebrow: "Victory",
              title: "How to win",
              points: [
                "Speed victory: be the first to get rid of all your Cat cards.",
                "Survival victory: be the last player left on the network.",
              ],
            },
          ],
        },
        setup: {
          title: "Who's playing?",
          seats:
            "3 to 6 players. Tap a ? to add them clockwise, in the order you sit around the table.",
          addTitle: "New player",
          seat: "Seat {count}, clockwise",
          close: "Close",
          name: "Nickname",
          namePlaceholder: "Nickname, e.g. Maya",
          add: "Add",
          cancel: "Cancel",
          remove: "Remove {name}",
          empty: "No players yet: add the first one!",
          needMore: "{count} more to start",
          start: "Start",
          rules: "See the rules",
        },
        side: {
          title: "Players",
          open: "Players ({count})",
          close: "Close the player list",
        },
        table: {
          label: "Players around the table",
          holder: "Holds the cat-ware",
          first: "Plays first",
          empty: "Add a player",
        },
        toolbar: { rules: "Rules", newGame: "New game" },
        cards: {
          catware: "Cat-ware",
          zoom: "See the cat-ware card",
          close: "Close",
          heldBy: "Held by {name}",
          points: [
            "It only lives on this phone: everyone can see who holds it.",
            "Someone calls a family nobody has? It explodes on its holder.",
            "A Furr-wall blocks the explosion.",
            "Win a race while holding it to pass it on.",
          ],
        },
        draw: {
          title: "Scanning the network…",
          alert: "Virus detected!",
          holder: "{name} gets the cat-ware!",
          holderHint: "Win a race to pass it on.",
        },
        give: {
          title: "{name} has the cat-ware!",
          text: "Won a race? Tap a player to give it away.",
          sent: "{from} sent the cat-ware to {to}!",
          blockHint: "Got a Paws-word card? Block it!",
          block: "Paws-word!",
          done: "Continue",
        },
      }}
    />
  );
}
