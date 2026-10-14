# Gomtiji Tours & Travels

Single-page site for a travel desk in Dwarka, Gujarat: daily sleeper buses, darshan tours, car and bike rental, train and flight booking. React + Vite + TypeScript, GSAP and Lenis for motion. Two pages: the public site (`index.html`) and the admin (`admin.html`). A small Express + MySQL server in `server/` stores the contact details and enquiries and serves the built pages; the admin signs in with one password (`ADMIN_PASSWORD` in `.env`). Each feature's `api/` gateway calls it.

## Rules

Read the rule file that covers what you are touching before editing.

- @.claude/rules/architecture.md — layers and the dependency rule
- @.claude/rules/frontend.md — components, styling, accessibility, motion

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (proxies `/api` to the server) |
| `npm run server` | API and built site on port 3001; needs MySQL and `.env` (see `.env.example`) |
| `npm run build` | typecheck and production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | oxlint |
| `npm test` | unit tests for `model/`, `shared/lib/` and `server/` logic |

## Non-negotiables

- The services in `features/services/model/` and the owner's name and mobile numbers in `features/contact/model/` come from the shop's signboard. Do not add fares, timings, ratings, reviews, addresses or passenger counts the owner has not supplied.
- A change is done when typecheck, lint, tests and build pass. Say so plainly when they do not.
