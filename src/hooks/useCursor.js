import { useEffect, useRef } from 'react'

/**
 * useCursor — RAF-based cursor tracking with lerp for smooth trailing.
 * Returns refs to the dot and ring elements so the caller can attach them.
 * Never calls setState on every mousemove — updates DOM directly via transforms.
 */
export function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)
  const isTouch = useRef(false)

  useEffect(() => {
    // Detect touch device — disable custom cursor
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouch.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Show elements
    dot.style.opacity = '1'
    ring.style.opacity = '1'

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      // Dot follows instantly
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`
    }

    const lerp = (a, b, n) => a + (b - a) * n

    const tick = () => {
      // Ring lerps toward mouse
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12)
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { dotRef, ringRef }
}
