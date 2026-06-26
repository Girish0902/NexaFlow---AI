# NexaFlow AI Platform

NexaFlow AI is a premium, high-converting, fully responsive enterprise SaaS landing page for an intelligent data automation platform. Built with a focus on immersive 3D effects, rich typography, glassmorphism, and performance-optimized micro-interactions, it presents a state-of-the-art developer and user experience.

---

## 🎨 Premium Visual Elements & 3D Animations

The landing page features a series of layered, hardware-accelerated animations and interactive elements that run at a smooth 60fps/120fps:

### 1. Interactive 3D Hero Backdrop (`three.js`)
* **3D Wireframe Icosahedron**: An asynchronously loaded golden wireframe icosahedron rotating slowly in the background of the Hero section.
* **Reactive Particle Grid**: A connected floating network of golden nodes that physically bounce and drift away when the cursor approaches, creating an interactive field effect.
* **Camera Scroll Zoom**: Tracks scroll percentage to scale the Hero view from `1.0` to `1.08` with perspective shifting, creating a deep camera-plunge illusion.

### 2. Cascading Text Shimmers
* **Animated Logo**: The header `NexaFlow` logo is styled with a text-clipped linear gradient that sweeps a metallic gold-white shine across the letters every 4 seconds.
* **Cascading Headline Sweep**: The Hero title ("Automate Complexity. Scale Intelligence.") features a coordinated sweep where a silver light sweeps across the first line, then cascades immediately down into the second gold line in a satisfying light-wave sequence.

### 3. Glassmorphic Accents & Shimmer Buttons
* **Glassmorphic Navbar CTA**: The "Get Started" buttons in the navigation bar feature a transparent yellow glass backing (`backdrop-filter: blur`), custom yellow outlines, and a looping white light shine sweep (`ctaShine`).
* **Glassmorphic CTA Banner**: The bottom CTA ("Ready to automate?") is styled with a glassmorphic container on an Oceanic Noir background, blending seamlessly with the dark ambient page.

### 4. Spotlight Card Glows (Vercel-Style)
* **Spotlight Border Glows**: Hovering over Bento grid cards or Pricing cards tracks cursor coordinates in real-time, painting a cursor-following border glow (`::before`).
* **Radial Inner Lighting**: A secondary glowing overlay (`::after`) follows the mouse across the card interior, lighting up the contents without interfering with text copy-paste functionality.

### 5. 3D Perspective Reveals
* **Perspective Entry**: Page sections and card grids enter the viewport with a hardware-accelerated 3D perspective fold-out (`rotateX(25deg) translateY(30px) -> rotateX(0deg) translateY(0px)`) driven by a high-efficiency `IntersectionObserver` hook.
* **Scroll-Bound Reset**: Entry animations only trigger and reset when scrolling out of the bottom viewport, preventing repetitive animations when scrolling back up the page.

### 6. Left-to-Right 3D CTA Canvas
* **3D Wireframe Drift**: The CTA banner features a background canvas that projects slowly rotating 3D cubes and octahedrons.
* **3D Parallax**: Perspective projection calculations (`scale = fov / (fov + z)`) drive horizontal speeds and scales dynamically, creating depth parallax as shapes glide across the banner.

---

## ⚡ Engineering Guardrails & Optimization

* **Zero Re-render Pricing Hook (`usePricingController.js`)**: To prevent layout reflows and components re-rendering when toggling billing cycles (Monthly vs. Annual) or currencies (USD vs. INR), the toggle directly mutates the DOM text nodes. Toggling pricing triggers **zero React component updates**.
* **Clean CSS Architecture**: Standardized tokens (`tokens.css`), typography scales (`typography.css`), and layout constraints (`global.css`) built using raw CSS variables, ensuring lightweight style bundles and removing dependency on heavy utility frameworks.
* **Inline SVG Integration**: Replaced external cross-document SVG `<use>` tags with direct inline SVGs in the footer, resolving browser shadow DOM color bugs and unlocking transition states.

---

## 📁 Directory Structure

```
project-root/
├── public/
│   ├── icons/            # Asset library (chevron, cube, links, etc.)
│   ├── favicon.svg       # Brand favicon
│   └── icons.svg         # SVG Sprite backup
├── src/
│   ├── components/
│   │   ├── BackgroundParticles/  # Ambient full-screen drifting canvas
│   │   ├── CTABanner/            # CTA section with 3D drift canvas
│   │   ├── CursorSprinkles/     # Cursor particle interaction
│   │   ├── Features/             # Bento grid and fluid Accordion
│   │   ├── Footer/               # Seamless footer with inline social SVGs
│   │   ├── Hero/                 # Three.js icosahedron and camera zoom
│   │   ├── LogoMarquee/          # Hover-pausing partners logo marquee
│   │   ├── Navbar/               # Glassmorphic navbar with shine button
│   │   ├── Pricing/              # Pricing card matrix
│   │   └── Testimonials/         # Auto-rotating review carousel
│   ├── hooks/
│   │   ├── use3dEffects.js       # Spotlight coordinates tracking hook
│   │   ├── useBreakpoint.js      # Responsive breakpoint hook
│   │   └── useScrollReveal.js    # 3D perspective entry observer
│   ├── styles/
│   │   ├── tokens.css            # HSL design tokens & color scale
│   │   ├── typography.css        # Display and body font properties
│   │   └── global.css            # Base layouts & entrance animations
│   ├── App.jsx                   # Central page assembly
│   ├── main.jsx                  # React application entry
│   └── index.css                 # Main styling bundle
├── index.html                    # SEO Head, OgTags, and asset preloads
├── package.json                  # Dependencies & scripts
└── vite.config.js                # Vite compiler config
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Setup & Run

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser to view the platform.

3. **Build optimized production assets**:
   ```bash
   npm run build
   ```
   Compiled assets will be written to the `dist/` directory. The production build takes less than 300ms to bundle.
