# analdo.me

Personal portfolio for **Analdo Gomez**, Senior Product Designer — a homepage,
a resume page, five case studies, and a presentation deck.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Every page
is a Server Component; the only client components are the deck and the mobile
nav, both of which need real interaction. Type is a two-family system —
Noto Sans for everything you read, JetBrains Mono for everything you operate.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run storybook` | Component workshop on http://localhost:6006 |
| `npm run build-storybook` | Static Storybook build |

## Layout

```text
src/app/          routes, metadata routes (robots, sitemap, opengraph-image), global CSS
src/components/   shared components, flat — stories live beside them as *.stories.tsx
src/lib/          site constants and the case-study registry
public/images/    case-study imagery
```

`src/lib/case-studies.ts` is the single source of truth for the five projects:
the homepage grid, the sitemap, and each page's metadata and structured data all
read from it, so a project can't appear in one place and be missing from another.

## Before you change anything

- **[AGENTS.md](AGENTS.md)** — implementation rules: structure, responsive
  conventions, accessibility, SEO, and the verification steps expected before
  handoff.
- **[DESIGN.md](DESIGN.md)** — the design system: tokens, typography, component
  styling, motion.
- **[FRONTEND.md](FRONTEND.md)** — a general playbook for handing frontend work
  to a backend team. Reference material, not a description of this repo, which
  has no backend.

Keep AGENTS.md and DESIGN.md updated when behavior or the visual system changes.
