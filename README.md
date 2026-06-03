# 7C Studios — Daily Travel Wear

Front-end repository for the **7C** clothing brand. A premium editorial site built with vanilla HTML, CSS, and JavaScript, served and bundled via [Vite](https://vitejs.dev/).

## Setup

```bash
npm install
```

## Development

Start the local dev server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## Build

Generate a production-ready bundle in `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy

Deploy to GitHub Pages:

```bash
npm run deploy
```

This runs `vite build` and publishes `dist/` to the `gh-pages` branch.

For **Netlify** or **Vercel**, point the build command to `npm run build` and the publish directory to `dist/`.

## Site Structure

```
src/
├── index.html        Landing page — metro hero, departures board, boarding pass
├── launch.html       Pre-launch experience — system loading, seat assignment, countdown
├── claim.html        Check-in / garment claim flow — email sign-in
├── activate.html     Passport activation — bind garment to archive
├── archive.html      Personal garment archive — collection overview
├── garment.html      Individual garment record — globe, journey, file tabs
├── record.html       Public garment record page — QR scan entry
├── shared.css        Design system — shared tokens, nav, buttons, utilities
├── shared.js         Shared runtime — cursor, reveals, barcode, SevenC helpers
└── assets/
    ├── logo.png      Original logo
    └── logo-new.png  Updated logo
```

## Tech Stack

- **HTML / CSS / JS** — No framework, fully static
- **Vite** — Dev server + production bundler
- **Fonts** — Helvetica Neue, Druk Wide, Inter, IBM Plex Mono
- **Hosting** — GitHub Pages (or any static host)

## License

All rights reserved. © 7C Studios MMXXVI.
