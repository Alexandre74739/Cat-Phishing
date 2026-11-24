import { courses, levelKey, levelsPerCourse } from "./courses";
import { courseStats, totalStars } from "./courseProgress";
import { hasRecord, type StarsBySlug } from "./progress";

export type BadgeId =
  | "firstCode"
  | "shiningStar"
  | "betterThanCatchat"
  | "loopRookie"
  | "nestedLoops"
  | "untilLoop"
  | "firstCatch"
  | "ifThen"
  | "bugSquasher"
  | "virusDodger"
  | "whileLoop"
  | "halfway"
  | "starCollector"
  | "starHoarder"
  | "graduate"
  | "loopMaster"
  | "phishHunter"
  | "antivirusHero"
  | "debugger"
  | "kittenGraduate"
  | "gemHunter"
  | "mazeRunner"
  | "vaultCracker"
  | "stormChaser"
  | "loopLegend"
  | "halfwayThere"
  | "marathon"
  | "starGalaxy"
  | "perfectTrio"
  | "perfectCourse"
  | "legend";

export type Badge = {
  id: BadgeId;
  name: string;
  text: string;
  earned: (stars: StarsBySlug) => boolean;
};

const levelDone = (slug: string, number: number) => (stars: StarsBySlug) =>
  !!stars[levelKey(slug, number)];

const levelsDone = (stars: StarsBySlug) =>
  courses.reduce((total, course) => total + courseStats(course, stars).done, 0);

const courseDone = (slug: string) => (stars: StarsBySlug) => {
  const course = courses.find((item) => item.slug === slug);
  return !!course && courseStats(course, stars).done === levelsPerCourse;
};

export const badges: Badge[] = [
  {
    id: "firstCode",
    name: "First line of code",
    text: "Solve your very first level.",
    earned: (stars) => Object.values(stars).some(Boolean),
  },
  {
    id: "shiningStar",
    name: "Shining star",
    text: "Get 3 stars on a level.",
    earned: (stars) => Object.values(stars).some((value) => value === 3),
  },
  {
    id: "betterThanCatchat",
    name: "Better than Catchat",
    text: "Solve a level with fewer blocks than Catchat.",
    earned: hasRecord,
  },
  {
    id: "loopRookie",
    name: "Loop rookie",
    text: "Use your first loop in Cat school.",
    earned: levelDone("cat-school", 7),
  },
  {
    id: "nestedLoops",
    name: "Loop in a loop",
    text: "Solve “Loop in a loop” in Data loops.",
    earned: levelDone("data-loops", 3),
  },
  {
    id: "untilLoop",
    name: "Until the end",
    text: "Use “repeat until chest” for the first time.",
    earned: levelDone("data-loops", 6),
  },
  {
    id: "firstCatch",
    name: "First catch",
    text: "Grab your first shiny gem.",
    earned: levelDone("phish-market", 1),
  },
  {
    id: "ifThen",
    name: "If… then!",
    text: "Write your first condition.",
    earned: levelDone("phish-market", 6),
  },
  {
    id: "bugSquasher",
    name: "Bug squasher",
    text: "Zap your first bug.",
    earned: levelDone("bugs-and-viruses", 1),
  },
  {
    id: "virusDodger",
    name: "Virus dodger",
    text: "Dodge your first virus.",
    earned: levelDone("virus-patrol", 1),
  },
  {
    id: "whileLoop",
    name: "While loop pro",
    text: "Use “while virus ahead” for the first time.",
    earned: levelDone("virus-patrol", 4),
  },
  {
    id: "halfway",
    name: "On a roll",
    text: "Solve 20 levels.",
    earned: (stars) => levelsDone(stars) >= 20,
  },
  {
    id: "starCollector",
    name: "Star collector",
    text: "Collect 50 stars.",
    earned: (stars) => totalStars(stars) >= 50,
  },
  {
    id: "starHoarder",
    name: "Star hoarder",
    text: "Collect 100 stars.",
    earned: (stars) => totalStars(stars) >= 100,
  },
  {
    id: "halfwayThere",
    name: "Halfway there",
    text: "Solve 50 levels.",
    earned: (stars) => levelsDone(stars) >= 50,
  },
  {
    id: "starGalaxy",
    name: "Star galaxy",
    text: "Collect 200 stars.",
    earned: (stars) => totalStars(stars) >= 200,
  },
  {
    id: "graduate",
    name: "Cat school graduate",
    text: "Finish all 10 levels of Cat school.",
    earned: courseDone("cat-school"),
  },
  {
    id: "loopMaster",
    name: "Loop master",
    text: "Finish all 10 levels of Data loops.",
    earned: courseDone("data-loops"),
  },
  {
    id: "phishHunter",
    name: "Phish hunter",
    text: "Finish all 10 levels of Phish market.",
    earned: courseDone("phish-market"),
  },
  {
    id: "antivirusHero",
    name: "Antivirus hero",
    text: "Finish all 10 levels of Virus patrol.",
    earned: courseDone("virus-patrol"),
  },
  {
    id: "debugger",
    name: "Debugger",
    text: "Finish all 10 levels of Bugs & viruses.",
    earned: courseDone("bugs-and-viruses"),
  },
  {
    id: "kittenGraduate",
    name: "Tiny paws",
    text: "Finish all 10 levels of Kitten steps.",
    earned: courseDone("kitten-steps"),
  },
  {
    id: "gemHunter",
    name: "Gem hunter",
    text: "Finish all 10 levels of Gem hunt.",
    earned: courseDone("gem-hunt"),
  },
  {
    id: "mazeRunner",
    name: "Maze runner",
    text: "Finish all 10 levels of Firewall maze.",
    earned: courseDone("firewall-maze"),
  },
  {
    id: "vaultCracker",
    name: "Vault cracker",
    text: "Finish all 10 levels of Gem vault.",
    earned: courseDone("gem-vault"),
  },
  {
    id: "stormChaser",
    name: "Storm chaser",
    text: "Finish all 10 levels of Virus storm.",
    earned: courseDone("virus-storm"),
  },
  {
    id: "loopLegend",
    name: "Loop legend",
    text: "Finish all 10 levels of Loop legends.",
    earned: courseDone("loop-legends"),
  },
  {
    id: "perfectCourse",
    name: "Perfect coder",
    text: "Get all 30 stars in one course.",
    earned: (stars) =>
      courses.some((course) => {
        const stats = courseStats(course, stars);
        return stats.stars === stats.maxStars;
      }),
  },
  {
    id: "perfectTrio",
    name: "Perfect trio",
    text: "Get all 30 stars in 3 courses.",
    earned: (stars) =>
      courses.filter((course) => {
        const stats = courseStats(course, stars);
        return stats.stars === stats.maxStars;
      }).length >= 3,
  },
  {
    id: "marathon",
    name: "Code marathon",
    text: "Solve every level of every course.",
    earned: (stars) => levelsDone(stars) === courses.length * levelsPerCourse,
  },
  {
    id: "legend",
    name: "Network legend",
    text: "Get every star of every course.",
    earned: (stars) =>
      totalStars(stars) === courses.length * levelsPerCourse * 3,
  },
];

export const earnedBadges = (stars: StarsBySlug) =>
  badges.filter((badge) => badge.earned(stars));
