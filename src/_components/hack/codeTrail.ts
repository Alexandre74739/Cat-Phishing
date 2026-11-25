import { pick, spread } from "./random";

type Spark = { x: number; y: number; life: number; glyph: string };

const maxSparks = 90;
const fadePerStep = 0.08;

export function createTrail(glyphs: string) {
  const sparks: Spark[] = [];

  const add = (x: number, y: number, count: number) => {
    for (let index = 0; index < count; index++)
      sparks.push({
        x: x + spread(count * 6),
        y: y + spread(count * 6),
        life: 1,
        glyph: pick([...glyphs]),
      });
    sparks.splice(0, Math.max(0, sparks.length - maxSparks));
  };

  const draw = (context: CanvasRenderingContext2D, color: string) => {
    context.save();
    context.shadowColor = color;
    context.shadowBlur = 16;
    context.fillStyle = color;
    for (const spark of sparks) {
      context.globalAlpha = spark.life;
      context.fillText(spark.glyph, spark.x, spark.y);
      spark.y += 4;
      spark.life -= fadePerStep;
    }
    context.restore();
    while (sparks.length && sparks[0].life <= 0) sparks.shift();
  };

  return { add, draw };
}
