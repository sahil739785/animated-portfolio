import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { useMagnetic } from '@hooks/useMagnetic'
import { useReducedMotion } from '@hooks/useReducedMotion'
import useStore from '@store/useStore'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollCueRef = useRef(null)
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const loaderComplete = useStore((s) => s.loaderComplete)

  // Magnetic CTA button
  const magneticRef = useMagnetic(0.35)

  useEffect(() => {
    if (!loaderComplete) return

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Just show everything immediately
        gsap.set([nameRef.current, subtitleRef.current, ctaRef.current, scrollCueRef.current], {
          autoAlpha: 1, y: 0,
        })
        return
      }

      const tl = gsap.timeline({ delay: 0.2 })

      // Split "Sahil Dherange" into individual word spans for stagger
      const nameEl = nameRef.current
      if (nameEl) {
        const words = nameEl.querySelectorAll('.word')
        tl.fromTo(
          words,
          { y: '110%', opacity: 0, rotateX: -15 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
          }
        )
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )

      // Parallax on scroll
      gsap.to(nameRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(blob1Ref.current, {
        y: -120,
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [loaderComplete, prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
      style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
    >
      {/* Gradient blobs */}
      <div
        ref={blob1Ref}
        className="gradient-blob"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
          animationDelay: '0s',
        }}
      />
      <div
        ref={blob2Ref}
        className="gradient-blob"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
          animationDelay: '-5s',
        }}
      />

      {/* SVG grid decoration */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Tagline */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '2rem',
            fontWeight: 600,
          }}
        >
          ✦ Available for Frontend Roles
        </div>

        {/* Name with split-word animation */}
        <div
          ref={nameRef}
          className="hero-name"
          style={{ overflow: 'hidden', perspective: '1000px' }}
        >
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <span className="word" style={{ display: 'inline-block' }}>Sahil</span>
          </div>
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <span
              className="word"
              style={{
                display: 'inline-block',
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                color: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Dherange
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="hero-subtitle"
          style={{ opacity: 0 }}
        >
          Frontend Developer &mdash; Self-Taught · Actively Building
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <div ref={magneticRef} className="magnetic-wrap">
            <a href="#projects" className="btn-primary" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              View My Work
              <ArrowDown size={16} />
            </a>
          </div>
          <a href="#contact" className="btn-outline" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {[
            { num: '6+', label: 'Projects Built' },
            { num: '7', label: 'Skills Mastering' },
            { num: '∞', label: 'Still Learning' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.03em',
              }}>
                {num}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="scroll-cue"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0,
        }}
      >
        <div className="scroll-cue-line" />
        <span style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
        }}>
          Scroll
        </span>
      </div>
    </section>
  )
}
