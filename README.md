# KNIFIDA

<p align="center">
	<img src="public/knifida.webp" alt="Knifida logo" width="520" />
</p>

> Run the desert. Survive the dunes.

A cinematic landing page for the mobile endless runner game **KNIFIDA** — built with React, GSAP, ScrollTrigger, Lenis, and Tailwind CSS v4.

## Tech Stack

| Layer         | Tool                             |
| ------------- | -------------------------------- |
| Framework     | React 19 + TypeScript            |
| Build         | Vite 8                           |
| Styling       | Tailwind CSS v4                  |
| Animations    | GSAP + ScrollTrigger             |
| Smooth Scroll | Lenis                            |
| Icons         | @animateicons/react (Lucide)     |
| Routing       | react-router-dom                 |
| Lint          | ESLint with react-compiler rules |

## Features

- **Cinematic parallax hero** — GSAP-pinned section with layered SVG parallax (sky, mountains, dunes, particles), decorative rotating ring, logo, and split-text 3D tagline
- **Smooth scrolling** — Lenis-powered with ScrollTrigger sync via `scrollerProxy` for jank-free pinned sections
- **Scroll-triggered reveals** — Image `clipPath` inset animation, stat counters with `back.out(1.7)` easing, word-by-word 3D title reveals
- **3D bento cards** — Mouse-follow `rotateX`/`rotateY` perspective tilt on feature and character cards
- **Continuous animated icons** — `AutoAnimatedIcon` wrapper cycles `startAnimation` → `stopAnimation` for looping Lucide icon animations
- **Loading screen** — Full-screen overlay with logo clip-reveal, particle float, and thin gold progress bar
- **Desert-themed 404** — "Lost in the Dunes" page with radial glow, floating sand particles, and compass button
- **Mobile-first** — Responsive throughout, mobile-first Tailwind breakpoints

## Sections

1. **Hero** — GSAP pin + parallax backgrounds, animated tagline, CTA button
2. **About** — Image card with `clipPath: inset()` scroll reveal, stat counters
3. **Features** — 3D `BentoTilt` cards, marquee header, animated icons
4. **Gameplay** — Pinned game-screen mockup, 3D tilt, running camel sprite, power-up badges
5. **Characters** — `BentoTilt` character cards with animated icons
6. **CTA** — Marquee strip, app store buttons, brand logo

## Getting Started

### Prerequisites

- Node.js >= 20

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/            # SVG parallax layers (sky, mountains, dunes, particles, camel)
├── components/
│   ├── AnimatedTitle  # Split-text 3D word reveal (scroll-triggered or instant)
│   ├── AutoAnimatedIcon  # Looping wrapper for animateicons
│   ├── About          # About section with image clip reveal + counters
│   ├── Button         # Hover text-slide button
│   ├── Characters     # Character bento cards
│   ├── CTA            # Call-to-action with marquee + store buttons
│   ├── Features       # Feature bento cards with marquee header
│   ├── Gameplay       # Pinned game-screen mockup
│   ├── Hero           # Parallax hero with GSAP pin
│   └── Loader         # Full-screen loading overlay
├── pages/
│   └── NotFound       # 404 page (desert theme)
├── App.tsx            # Root component, Lenis + GSAP sync
├── main.tsx           # Entry point, BrowserRouter
├── lenis.js           # Lenis instance + RAF loop (module-scoped)
└── index.css          # Global styles, fonts, keyframes, Tailwind theme
public/
├── logo.svg           # Brand logo
├── knifida.webp       # Game screenshot (About section)
├── knifida-game.jpeg  # Game screenshot
└── icon.png           # Camel runner sprite (Gameplay section)
```

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server             |
| `npm run build`   | Type-check + build for production |
| `npm run lint`    | Run ESLint on all source files    |
| `npm run preview` | Preview the production build      |

## License

MIT © [ELMACHHOUNE](https://github.com/ELMACHHOUNE)

---

**Repository**: [https://github.com/ELMACHHOUNE/knifida](https://github.com/ELMACHHOUNE/knifida)
