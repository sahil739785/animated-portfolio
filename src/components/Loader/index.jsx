import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Loader — Full-screen loading screen with GSAP-animated percentage counter
 * and a dual-curtain reveal transition into the homepage.
 * Shows on every load/refresh. Uses GSAP timeline for sequenced animations.
 */
export default function Loader() {
  const wrapperRef = useRef(null)
  const curtainRef = useRef(null)
  const counterRef = useRef(null)
  const labelRef = useRef(null)
  const progressBarRef = useRef(null)
  const setLoaderComplete = useStore((s) => s.setLoaderComplete)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const wrapper = wrapperRef.current
    const curtain = curtainRef.current
    const counter = counterRef.current
    const progressBar = progressBarRef.current

    if (!wrapper || !curtain || !counter) return

    if (prefersReduced) {
      // Skip animation, mark complete immediately
      gsap.set(wrapper, { autoAlpha: 0 })
      setLoaderComplete(true)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaderComplete(true)
          document.body.style.overflow = 'auto'
        },
      })

      // Lock scroll during loader
      document.body.style.overflow = 'hidden'

      // Animate counter from 0 to 100
      const countObj = { val: 0 }
      tl.to(countObj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counter) {
            counter.textContent = Math.round(countObj.val)
          }
          if (progressBar) {
            progressBar.style.width = `${countObj.val}%`
          }
        },
      })

      // Brief pause at 100
      tl.to({}, { duration: 0.2 })

      // Curtain slides UP from bottom (mask wipe reveal)
      tl.to(curtain, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.6,
        ease: 'power4.in',
      })

      // Fade out the counter text
      tl.to(
        counter.parentElement,
        { autoAlpha: 0, duration: 0.3 },
        '-=0.5'
      )

      // Curtain slides UP off screen (wipe away)
      tl.to(curtain, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.7,
        ease: 'power4.out',
      })

      // Fade wrapper out
      tl.to(wrapper, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          wrapper.style.display = 'none'
        },
      })
    }, wrapper)

    return () => ctx.revert()
  }, [prefersReduced, setLoaderComplete])

  return (
    <>
      {/* Main loader wrapper */}
      <div ref={wrapperRef} className="loader-wrapper">
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo / Name */}
        <div
          ref={labelRef}
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '-0.02em',
          }}
        >
          SD
        </div>

        {/* Counter area */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            ref={counterRef}
            className="loader-counter"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            0
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginTop: '0.5rem',
            }}
          >
            Loading
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '2.5rem',
            right: '2.5rem',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
            borderRadius: '1px',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-cyan))',
              transition: 'none',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>

      {/* Purple curtain for wipe reveal */}
      <div
        ref={curtainRef}
        className="loader-curtain"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
          transform: 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
    </>
  )
}
