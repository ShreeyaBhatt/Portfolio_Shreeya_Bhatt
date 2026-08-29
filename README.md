# Shreeya Bhatt — Portfolio

A personal portfolio: an editorial layout on a dark "signal-lab" ground, with a small 3D
"guide orb" that rides the right margin, tracks the section you're reading, and streaks
across on every navigation. React 19, Vite, Tailwind CSS v4, React Router, Motion, and a
lazy React Three Fiber scene. One accent — mint — is the orb, plus link/focus states and
section rules.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-portfolio--shreeya--bhatt.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-shreeya-bhatt.vercel.app/)

![React](https://img.shields.io/badge/React_19-149ECA?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000?style=flat-square&logo=three.js&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

---

## Stack

| Layer | Choice |
|---|---|
| Build tool | Vite + React 19 (plain JavaScript/JSX — no TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` design tokens in `src/styles/index.css`) |
| Routing | React Router v6 |
| Animation | Motion (`motion/react`) |
| 3D | React Three Fiber + drei (`AvatarHero`, lazy-loaded — three.js stays out of the main bundle) |
| UI primitives | Hand-rolled, in `src/components/ui` (no component library) |

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run typecheck # tsc --noEmit over src/data
```

## Project structure

```
src/
├─ data/*.js                      # all editable content — projects, skills, certifications,
│                                  # education, profile, timeline, log, site config
├─ components/
│  ├─ guide/GuideOrb.jsx          # mounted in Layout — the guide orb (+ CSS fallback).
│  ├─ guide/GuideOrbScene.jsx     # the R3F canvas (lazy). Tuning at the top: ORB_R, EDGE.
│  ├─ guide/useGuideTarget.js     # tracks the active [data-guide] section
│  ├─ guide/use3dCapability.js    # WebGL vs CSS-fallback gate
│  ├─ layout/{Nav,Footer,Spine}.jsx
│  ├─ common/{SectionHeader,RevealLines,Marquee,ThemeToggle}.jsx
│  ├─ home/{Hero,Work,Approach,BeyondCode,ContactCta}.jsx
│  ├─ work/WorkSpread.jsx         # one project as a full-width editorial row
│  └─ contact/ContactForm.jsx     # drafts a mailto: while site.contactEndpoint is blank
└─ lib/
   ├─ motion.js                   # shared animation variants + easings
   └─ tokens.js                   # motion durations shared with CSS
```

Edit `src/data/` to update content — nothing else changes for routine updates.
`src/data/site.js` holds `contactEndpoint` (blank → the form drafts a pre-filled email
instead of POSTing).

## Design system

All colour, type, spacing, radius, and elevation values live as CSS custom properties in
`src/styles/index.css`, under `@theme` (light "editorial print") with a `:root.dark`
override (dark "signal-lab" — the default). Components reference tokens (`text-hero`,
`var(--color-accent)`) rather than literals.

- **The fluid type scale** (`text-display` → `text-lead`) ships size, line-height, and
  tracking together. Use the step; don't pair a size with a one-off leading.
- **One accent only.** `--color-accent` (mint) is the single colour with a voice — never a
  fill. A pre-paint script in `index.html` sets the theme class before first paint so there
  is no light-mode flash.

## The guide orb

`GuideOrb` is mounted in `Layout`, so it's on every route. It parks in the right margin and
eases its vertical position to centre on whichever `[data-guide]` section is in view — so it
leads the eye down a page and hands off between sections — then does a quick "dash" on every
route change. It renders only at `≥1024px` and only on capable, motion-OK devices;
otherwise a small CSS orb (or nothing, on mobile). `GuideOrbScene` (the R3F canvas) is
dynamically imported, so `three` ships in its own chunk. Add `data-guide` to any element you
want the orb to visit.

## Deployment (Vercel)

Plain Vite SPA — Vercel auto-detects the preset (build `npm run build`, output `dist`).
`vercel.json` rewrites client routes so a refresh on `/projects` doesn't 404.

**Live:** [portfolio-shreeya-bhatt.vercel.app](https://portfolio-shreeya-bhatt.vercel.app/)
