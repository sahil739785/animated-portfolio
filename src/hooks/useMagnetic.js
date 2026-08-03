import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * useMagnetic — Shared reusable hook for magnetic hover effect.
 * Elements subtly follow cursor within their bounds using GSAP quickTo.
 * Used by: Hero CTA button, Contact social icons, any magnetic element.
 * 
 * @param {number} strength - How strongly the element follows the cursor (0-1, default 0.3)
 * @param {number} ease - GSAP ease string for quickTo (default 'power3')
 */
export function useMagnetic(strength = 0.3, ease = 'power3') {
  const ref = useRef(null)
  const isTouch = useRef(window.matchMedia('(pointer: coarse)').matches)

  useEffect(() => {
    if (isTouch.current) return

    const el = ref.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease })

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      xTo(distX * strength)
      yTo(distY * strength)
    }

    const onMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      gsap.killTweensOf(el)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength, ease])

  return ref
}
