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
- Class names are scoped by component: `.service-list`, `.service-list__card`. Shared primitives are `.sheet` (a card), `.pane` (its padding), `.btn`, `.link`, `.data-table`.
- Layout is mobile-first. Breakpoints are 44rem and 60rem. Do not add others.
- The look is a modern booking site: blush paper (`--paper`) with every other section tinted, white rounded cards with a soft shadow (`.sheet`), filled rounded fields, bold sentence-case headings, deep red (`--brand`) for filled buttons and bright red (`--accent`) for rules. Red text uses `--accent-text`. Radii and shadows come from the tokens (`--radius`, `--radius-sm`, `--shadow`); do not write others.
- One typeface, Outfit: 700 for titles, 600 for names and labels, 400 for text. Small labels are 0.72rem capitals with wide tracking.
- A dark band is `Section tone="dark"`. It remaps `--paper`, `--surface`, `--field`, `--ink` and `--line`, so components need no dark variant; never hard-code a light or dark colour in a component.
- No UI kit and no CSS framework without discussion.

## Responsive

The page must work from a 320px phone to a 1920px desktop, in portrait and landscape.

- Mobile-first. Base styles are the phone layout; columns are added at 44rem and 60rem only.
- Reach for an intrinsic layout before a breakpoint: `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`, `flex-wrap`, `clamp()`.
- No horizontal page scroll at any width. A wide table scrolls inside its own wrapper (`overflow-x: auto`); a grid inside a grid sets `min-width: 0` on its parent.
- Grid and flex children that hold text or form fields get `min-width: 0`, so a long place name or a date field wraps or shrinks instead of widening the row.
- Sizes are fluid: `clamp()` for type and spacing, `var(--gutter)` for side margins, `rem` elsewhere. No fixed pixel widths for layout.
- Never size a block from the viewport height alone. Anything using `vh` or `svh` also needs room for its content, because a landscape phone is under 400px tall. The hero reserves the coach's height in its padding for this reason.
- The road scene scales from one token, `--scene-bus` (the coach's width). Size anything in the scene from it or from `--scene-road`, not from the viewport.
- Touch: navigation links and buttons are at least 2.75rem tall; no interactive element is under 24px. Form text is at least 16px so iOS does not zoom on focus.
- Nothing is available on hover only.
- A change to layout is checked at 320, 390, 768, 1024, 1440 and 1920 wide, and on a landscape phone (844 by 390), before it is done.

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
- Motion budget: the two road scenes (the coach and the layers sliding behind it), one arrival on load (the coach and the headline), the hero's words leaving as it scrolls out, and the navigation's progress line. Do not add per-section reveal animations.

## Dependencies

- Prefer the platform: `Intl`, native date inputs, native form validation.
- Approved runtime dependencies: `react`, `gsap` with `@gsap/react`, `lenis`, and the font (`@fontsource-variable/outfit`). Anything else needs a reason the platform cannot meet.
