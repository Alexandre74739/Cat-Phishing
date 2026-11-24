import { registerHooks } from "node:module";

// Lets Node load the extensionless TypeScript imports of src/lib.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (!specifier.startsWith(".")) throw error;
      return nextResolve(`${specifier}.ts`, context);
    }
  },
});

const { courses, levelsPerCourse } = await import("../src/lib/courses.ts");
const { buildWorld } = await import("../src/lib/levels.ts");
const { runProgram } = await import("../src/lib/runtime.ts");

const usedTypes = (list) =>
  list.flatMap((block) => [
    block.type,
    ...usedTypes(block.children ?? []),
    ...usedTypes(block.alt ?? []),
  ]);

const problems = [];
for (const course of courses) {
  if (course.levels.length !== levelsPerCourse)
    problems.push(`${course.slug}: ${course.levels.length} levels`);
  if (!course.levels[course.preview])
    problems.push(`${course.slug}: preview ${course.preview} is not a level`);
  course.levels.forEach((level, index) => {
    const name = `${course.slug} ${index + 1} "${level.title}"`;
    const width = level.grid[0].length;
    if (level.grid.some((row) => row.length !== width))
      problems.push(`${name}: rows have different lengths`);
    const missing = usedTypes(level.solution).filter(
      (type) => !level.blocks.includes(type),
    );
    if (missing.length > 0)
      problems.push(`${name}: palette misses ${[...new Set(missing)]}`);
    const run = runProgram(buildWorld(level), level.solution);
    let step = run.next();
    while (!step.done) step = run.next();
    if (!step.value.ok)
      problems.push(`${name}: solution fails (${step.value.reason})`);
  });
}

const total = courses.reduce((sum, course) => sum + course.levels.length, 0);
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`${total} levels verified.`);
