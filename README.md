# OpenSpaces  https://openspacess.netlify.app/

OpenSpaces is a dark, editorial Shopify theme showcase designed for activewear and fashion brands. It presents a collection of premium, no-code storefront themes through an immersive single-page experience, combining product-focused imagery with motion, interactive previews, and clear pricing information.

The site is built as a visual sales and discovery experience rather than a working Shopify storefront. Visitors can move from the hero message through global brand proof, category-specific demos, and theme pricing to understand which starting point best fits their brand.

## Experience Overview

### Immersive hero

The first viewport introduces the product with the headline “Shopify Themes for Activewear Brands,” supporting copy, and two calls to action. A custom WebGL scene fills the background: a prismatic box rotates and gently floats while an animated rainbow shader produces shifting color bands, warm highlights, neon edge trims, and bloom lighting.

Six floating storefront preview cards surround the central message. They represent fictional stores including STRYDE, ITALYA, HELIX, NOMAD, VORA, and KOVA, and use the supplied optimized AVIF imagery from `public/images`.

### Worldwide trust section

The globe section combines a hand-rendered HTML canvas animation with brand metrics. A dotted sphere rotates continuously, using generated pseudo-noise to suggest continent shapes and glowing city markers to create a worldwide network effect.

The section communicates three headline metrics: 8,500+ brands worldwide, 190+ countries, and 3 hours average time to launch.

### Brand category discovery

The “Which one are you?” section lets visitors scan five brand directions: Streetwear, Activewear, Fashion, Jewelry & Accessories, and Swimwear. Each category has its own image, positioning statement, and descriptive tags.

Cards respond to pointer movement with a 3D tilt, dynamic shadow, and cursor-following glare layer, making the visual browsing experience feel tactile.

### Theme selection and pricing

The “Pick Your Theme” section compares two primary products:

#### Plain Jane — $99

A flexible theme for growing brands, including lookbook pages, drop countdowns, custom fonts, a music player, video backgrounds, and a password page with countdown.

#### Plain Jane Interactive — $149

An immersive upgrade that adds interactive scenes, animated transitions, floating product showcases, touch-optimized interactions, and preloader animations.

A lower-cost “Plain Jane Starter” option is also shown at $49 one-time. Its positioning focuses on clean product pages, a cart drawer, and a fast launch while excluding advanced storytelling and drop-focused tools.

The pricing view currently displays Standard and Lifetime options as a visual toggle. The toggle and product buttons are presentational in the current build and are ready to be connected to checkout, theme detail, and live demo routes later.

## Key Features

- Premium dark visual direction with neon lime accents and editorial typography
- Full-viewport Three.js hero using `@react-three/fiber`
- Custom GLSL shader animation for the central prismatic box
- Bloom post-processing through `@react-three/postprocessing`
- Animated canvas globe with continent dots and city glows
- Floating theme preview cards with independent motion loops
- Pointer-driven 3D category cards with glare effects
- Intersection Observer-based scroll reveal animations
- Responsive layouts for desktop and mobile viewports
- AVIF image assets for theme, category, and storefront previews
- Sticky header that changes appearance after the page is scrolled
- React component structure split by page sections and layout elements

## Technology

- React 19
- Vite
- Three.js
- React Three Fiber
- React Three Postprocessing
- React Icons
- Tailwind CSS Vite integration
- Oxlint
- CSS custom properties and component-level styles

## Project Structure

```text
.
├── public/
│   ├── images/                 # Floating storefront preview images
│   ├── pickyourtheme/          # Theme comparison imagery
│   └── whichoneare/             # Brand category imagery
├── src/
│   ├── Component/
│   │   ├── Box.jsx              # Three.js prismatic hero object
│   │   ├── GlobeSection.jsx     # Canvas globe and trust metrics
│   │   ├── PickYourThemeSection.jsx
│   │   ├── WhichOneSection.jsx  # Category cards and tilt interaction
│   │   ├── FeaturesSection.jsx  # Reusable feature content
│   │   └── ThemesSection.jsx    # Theme catalogue content
│   ├── Layout/
│   │   └── Header.jsx           # Sticky header and navigation
│   ├── App.jsx                  # Page composition and scroll reveal hook
│   ├── App.css                  # Page layout and component styling
│   └── index.css                # Global reset and design tokens
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Design Direction

OpenSpaces uses a near-black foundation, muted white copy, and a bright acid-lime accent to give the interface the energy of performance apparel while preserving an editorial feel. Space Grotesk, Space Mono, and Press Start 2P create a deliberate contrast between readable product copy, technical labels, and the pixel-inspired hero headline.

Motion is used to reinforce the product story: the hero object and globe remain alive while the page is open, preview cards drift subtly, category cards react to the pointer, and content reveals as it enters the viewport. The visual system favors large imagery, restrained surfaces, uppercase labels, and short product-focused copy.

## Current Scope

This repository currently contains the front-end presentation layer. The following elements are visual or scaffolded UI and do not yet connect to external services:

- Header navigation buttons
- Cart and highlights buttons
- Hero calls to action
- Theme preview and demo actions
- Standard/Lifetime pricing toggle
- Starter, theme, and category links

Connecting these controls to real routes, Shopify theme previews, checkout, analytics, or a CMS would be the next application layer.
