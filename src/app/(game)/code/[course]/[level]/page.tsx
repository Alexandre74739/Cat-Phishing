import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { courses, levelsPerCourse } from "@/lib/courses";
import { LevelGame } from "./_components/LevelGame";
import type { LevelTexts } from "./_components/types";

type Params = PageProps<"/code/[course]/[level]">["params"];

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.levels.map((_, index) => ({
      course: course.slug,
      level: String(index + 1),
    })),
  );
}

async function resolve(params: Params) {
  const { course, level } = await params;
  const courseIndex = courses.findIndex(({ slug }) => slug === course);
  const number = Number(level);
  if (
    courseIndex < 0 ||
    !Number.isInteger(number) ||
    number < 1 ||
    number > levelsPerCourse
  )
    return null;
  return { courseIndex, number };
}

export async function generateMetadata({
  params,
}: PageProps<"/code/[course]/[level]">): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return { title: "Cat-phishing" };
  const course = courses[found.courseIndex];
  if (course.unlock)
    return {
      title: `${course.title} · Cat-phishing`,
      robots: { index: false, follow: false },
    };
  return {
    title: `${course.levels[found.number - 1].title} · ${course.title} · Cat-phishing`,
  };
}

const texts: LevelTexts = {
  nav: {
    back: "Courses",
    levels: "Levels of this course",
    level: "Level",
    locked: "locked",
    stars: "stars",
    badges: "badges",
  },
  story: { listen: "Read aloud" },
  locked: {
    text: "A secret world… Finish these courses and collect {stars} stars to discover it!",
    stars: "stars",
    done: "finished",
  },
  difficulty: ["Beginner", "Medium", "Hard", "Expert"],
  world: {
    label: "The cube cat in the network, with the treasure chest to reach",
    show2d: "2D view",
    show3d: "3D view",
    gems: "gems collected",
    keys: "keys held",
  },
  editor: {
    paletteTitle: "Blocks",
    programTitle: "My program",
    start: "when I run",
    emptyHint: "Drag a block here, or tap it!",
    dropHere: "drop blocks here",
    times: "times",
    fewer: "One time less",
    more: "One time more",
    moveUp: "Move block up",
    moveDown: "Move block down",
    remove: "Remove block",
    clear: "Clear",
    keyboardHelp: "Delete to remove it, Alt + arrows to move it.",
    score: "Blocks used. 3 stars with {optimal} blocks or fewer.",
    dropToDelete: "Drop to delete",
    else: "else",
    condition: "Choose what to check",
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
      ifElse: "if",
    },
    conditions: {
      path: "path ahead",
      pathRight: "path on right",
      pathLeft: "path on left",
      stream: "stream ahead",
      spam: "spam ahead",
      lava: "lava ahead",
      gate: "gate ahead",
      enemy: "enemy ahead",
      bug: "bug ahead",
    },
  },
  controls: {
    run: "Run",
    stop: "Stop",
    reset: "Start again",
    fast: "Fast speed (tap for normal)",
    normal: "Normal speed (tap for fast)",
  },
  messages: {
    running: "Running your code…",
    win: "Treasure unlocked!",
    empty: "Your program is empty! Add some blocks first.",
    blocked: "Ouch, a firewall! Check where the cat is facing.",
    spam: "A spam rock blocks the way! Smash it first.",
    locked: "This gate is locked! Grab a key, then open it.",
    stream: "Splash! The cat fell into the data stream. Build a bridge!",
    lava: "Ouch, hot lava! Jump over it next time.",
    bug: "A bug caught the cat! Zap it when it is right in front.",
    virus:
      "A virus caught the cat! You can't zap a virus: wait for it to pass.",
    gemsMissing: "Some gems are still shining around. Grab them all!",
    notAtGoal: "Almost! The cat didn't reach the chest.",
    tooLong: "Your program runs too long. Check your loops!",
  },
  help: {
    retry: "Fix your program and try again!",
    keepGoing: "Don't give up, you're getting closer!",
    tip: "Tip: {tip}",
  },
  win: {
    title: "Treasure unlocked!",
    text: "Your code worked!",
    stars: "stars out of 3",
    replay: "Play again",
    next: "Next level",
    nextCourse: "Next course",
    allDone: "All courses",
    perfect: "Perfect score: you found the shortest program!",
    beatCatchat:
      "You beat Catchat! Your program is even shorter than Catchat's.",
    improve: "You used {used} blocks. Try with {optimal} or fewer for 3 stars!",
    newBadge: "New badge:",
  },
};

async function Level({ params }: { params: Params }) {
  const found = await resolve(params);
  if (!found) notFound();

  return (
    <LevelGame
      key={`${found.courseIndex}-${found.number}`}
      courseIndex={found.courseIndex}
      number={found.number}
      texts={texts}
    />
  );
}

export default function LevelPage({
  params,
}: PageProps<"/code/[course]/[level]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <Level params={params} />
    </Suspense>
  );
}
