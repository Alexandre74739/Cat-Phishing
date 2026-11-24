import type { Metadata } from "next";
import { courses, levelsPerCourse } from "@/lib/courses";
import { BadgeList } from "./_components/BadgeList";
import { CourseList } from "./_components/CourseList";
import { TreasureSection } from "./_components/TreasureSection";

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
          {courses.length} courses, {levelsPerCourse} levels each. Snap code
          blocks together to guide the cube cat to the treasure chest: grab the
          gems, bridge the streams, jump over the lava, zap the bugs and dodge
          the viruses!
        </p>
        <div className="mt-14">
          <TreasureSection
            texts={{
              title: "The treasure map",
              text: "Finish a course below to win a piece of the map. Find all {total} pieces and {stars} stars to open the {world}!",
              complete:
                "The map is complete! Now collect {stars} stars to open the {world}.",
              open: "The map is complete! The {world} is open: go explore it!",
              map: "Treasure map: {count} of {total} pieces found",
              pieces: "{count} / {total} pieces",
              stars: "Stars to open the {world}",
              courses: "Courses that hide a piece of the map",
              done: "finished",
              newPiece: "New piece!",
              found: "New piece of the map found: {course}!",
              play: "Explore the {world}",
            }}
          />
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
              locked: {
                text: "A secret world… Finish these courses and collect {stars} stars to discover it!",
                stars: "stars",
                done: "finished",
              },
              blocks: {
                forward: "move forward",
                left: "turn left",
                right: "turn right",
                turnAround: "turn around",
                jump: "jump",
                wait: "wait",
                grab: "grab",
                smash: "smash spam",
                bridge: "build bridge",
                open: "open gate",
                zap: "zap bug",
                repeat: "repeat",
                until: "repeat until chest",
                if: "if",
                ifElse: "if… else",
              },
            }}
          />
        </div>
        <BadgeList title="My badges" lockedLabel="To unlock:" />
      </div>
    </main>
  );
}
