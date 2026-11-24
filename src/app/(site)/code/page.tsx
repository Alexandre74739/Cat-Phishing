import type { Metadata } from "next";
import { BadgeList } from "./_components/BadgeList";
import { CourseList } from "./_components/CourseList";

export const metadata: Metadata = {
  title: "Code puzzles · Cat-phishing",
  description: "Guide the cube cat through the network with code blocks.",
};

export default function CodePage() {
  return (
    <main className="dots min-h-svh px-4 pt-28 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-6xl">
          Code puzzles
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-semibold text-ink">
          11 courses, 10 levels each. Snap code blocks together to guide the
          cube cat to the treasure chest, grab the shiny gems, zap the bugs and
          dodge the viruses!
        </p>
        <div className="mt-14">
          <CourseList
            pager={{
              label: "Course pages",
              page: "Page",
              previous: "Previous page",
              next: "Next page",
            }}
            texts={{
              difficulty: ["Beginner", "Medium", "Hard", "Expert"],
              level: "Level",
              levels: "levels",
              stars: "stars",
              info: "New blocks in this course",
              newBlocks: "New blocks in this course:",
              start: "Start",
              continue: "Continue",
              replay: "Play again",
              startHere: "Start here!",
              preview: "Preview of",
              blocks: {
                forward: "move forward",
                left: "turn left",
                right: "turn right",
                grab: "grab gem",
                zap: "zap bug",
                wait: "wait",
                repeat: "repeat",
                until: "repeat until chest",
                ifWall: "if firewall ahead",
                ifGem: "if gem here",
                ifBug: "if bug ahead",
                whileVirus: "while virus ahead",
              },
            }}
          />
        </div>
        <BadgeList title="My badges" lockedLabel="To unlock:" />
      </div>
    </main>
  );
}
