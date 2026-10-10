---
paths:
  - "src/**"
---

# Frontend

## Components

- Function components only. One exported component per file, named export, file name matches the component.
- Props are a named `type` declared above the component.
- Keep components under roughly 150 lines. Extract when a component grows a second responsibility.
- Derive values during render. Use effects only to synchronise with something outside React.
- Lists use stable ids as keys, never the array index.

## Styling

- Plain CSS with custom properties. Tokens live in `shared/styles/tokens.css`; component styles sit beside the component as `Name.css`.
- No raw colours or font names outside the tokens file.
- Class names are scoped by component: `.timetable`, `.timetable__fare`. Shared primitives are `.sheet`, `.pane`, `.btn`, `.link`, `.data-table`.
- Layout is mobile-first. Breakpoints are 44rem and 60rem. Do not add others.
- The look is editorial: warm paper, soft black ink, one dark band. No cards, no shadows, no rounded panels: content sits on the page under a hairline rule (`.sheet`).
- Three typefaces with fixed roles: Cormorant Garamond (light, capitals) for section titles and names, Outfit for text and the wordmark, Space Mono capitals for small labels and figures.
- A dark band is `Section tone="dark"`. It remaps `--paper`, `--ink` and `--line`, so components need no dark variant; never hard-code a light or dark colour in a component.
- No UI kit and no CSS framework without discussion.

## Accessibility

- Semantic elements first: `button` for actions, `a` for navigation, one `h1`, headings in order.
- Every interactive element is reachable by keyboard and has a visible focus style.
- Form controls have a real `label`. Validation uses native constraints (`required`, `min`, `pattern`).
- Text contrast meets WCAG AA. Decorative SVG is `aria-hidden`.

## Motion

- Import GSAP only from `shared/motion/gsap.ts`, which registers the plugins once.
- Build animations inside `useGSAP` with a `scope` ref so they are reverted on unmount.
- Entrance animations are wrapped in `withMotion` and animate *from* an offset; the final state is written in CSS, so the page is complete if no animation runs.
- Scroll-linked position (the coach in a road scene) follows the person's own scrolling and runs for everyone. Smooth scrolling and entrances do not run under `prefers-reduced-motion`.
- Scroll effects use `ScrollTrigger`; do not add scroll listeners. Programmatic scrolling goes through `shared/motion/smoothScroll.ts`.
- Animate `transform` and `opacity` only.
- Motion budget: the coach in the two road scenes, and one arrival on load (the coach and the headline). Do not add per-section reveal animations.

## Dependencies

- Prefer the platform: `Intl`, native date inputs, native form validation.
- Approved runtime dependencies: `react`, `gsap` with `@gsap/react`, `lenis`, and the three fonts (`@fontsource-variable/outfit`, `@fontsource-variable/cormorant-garamond`, `@fontsource/space-mono`). Anything else needs a reason the platform cannot meet.
