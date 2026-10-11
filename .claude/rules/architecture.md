# Architecture

Source dependencies point inward only: `app -> features -> shared`.

| Folder | Holds | May import |
|---|---|---|
| `src/app/` | Root components (`App` for the public page, `AdminApp` for `/admin.html`), page composition, page-level state | everything |
| `src/features/<name>/` | One vertical slice: `model/` (types, data, pure logic), `api/` (gateway and hooks) and `ui/` (components) | `shared/`, its own folders |
| `src/shared/` | `ui/` primitives, `lib/` helpers, `motion/` GSAP and Lenis setup, `styles/` tokens | nothing outside `shared/` |

## Features

| Feature | Owns |
|---|---|
| `journey` | The road scene (Dwarka coast, road, the coach driven by scroll) and the list of page sections |
| `services` | What the desk offers: sleeper buses, darshan tours, rentals, train and flight booking |
| `contact` | The owner's contact details and the enquiries left on the page (send, admin inbox) |

## Rules

- Features do not import from other features. `app/` wires them together with props and callbacks. Shared needs move to `shared/`.
- `model/` is plain TypeScript: no React, no DOM, no GSAP. Every non-trivial function there has a test beside it (`name.test.ts`).
- `ui/` components take data and callbacks through props. They do not reach into another component's DOM.
- State that two features need lives in `app/App.tsx` and is passed down.
- Data that the admin can change is read through the feature's `api/` gateway, never from the `model/` constants, which are only the seed. Components read with the gateway's hook (`useContact()`) and write with its store.
- There is no backend yet: gateways are backed by `shared/lib/localStore.ts` (this browser only). When a backend arrives, only the gateway changes: it calls the API and maps the response to the feature's model types. Hooks keep their shape, so components do not change.
- Admin screens are composed in `app/AdminApp.tsx` from each feature's `ui/`.

## Adding a section to the page

1. Add the stop to `features/journey/model/stops.ts`. The top navigation and the footer pick it up.
2. Build the content in a feature's `ui/`.
3. Compose it in `app/App.tsx` inside a `Section` whose `id` is the stop id.
