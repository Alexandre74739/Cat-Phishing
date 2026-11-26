import { courses, levelKey, levelsPerCourse } from "./courses";
import { courseStats, totalStars } from "./courseProgress";
import { hasRecord, type StarsBySlug } from "./progress";
import type { SecretBadgeId } from "./secretBadges";

export type BadgeId =
  | "firstCode"
  | "shiningStar"
  | "betterThanCatchat"
  | "firstCatch"
  | "loopRookie"
  | "bridgeBuilder"
  | "nestedLoops"
  | "ifThen"
  | "keyFinder"
  | "lavaJumper"
  | "untilLoop"
  | "bugSquasher"
  | "virusDodger"
  | "ifElsePro"
  | "halfway"
  | "starCollector"
  | "halfwayThere"
  | "starHoarder"
  | "starGalaxy"
  | "graduate"
  | "kittenGraduate"
  | "gatekeeper"
  | "inboxZero"
  | "networkFixer"
  | "coreCooler"
  | "debugger"
  | "mazeRunner"
  | "castleHero"
  | "islandExplorer"
  | "perfectCourse"
  | "perfectTrio"
  | "marathon"
  | "legend"
  | SecretBadgeId;

export type Badge = {
  id: BadgeId;
  name: string;
  text: string;
  hint?: string;
  earned: (stars: StarsBySlug, secrets: readonly SecretBadgeId[]) => boolean;
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
    name: "Better than Meownymous",
    text: "Solve a level with fewer blocks than Meownymous.",
    earned: hasRecord,
  },
  {
    id: "firstCatch",
    name: "First catch",
    text: "Grab your first shiny gem.",
    earned: levelDone("boot-camp", 4),
  },
  {
    id: "loopRookie",
    name: "Loop rookie",
    text: "Use your first loop in Boot camp.",
    earned: levelDone("boot-camp", 5),
  },
  {
    id: "bridgeBuilder",
    name: "Bridge builder",
    text: "Build your first bridge over a data stream.",
    earned: levelDone("boot-camp", 7),
  },
  {
    id: "nestedLoops",
    name: "Loop in a loop",
    text: "Put a loop inside another loop.",
    earned: levelDone("boot-camp", 9),
  },
  {
    id: "ifThen",
    name: "If… then!",
    text: "Write your first condition.",
    earned: levelDone("boot-camp", 10),
  },
  {
    id: "keyFinder",
    name: "Key finder",
    text: "Open your first locked gate.",
    earned: levelDone("password-valley", 1),
  },
  {
    id: "lavaJumper",
    name: "Lava jumper",
    text: "Jump over the lava for the first time.",
    earned: levelDone("server-volcano", 1),
  },
  {
    id: "untilLoop",
    name: "Until the end",
    text: "Use “repeat until chest” for the first time.",
    earned: levelDone("server-volcano", 3),
  },
  {
    id: "bugSquasher",
    name: "Bug squasher",
    text: "Zap your first bug.",
    earned: levelDone("bug-village", 1),
  },
  {
    id: "virusDodger",
    name: "Virus dodger",
    text: "Dodge your first virus.",
    earned: levelDone("bug-village", 2),
  },
  {
    id: "ifElsePro",
    name: "If… else pro",
    text: "Use “if… else” for the first time.",
    earned: levelDone("bug-village", 5),
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
    id: "halfwayThere",
    name: "Halfway there",
    text: "Solve 40 levels.",
    earned: (stars) => levelsDone(stars) >= 40,
  },
  {
    id: "starHoarder",
    name: "Star hoarder",
    text: "Collect 100 stars.",
    earned: (stars) => totalStars(stars) >= 100,
  },
  {
    id: "starGalaxy",
    name: "Star galaxy",
    text: "Collect 200 stars.",
    earned: (stars) => totalStars(stars) >= 200,
  },
  {
    id: "graduate",
    name: "Boot camp graduate",
    text: "Finish all 10 levels of Boot camp.",
    earned: courseDone("boot-camp"),
  },
  {
    id: "kittenGraduate",
    name: "Tiny paws",
    text: "Finish all 10 levels of Kitten network.",
    earned: courseDone("kitten-network"),
  },
  {
    id: "inboxZero",
    name: "Inbox zero",
    text: "Finish all 10 levels of Spam inbox.",
    earned: courseDone("spam-inbox"),
  },
  {
    id: "gatekeeper",
    name: "Gatekeeper",
    text: "Finish all 10 levels of Password valley.",
    earned: courseDone("password-valley"),
  },
  {
    id: "networkFixer",
    name: "Network fixer",
    text: "Finish all 10 levels of Data river.",
    earned: courseDone("data-river"),
  },
  {
    id: "coreCooler",
    name: "Core cooler",
    text: "Finish all 10 levels of Server volcano.",
    earned: courseDone("server-volcano"),
  },
  {
    id: "debugger",
    name: "Debugger",
    text: "Finish all 10 levels of Bug village.",
    earned: courseDone("bug-village"),
  },
  {
    id: "mazeRunner",
    name: "Maze runner",
    text: "Finish all 10 levels of Master maze.",
    earned: courseDone("master-maze"),
  },
  {
    id: "castleHero",
    name: "Castle hero",
    text: "Finish all 10 levels of Firewall castle.",
    earned: courseDone("firewall-castle"),
  },
  {
    id: "islandExplorer",
    name: "Island explorer",
    text: "Finish all 10 levels of Secret island.",
    earned: courseDone("secret-island"),
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
  {
    id: "stylist",
    name: "Stylist",
    text: "You changed your cube cat's look!",
    hint: "Your cube cat would love a new outfit…",
    earned: (_, secrets) => secrets.includes("stylist"),
  },
];

export const earnedBadges = (
  stars: StarsBySlug,
  secrets: readonly SecretBadgeId[] = [],
) => badges.filter((badge) => badge.earned(stars, secrets));
