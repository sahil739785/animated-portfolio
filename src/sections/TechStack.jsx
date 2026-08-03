import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
} from 'react-icons/si'
import { ScrollText } from 'lucide-react' // used for Lenis (no react-icons entry)
import { techStack, marqueeStack } from '@data/techStack'
import { softSkills } from '@data/softSkills'
import { useReducedMotion } from '@hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Map icon strings to actual components
const iconMap = {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  LENIS_CUSTOM: ScrollText, // Lenis — no SI icon, use lucide
}

export default function TechStack() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const pillsRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Skip stagger — just make everything visible instantly
        gsap.set(gridRef.current?.querySelectorAll('.tech-card'), { opacity: 1, y: 0, scale: 1 })
        gsap.set(pillsRef.current?.querySelectorAll('.soft-pill'), { opacity: 1, y: 0 })
        return
      }

      // 1. Tech cards — "landing" bounce stagger
      const cards = gridRef.current?.querySelectorAll('.tech-card')
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: { amount: 0.55, from: 'start' },
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 2. Soft skill pills — sequenced AFTER tech cards finish
      const pills = pillsRef.current?.querySelectorAll('.soft-pill')
      if (pills?.length) {
        gsap.fromTo(
          pills,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const doubleMarquee = [...marqueeStack, ...marqueeStack]

  return (
    <section
      ref={sectionRef}
      id="tech"
      style={{ padding: '8rem 0', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', width: '100%' }}>
        <div className="section-label">03 / Skills</div>
        <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
          What I'm Mastering
        </h2>
        <p style={{
          color: 'var(--color-muted)',
          fontSize: '1rem',
          marginBottom: '3.5rem',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}>
          Self-taught, consistently building. These are the tools I work with every day —
          sharpened through real projects, not just tutorials.
        </p>

        {/* ── Technical Skills ── */}
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          Technical Skills
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          {techStack.map((tech) => {
            const Icon = iconMap[tech.icon]

            return (
              <div
                key={tech.id}
                className="tech-card"
                style={{ opacity: 0, cursor: 'default' }}
                onMouseEnter={(e) => {
                  if (window.matchMedia('(pointer: coarse)').matches) return
                  gsap.to(e.currentTarget, {
                    rotateX: -6,
                    rotateY: 8,
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out',
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                  })
                }}
              >
                {/* Tooltip on hover — name only, no proficiency % */}
                <div className="tech-tooltip">{tech.note}</div>

                {/* Icon */}
                <div
                  className="tech-icon"
                  style={{
                    color: tech.icon === 'LENIS_CUSTOM' ? tech.color : undefined,
                  }}
                >
                  {Icon && (
                    <Icon
                      color={tech.icon !== 'LENIS_CUSTOM' ? tech.color : tech.color}
                      size={tech.icon === 'LENIS_CUSTOM' ? 38 : undefined}
                    />
                  )}
                </div>

                {/* Name */}
                <span style={{
                  fontSize: '0.8rem',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}>
                  {tech.name}
                </span>

                {/* Category pill */}
                <span style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '100px',
                }}>
                  {tech.category}
                </span>
              </div>
            )
          })}
        </div>

        {/* ── Soft Skills ── */}
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#06B6D4',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          Soft Skills
        </div>

        <div
          ref={pillsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.875rem',
          }}
        >
          {softSkills.map((skill) => (
            <div
              key={skill.id}
              className="soft-pill"
              style={{
                opacity: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '100px',
                border: `1px solid ${skill.color}33`,
                background: `${skill.color}0D`,
                boxShadow: `0 0 20px ${skill.color}18`,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${skill.color}66`
                e.currentTarget.style.boxShadow = `0 0 28px ${skill.color}30`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${skill.color}33`
                e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}18`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{skill.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '-0.01em',
              }}>
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite marquee strip */}
      <div
        style={{
          marginTop: '5rem',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: '1.25rem 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            animation: prefersReduced ? 'none' : 'marquee 22s linear infinite',
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {doubleMarquee.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
