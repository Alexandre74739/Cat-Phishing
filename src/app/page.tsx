import { routes } from "@/lib/navigation";
import { Hero } from "./_sections/Hero";

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
            variant: "mint",
            icon: "play",
          },
          {
            label: "Start coding",
            href: routes.code,
            variant: "sun",
            icon: "code",
          },
        ]}
        highlights={["Ages 12+", "One shared phone", "Code puzzles"]}
      />
    </main>
  );
}
