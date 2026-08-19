# Shreeya Bhatt — Portfolio

A multi-page personal portfolio built with React, Vite, Tailwind CSS, React Router, and Motion (Framer Motion).

## Stack

- Vite + React 18 (plain JavaScript/JSX — no TypeScript)
- Tailwind CSS v4 (CSS-first `@theme` design tokens in `src/styles/index.css`)
- React Router v6 for multi-page navigation
- Motion (`motion/react`) for animation
- Hand-rolled UI primitives (no component library) in `src/components/ui`

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Project structure

- `src/data/*.js` — all editable content (projects, skills, certifications, education, profile). Edit these files to update the site's content.
- `src/components/hero/SignalField.jsx` — the site's signature animated canvas motif.
- `src/lib/motion.js` / `src/lib/tokens.js` — shared design tokens and animation variants every component draws from.

## Manual follow-ups before launch

- [x] Add `credentialUrl` verification links for each entry in `src/data/certifications.js`.
- [ ] Add `codeUrl` (GitHub repo) links for WealthNest, CareeRise, SmartCart, and the Payroll Management System in `src/data/projects.js` once they're public. (SpendWise's two live app links are wired in, WealthNest links to its live demo, and CareeRise/SmartCart/Payroll link out to their Google Drive demo videos as `demoUrl`.)
- [ ] Periodically refresh the GitHub stats (`publicRepos`, `stars`, `focusAreas`) in `src/data/profile.js`.

## Deployment (Vercel)

This is a plain Vite SPA — Vercel auto-detects the framework preset (build command `npm run build`, output `dist`). `vercel.json` includes a rewrite so client-side routes (e.g. `/projects`) don't 404 on refresh.

To deploy: push this repo to GitHub, then import it in the [Vercel dashboard](https://vercel.com/new) and connect it — no further configuration needed.
