# Shreeya Bhatt — Portfolio

A multi-page personal portfolio built with React, Vite, Tailwind CSS, React Router, and Motion (Framer Motion).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-portfolio--shreeya--bhatt.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-shreeya-bhatt.vercel.app/)

![React](https://img.shields.io/badge/React_18-149ECA?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

**[🔗 Live Site](https://portfolio-shreeya-bhatt.vercel.app/)**

---

## Stack

| Layer | Choice |
|---|---|
| Build tool | Vite + React 18 (plain JavaScript/JSX — no TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` design tokens in `src/styles/index.css`) |
| Routing | React Router v6 for multi-page navigation |
| Animation | Motion (`motion/react`) |
| UI primitives | Hand-rolled, in `src/components/ui` (no component library) |

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├─ data/*.js                        # all editable content — projects, skills,
│                                    # certifications, education, profile
├─ components/hero/SignalField.jsx  # signature animated canvas motif
└─ lib/
   ├─ motion.js                     # shared animation variants
   └─ tokens.js                     # shared design tokens
```

Edit the files in `src/data/` to update the site's content — nothing else needs to change for routine content updates.

## Deployment (Vercel)

This is a plain Vite SPA — Vercel auto-detects the framework preset (build command `npm run build`, output `dist`). `vercel.json` includes a rewrite so client-side routes (e.g. `/projects`) don't 404 on refresh.

To deploy: push this repo to GitHub, then import it in the [Vercel dashboard](https://vercel.com/new) and connect it — no further configuration needed.

**Live:** [portfolio-shreeya-bhatt.vercel.app](https://portfolio-shreeya-bhatt.vercel.app/)
