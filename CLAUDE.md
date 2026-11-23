<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Cat-phising — Project context

## The product

Cat-phising is a party card game for players aged 12 and up. It mixes a **physical deck** with a **companion web app** played on **one shared phone** that is passed around the table (like the Undercover app).
The theme is **cats + cybersecurity + algorithms**. The tone is funny and colorful.

The app has two goals:
1. Run the game session (players, turns, who holds the bomb).
2. Make players love the **algorithm part**: 3D block-coding puzzles, inspired by CuboCode, that they want to replay.

The app is **100% in English** (UI, content, code).

### Team

- Alexandre Perez: project lead, developer
- Sabry Cheribet
- Lina Fil
- Ambre Mercier-Dalmasso

## Game rules (current state)

### Physical part (cards in hand, not handled by the app)

- Each player has **6 colored cat cards** to discard: **Charo, Chapardeur, Chad, Chapin, Charal, Chalon**. The discard mechanic works like the French game *Ki Ka Fé*.
- Each player also has **2 action cards**.
- **Cat-astrophe cards**: action cards with special effects. Only one effect is defined so far:
  - **Non !**: cancels a cat-astrophe card, or cancels the bomb being passed to you.
- Card names and effects must fit the cybersecurity / algorithm theme (firewall, virus, phishing, bug, patch, antivirus, backdoor…).

### Digital part (handled by the app)

1. **Session setup**: players join a game session on the shared phone (names, number of players).
2. **The bomb**: one player gets the bomb (the **virus**) on top of their cards. The bomb only exists in the app.
3. **Passing the virus**: when a player manages to lay down one of their cat cards, they can also give the virus to another player.
4. **Losing**: when a player makes a mistake, **that player and the player holding the bomb both lose**.

### Not decided yet: do NOT invent

When a task depends on one of these points, ask Alexandre instead of choosing yourself:
- Effects of the cat-astrophe cards (apart from **Non !**)
- Exactly when an algorithm puzzle is triggered and what "making a mistake" means in-game
- Win condition and end of game
- Final art direction, the mascot, the logo

## Stack

- **Next.js 16** (App Router), **TypeScript strict**, React 19
- **Tailwind CSS 4** (design tokens in the theme, see "Art direction")
- **three.js** via **React Three Fiber** + **@react-three/drei** for the 3D puzzles
- **Neon** (PostgreSQL, EU region). The driver/ORM is not chosen yet: ask before adding one.
- **PWA**, mobile-first (the game is played on one phone, in portrait)
- Deployment: Vercel
- Tooling: ESLint (Next.js config, strict react-hooks rules), Prettier (default settings), unit tests with Node's native test runner (`node --test`)

## Reference project: CuboCode

The block-coding part is based on **CuboCode** (`github.com/Alexandre74739/Jeux-Video-MDQ`). It is a different repo, used for reference only.

- Reuse its **logic and architecture**: block definitions, program runtime/engine, level format, level verification script, drag-and-drop block editor, 3D world split into models / materials / animations.
- **Do not copy its art direction**: no Cubo character, no Cubo palette or fonts.
- **Cubo is replaced by a cube-shaped cat.** Its final design will come later, so keep the character in its own component folder so it can be swapped easily.
- When you bring code over from CuboCode, adapt it to this repo's structure and naming. Don't paste whole files.

## Code conventions

### Reuse before you create

- Before writing a component, hook or helper, **search the codebase** (`src/_components/`, `src/hooks/`, `src/lib/`) for something that already does the job or can be extended.
- Extend existing code with props/variants rather than duplicating it. If two places need the same piece of UI or logic, extract it into a shared component, hook or `lib/` function.
- Don't add a dependency without asking first.

### Structure

```
src/app/                 routes; each route keeps its own components in _components/ or _sections/
src/_components/         shared components
  ui/                    buttons, logo, icons, generic UI
  layout/                header, footer, page shells
  game/                  session, turns, bomb/virus
  puzzle/                block editor (block/, editor/) and 3D world (world3d/)
  cat/                   the cube-shaped cat (model, materials, animations)
src/hooks/               shared hooks
src/lib/                 logic with no UI (rules, blocks, runtime, levels, storage, db)
tests/                   unit tests
scripts/                 build / verification scripts
```

### Components and files

- One component per file, **PascalCase** file name. Hooks start with `use`.
- `.tsx` files stay around **100 lines max**. Past that, split them into sub-components in a sub-folder with the same name.
- Game rules and puzzle logic go in `src/lib/`, as pure functions with no React, and they get unit tests.
- Path alias `@/*` → `src/*`. Relative imports (`./`, `../`) only inside the same route, the same component folder (and its sub-folders) or `lib/`.
- Code, identifiers, comments and UI text are in **English**. Keep comments short and useful (a JSDoc line on exported functions and components when it helps).
- No dead code, no commented-out code, no `console.log` left behind.

### 3D (React Three Fiber)

- Every 3D component is a client component (`"use client"`). Load scenes with `next/dynamic` and `ssr: false`.
- Animate with `useFrame` + refs, never with React state on every frame. React state only holds game logic (current block, puzzle solved…).
- Low poly style. Shared materials live in one `materials.ts` file instead of being created inside components.
- Always plan a fallback when WebGL is not available (error boundary + simple 2D view), and keep performance in mind on mid-range phones.

### Styling

- Tailwind with theme tokens only. **Never use hardcoded hex colors** in components.
- Mobile-first, readable by a 12-year-old: large touch targets, short texts.
- Respect `prefers-reduced-motion`.
- Visible focus on every interactive element.

## Art direction (not final)

- Target: **12+ year olds**.
- References: **StudioXP** (studioxp.online/fr-fr), **CuboCode**, **Minecraft Education**. The style will be a colorful mix of the three: blocky, playful, bright.
- The palette, fonts, logo and mascot are not defined yet. Use temporary tokens grouped in one place so they can be replaced in one go.
- Engagement comes from fun progression (levels, badges, unlockable cat outfits), never from dark patterns.

## Privacy

Players are minors:
- Collect only what the game needs (a first name or nickname is enough, no email, no exact age).
- No third-party trackers, no ads. Self-host fonts (no external CDN).
- Data stays in the EU (Neon EU region).

## Git and traces: strict rules

- **Never commit, push, create branches, merge or open pull requests.** Alexandre handles git himself. You can suggest a commit message when a task is done, in the repo's style: Conventional Commits in **French** (`feat: ajouter …`, `fix: corriger …`, `refactor: segmenter …`).
- **Leave no trace of Claude or AI anywhere**: no `Co-Authored-By`, no "Generated with…", no comments, file names, docs or README lines mentioning Claude or AI.
- Never edit `.env` files or put secrets in the code. Document new variables in `.env.example`.

## Before saying a task is done

Run and fix what fails:

```bash
npm run lint
npm run format:check   # or npm run format
npm test
npm run build
```

Then give a short summary of what changed and which files were touched.