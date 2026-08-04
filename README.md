# 🚀 Sahil Dherange | Animated Developer Portfolio

🔗 **Live Demo:** [animated-portfolio-five-phi.vercel.app](https://animated-portfolio-five-phi.vercel.app)

A highly interactive, award-winning-style developer portfolio built to master React, modern animation libraries, and performance optimization. This project serves as a playground for learning complex UI interactions, scroll-driven animations, and global state management.

---

## 💻 Tech Stack

<div align="left">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Zustand-4A3831?style=for-the-badge&logo=bear&logoColor=white" alt="Zustand" />
</div>

---

## 🎯 The Learning Journey

This portfolio wasn't just built to showcase projects—it was built to *be* a project. My goal was to move beyond static layouts and dive deep into the world of **creative frontend development**. 

### 🧠 Core Concepts Mastered

- **Scroll-Driven Parallax & Timelines (GSAP):** 
  Learned how to wire GSAP's `ScrollTrigger` into React components safely by utilizing `gsap.context()` to avoid memory leaks. Synchronized GSAP's ticker with **Lenis** to achieve buttery smooth scrolling without native scroll jank.
  
- **Fluid Layout Animations (Framer Motion):** 
  Explored `AnimatePresence` and layout projections. Used `layoutId` to create seamless shared-element transitions (e.g., clicking a project thumbnail and watching it morph into the hero banner of the detail page).
  
- **Performance & Render Optimization:**
  Avoided React state (`useState`) for high-frequency animations like the custom floating hover image and cursor. Instead, I used `requestAnimationFrame` (RAF) and linear interpolation (`lerp`) to directly mutate DOM styles via `useRef`, achieving 60fps tracking without triggering React re-renders.
  
- **Global State Management (Zustand):** 
  Replaced heavy prop-drilling with a lightweight Zustand store. Perfect for managing global states like the custom cursor variant, loader completion status, and active project hover states.

- **Vite Build Optimization (Rolldown):**
  Implemented manual chunk splitting to separate heavy animation libraries (`gsap`, `framer-motion`, `lenis`) from the core React bundle, keeping the first-load JS payload extremely light (~75 kB gzip).

---

## ✨ Key Features

- **Custom Magnetic Cursor:** A custom cursor that tracks mouse movement via RAF, snaps to interactive elements using GSAP `quickTo`, and uses `mix-blend-mode: difference` for high contrast.
- **Preloader Sequence:** A 0-100% GSAP loading sequence that culminates in a curtain-wipe reveal.
- **Shared-Element Page Transitions:** Navigating to a project detail page seamlessly morphs the list thumbnail into the header image.
- **Accessible & Respectful:** Fully respects the OS-level `prefers-reduced-motion` settings, falling back to instant transitions and static layouts for users who need it. Automatically disables custom cursors on touch devices.

---

## 📂 Project Architecture

```text
src/
├── components/       # Reusable UI (Cursor, Loader, Navbar, HoverImage)
├── sections/         # Landing page sections (Hero, About, Tech, Projects, Contact)
├── pages/            # Routable views (Home, ProjectDetail)
├── hooks/            # Custom hooks (useLenis, useCursor, useMagnetic, useReducedMotion)
├── store/            # Zustand global state (useStore.js)
├── data/             # Hardcoded data for projects and experience (No CMS)
└── index.css         # Global design system & utility classes
```

---

## 🚀 Getting Started

Want to explore the code or run it locally?

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahil739785/animated-portfolio.git
   cd animated-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

> *"The best way to learn frontend is to build things you find inspiring."*
