# Gomtiji Tours & Travels

Single-page site for a travel desk in Dwarka, Gujarat: daily sleeper buses, darshan tours, car and bike rental, train and flight booking. React + Vite + TypeScript, GSAP and Lenis for motion. Two pages: the public site (`index.html`) and the admin (`admin.html`). No backend and no sign-in yet; admin edits and enquiries are kept in the browser's localStorage behind each feature's `api/` gateway.

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

- The services in `features/services/model/` and the owner's name and mobile numbers in `features/contact/model/` come from the shop's signboard. Do not add fares, timings, ratings, reviews, addresses or passenger counts the owner has not supplied.
- A change is done when typecheck, lint, tests and build pass. Say so plainly when they do not.
