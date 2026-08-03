import { useRef, useEffect } from 'react'
import useStore from '@store/useStore'

/**
 * ProjectHoverImage — Fixed-position floating image that follows cursor.
 *
 * IMPORTANT: This component MUST be rendered at the App root level (in App.jsx),
 * NOT inside any Framer Motion animated wrapper. When Framer Motion applies
 * a CSS `transform` to a parent element, it creates a new containing block for
 * `position: fixed` children — trapping them and breaking the viewport-relative
 * positioning. Mounting at root avoids this entirely.
 *
 * Uses RAF + lerp for smooth following. Never calls setState on mousemove.
 * Disabled on touch devices via matchMedia('(pointer: coarse)').
 */
export default function ProjectHoverImage() {
  const wrapRef = useRef(null)
  const hoveredProject = useStore((s) => s.hoveredProject)
  const hoveredProjectRef = useRef(null) // shadow ref to avoid stale closure in RAF

  // Lerp positions
  const pos = useRef({ x: -400, y: -400 }) // start off-screen
  const target = useRef({ x: -400, y: -400 })
  const rafId = useRef(null)

  // Detect touch once at mount — never re-evaluate (avoids SSR issues)
  const isTouch = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  // --- RAF loop: runs forever, moves element whether visible or not ---
  useEffect(() => {
    if (isTouch.current) return

    const el = wrapRef.current
    if (!el) return

    const lerp = (a, b, n) => a + (b - a) * n

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1)
      // Set translate only — never append scale/other transforms here
      el.style.transform = `translate(${pos.current.x - 160}px, ${pos.current.y - 100}px)`
      rafId.current = requestAnimationFrame(tick)
    }

    const onMouseMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    rafId.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, []) // runs once on mount

  // --- Visibility: toggle opacity when hovered project changes ---
  useEffect(() => {
    if (isTouch.current) return
    const el = wrapRef.current
    if (!el) return

    hoveredProjectRef.current = hoveredProject

    if (hoveredProject) {
      // Use opacity + scale only — do NOT touch el.style.transform
      // (the RAF loop owns transform exclusively)
      el.style.opacity = '1'
      el.style.scale = '1'
      el.style.pointerEvents = 'none'
    } else {
      el.style.opacity = '0'
      el.style.scale = '0.92'
    }
  }, [hoveredProject])

  // Touch: render nothing
  if (isTouch.current) return null

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '320px',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        pointerEvents: 'none',
        // Start invisible and off-screen
        opacity: 0,
        scale: '0.92',
        // Smooth fade + subtle scale — transition only opacity & scale, NOT transform
        // (transform is driven by RAF — transitions on transform would fight the lerp)
        transition: 'opacity 0.25s ease, scale 0.25s ease',
        zIndex: 600,
        boxShadow: '0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        willChange: 'transform, opacity',
      }}
    >
      {hoveredProject && (
        <img
          /* Placeholder — swap with real project screenshots later */
          src={hoveredProject.thumbnail}
          alt={hoveredProject.title}
          // eager load so first hover isn't blank
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
    </div>
  )
}
