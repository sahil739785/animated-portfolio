import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '@components/Navbar'
import Cursor from '@components/Cursor'
import Loader from '@components/Loader'
import ProjectHoverImage from '@components/ProjectHoverImage'
import { useLenis } from '@hooks/useLenis'
import useStore from '@store/useStore'

// Lazy-loaded pages
const Home = lazy(() => import('@pages/Home'))
const ProjectDetail = lazy(() => import('@pages/ProjectDetail'))

// Suspense fallback
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '2px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            // Use opacity only (not transform) for page fade so position:fixed children
            // (ProjectHoverImage) aren't trapped by a containing-block transform.
            // ProjectHoverImage is mounted at root level below, NOT inside this wrapper.
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              // Explicitly prevent Framer Motion from setting will-change:transform
              // which would create a new containing block for fixed children
              style={{ willChange: 'opacity' }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects/:slug"
          element={<ProjectDetail />}
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useLenis()
  const loaderComplete = useStore((s) => s.loaderComplete)

  // Set cursor: none on body for non-touch
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (!isTouch) {
      document.body.style.cursor = 'none'
    }
  }, [])

  return (
    <>
      {/* Custom Cursor — always at root, self-disables on touch */}
      <Cursor />

      {/* Preloader — shows until GSAP timeline completes */}
      <Loader />

      {/*
        ProjectHoverImage at root level — CRITICAL.
        Must NOT be inside any Framer Motion animated wrapper.
        If a parent has CSS transform (even framer-motion's opacity animation
        can set will-change:transform), position:fixed children are trapped
        and positioned relative to that ancestor instead of the viewport.
        Mounting here ensures it's always viewport-relative.
      */}
      <ProjectHoverImage />

      {/* Main layout — shown after loader */}
      <div style={{
        opacity: loaderComplete ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: loaderComplete ? 'auto' : 'none',
      }}>
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </div>

      {/* Inline spin keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
