// projects.js — Real projects for Sahil Dherange portfolio
// 4 genuine projects: this portfolio + 3 React practice builds
// Thumbnails are placeholders — TODO: replace with real screenshots

export const projects = [
  {
    id: 1,
    slug: 'portfolio',
    title: 'Developer Portfolio',
    shortTitle: 'Portfolio',
    description:
      'A highly animated personal portfolio built to master React, Framer Motion, GSAP, and modern frontend animation techniques — featuring a custom smooth cursor, Lamborghini-style fullscreen nav, and scroll-driven motion throughout.',
    role: 'Design & Development',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Lenis'],
    // TODO: replace with a real screenshot of the live site
    thumbnail: 'https://picsum.photos/seed/portfolio-sahil/800/500',
    gallery: [
      'https://picsum.photos/seed/portfolio-sahil-1/1200/700',
      'https://picsum.photos/seed/portfolio-sahil-2/1200/700',
    ],
    liveLink: '', // TODO: add after deploying
    repoLink: '', // TODO: add after pushing to GitHub
    year: '2025',
    features: [
      'Custom animated cursor (dot + lerp ring) with mix-blend-mode:difference',
      'Lamborghini-style fullscreen navigation with clip-path reveal and staggered links',
      'GSAP preloader with 0→100% counter and curtain mask-wipe exit',
      'Scroll-driven parallax on hero, ScrollTrigger stagger on all sections',
      'Floating project hover thumbnail following cursor via RAF + lerp',
      'Framer Motion layoutId shared-element transition into project detail pages',
    ],
    conceptsPracticed: [
      'Integrating GSAP ScrollTrigger with Lenis smooth scroll via ticker sync',
      'Keeping position:fixed elements outside Framer Motion wrappers (containing-block trap)',
      'Reusable magnetic hover hook with GSAP quickTo',
      'Zustand for lightweight global state (cursor, loader, menu, hovered project)',
      'Bundle splitting with Vite manualChunks for optimal load performance',
    ],
  },
  {
    id: 2,
    slug: 'anime-testimonials',
    title: 'Anime Testimonials',
    shortTitle: 'Testimonials',
    description:
      'A sleek testimonial carousel built to practice core React fundamentals — navigate through fictional anime character testimonials with Prev/Next controls or jump to a random one instantly, with circular wraparound navigation.',
    role: 'Frontend Development',
    tags: ['React', 'Tailwind CSS', 'Vite', 'React Icons'],
    // TODO: replace with real screenshot
    thumbnail: 'https://picsum.photos/seed/anime-test/800/500',
    gallery: [
      'https://picsum.photos/seed/anime-test-1/1200/700',
    ],
    liveLink: '', // TODO: add after deploying
    repoLink: '', // TODO: add after pushing to GitHub
    year: '2024',
    features: [
      'Prev/Next carousel navigation with circular wraparound',
      'Random character jump button',
      'Polished dark UI with smooth transitions',
      'Clean 3-layer component architecture (App → Testimonials → Card)',
    ],
    conceptsPracticed: [
      'useState for active index management',
      'Functional state updates (prev-state pattern) to avoid stale closures',
      'Circular navigation using the modulo operator',
      'Props drilling and destructuring',
      'Third-party icon library integration (react-icons)',
    ],
  },
  {
    id: 3,
    slug: 'anime-favourites',
    title: 'Anime Favourites',
    shortTitle: 'Favourites',
    description:
      'A beginner-friendly React practice project — a grid of anime characters where you can add or remove favourites, with a live favourite count in the navbar.',
    role: 'Frontend Development',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    // TODO: replace with real screenshot
    thumbnail: 'https://picsum.photos/seed/anime-fav/800/500',
    gallery: [
      'https://picsum.photos/seed/anime-fav-1/1200/700',
    ],
    liveLink: '', // TODO: add after deploying
    repoLink: '', // TODO: add after pushing to GitHub
    year: '2024',
    features: [
      'Add/remove favourites with instant UI feedback',
      'Live favourite count derived in the navbar',
      'Conditional button styling based on favourite state',
    ],
    conceptsPracticed: [
      'useState for character data array',
      'Immutable state updates via .map() + spread operator',
      'Derived state using .filter() (no separate counter state)',
      'List rendering with .map() and keys',
      'Event handling with closures per list item',
    ],
  },
  {
    id: 4,
    slug: 'top-courses',
    title: 'Top Courses',
    shortTitle: 'Top Courses',
    description:
      'A React mini project that fetches real course data from an API and displays filterable, category-based course cards with live wishlist toggles, toast notifications, and shimmer loading states.',
    role: 'Frontend Development',
    tags: ['React', 'Vite', 'Tailwind CSS', 'React Toastify'],
    // TODO: replace with real screenshot
    thumbnail: 'https://picsum.photos/seed/top-courses/800/500',
    gallery: [
      'https://picsum.photos/seed/top-courses-1/1200/700',
      'https://picsum.photos/seed/top-courses-2/1200/700',
    ],
    liveLink: '', // TODO: add after deploying
    repoLink: '', // TODO: add after pushing to GitHub
    year: '2024',
    features: [
      'Category filtering (All, Development, Business, Design, Lifestyle)',
      'Wishlist/heart toggle on each course card',
      'Toast notifications for API error handling',
      'Shimmer skeleton loading UI while fetching',
    ],
    conceptsPracticed: [
      'Async API calls with useState + useEffect',
      'Error handling via try/catch + react-toastify',
      'State-driven filtering without re-fetching',
      'Component composition (Navbar, Filter, Cards, Shimmer)',
    ],
  },
]
