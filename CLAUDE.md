# Gomti Travels

Single-page site for an intercity bus operator in Dwarka, Gujarat. React + Vite + TypeScript, GSAP and Lenis for motion. Two pages: the public site (`index.html`) and the admin (`admin.html`). No backend and no sign-in yet; admin edits and passenger requests are kept in the browser's localStorage behind each feature's `api/` gateway.

## Rules

Read the rule file that covers what you are touching before editing.

- @.claude/rules/architecture.md — layers and the dependency rule
- @.claude/rules/frontend.md — components, styling, accessibility, motion

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | typecheck and production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | oxlint |
| `npm test` | unit tests for `model/` and `shared/lib/` logic |

## Non-negotiables

- Timings, fares and coach details in `features/*/model/` are sample data. Do not present them as real, and do not invent ratings, reviews, phone numbers or passenger counts.
- A change is done when typecheck, lint, tests and build pass. Say so plainly when they do not.
