import { countBlocks, type Block, type BlockType } from "./blocks";
import { bootCamp } from "./levelData/bootCamp";
import { bugVillage } from "./levelData/bugVillage";
import { dataRiver } from "./levelData/dataRiver";
import { firewallCastle } from "./levelData/firewallCastle";
import { kittenNetwork } from "./levelData/kittenNetwork";
import { masterMaze } from "./levelData/masterMaze";
import { passwordValley } from "./levelData/passwordValley";
import { secretIsland } from "./levelData/secretIsland";
import { serverVolcano } from "./levelData/serverVolcano";
import { spamInbox } from "./levelData/spamInbox";
import type { LevelMap } from "./levels";

export type Level = LevelMap & {
  title: string;
  concept: string;
  goal: string;
  tip: string;
  blocks: BlockType[];
  solution: Block[];
  optimal: number;
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  difficulty: 1 | 2 | 3 | 4;
  color: string;
  newBlocks: BlockType[];
  preview: number;
  levels: Level[];
  unlock?: { stars: number; courses: string[] };
};

// Every course has exactly 10 levels.
export const levelsPerCourse = 10;

export type RawLevel = Omit<Level, "optimal">;

const withOptimal = (levels: RawLevel[]): Level[] =>
  levels.map((level) => ({ ...level, optimal: countBlocks(level.solution) }));

export const courses: Course[] = [
  {
    slug: "boot-camp",
    title: "Boot camp",
    subtitle: "Learn the basics with Meownymous: move, turn and repeat.",
    difficulty: 1,
    color: "bg-sky",
    newBlocks: ["forward", "repeat", "if"],
    preview: 8,
    levels: withOptimal(bootCamp),
  },
  {
    slug: "kitten-network",
    title: "Kitten network",
    subtitle: "Easy practice: paths, loops, gems and your first checks.",
    difficulty: 1,
    color: "bg-lilac",
    newBlocks: [],
    preview: 6,
    levels: withOptimal(kittenNetwork),
  },
  {
    slug: "password-valley",
    title: "Password valley",
    subtitle: "Locked gates everywhere! Find the password keys to get through.",
    difficulty: 2,
    color: "bg-mint",
    newBlocks: ["open", "turnAround"],
    preview: 8,
    levels: withOptimal(passwordValley),
  },
  {
    slug: "data-river",
    title: "Data river",
    subtitle:
      "Bridges, spam and twisty streams: train your loops and conditions.",
    difficulty: 2,
    color: "bg-gem",
    newBlocks: [],
    preview: 5,
    levels: withOptimal(dataRiver),
  },
  {
    slug: "spam-inbox",
    title: "Spam inbox",
    subtitle:
      "Keys, gates, spam and sensors: clean the inbox with smart loops.",
    difficulty: 2,
    color: "bg-coral",
    newBlocks: [],
    preview: 9,
    levels: withOptimal(spamInbox),
  },
  {
    slug: "server-volcano",
    title: "Server volcano",
    subtitle: "Jump over the lava and repeat until the chest.",
    difficulty: 3,
    color: "bg-orange",
    newBlocks: ["jump", "until"],
    preview: 8,
    levels: withOptimal(serverVolcano),
  },
  {
    slug: "bug-village",
    title: "Bug village",
    subtitle: "Dodge the viruses and zap the bugs!",
    difficulty: 3,
    color: "bg-slime",
    newBlocks: ["wait", "zap", "ifElse"],
    preview: 9,
    levels: withOptimal(bugVillage),
  },
  {
    slug: "master-maze",
    title: "Master maze",
    subtitle: "If… else, mazes and real pro algorithms.",
    difficulty: 4,
    color: "bg-lilac",
    newBlocks: ["ifElse"],
    preview: 9,
    levels: withOptimal(masterMaze),
  },
  {
    slug: "firewall-castle",
    title: "Firewall castle",
    subtitle: "Algorithms, lava and enemy guards: the expert challenge!",
    difficulty: 4,
    color: "bg-pink",
    newBlocks: [],
    preview: 9,
    levels: withOptimal(firewallCastle),
  },
  {
    slug: "secret-island",
    title: "Secret island",
    subtitle: "A hidden world. All your blocks for one last adventure!",
    difficulty: 3,
    color: "bg-orange",
    newBlocks: [],
    preview: 2,
    levels: withOptimal(secretIsland),
    unlock: {
      stars: 60,
      courses: [
        "boot-camp",
        "password-valley",
        "server-volcano",
        "master-maze",
      ],
    },
  },
];

export const findCourse = (slug: string) =>
  courses.find((course) => course.slug === slug);

export const levelKey = (course: string, number: number) =>
  `${course}:${number}`;
