import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@data/experience'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { Rocket, BookOpen, Wrench, GitBranch } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Icons & colours mapped to the new learning-journey entry types
const typeIcons = {
  Start: Rocket,
  Learning: BookOpen,
  Current: Wrench,
  Projects: GitBranch,
}

const typeColors = {
  Start: '#F59E0B',
  Learning: '#7C3AED',
  Current: '#06B6D4',
  Projects: '#10B981',
}

export default function About() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const bioRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced) return

      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const items = timelineRef.current?.querySelectorAll('.timeline-item')
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    // Reduced motion: make everything visible immediately
    if (prefersReduced) {
      if (bioRef.current) bioRef.current.style.opacity = '1'
      if (timelineRef.current) {
        timelineRef.current.querySelectorAll('.timeline-item').forEach((el) => {
          el.style.opacity = '1'
        })
      }
    }

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: '8rem max(2.5rem, env(safe-area-inset-left))',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div className="section-label">02 / About Me</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* ── Bio side ── */}
        <div ref={bioRef} style={{ opacity: 0, position: 'sticky', top: '8rem' }}>
          {/* Avatar — placeholder initials, swap for real photo later */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              fontSize: '2.5rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'white',
              border: '3px solid rgba(124,58,237,0.3)',
              boxShadow: '0 0 40px rgba(124,58,237,0.2)',
              flexShrink: 0,
            }}
          >
            SD
          </div>

          <h2
            className="section-title"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1.5rem' }}
          >
            Hey, I'm Sahil
          </h2>

          <p style={{
            color: 'rgba(240,240,255,0.65)',
            lineHeight: 1.8,
            fontSize: '1.05rem',
            marginBottom: '1.5rem',
          }}>
            I'm a <strong style={{ color: 'white' }}>self-taught frontend developer</strong> based
            in Pune, currently mastering HTML, CSS, JavaScript, React.js, and Tailwind CSS.
            I started from zero — no formal CS degree, just genuine curiosity and a lot of
            building — and I haven't stopped since.
          </p>

          <p style={{
            color: 'rgba(240,240,255,0.65)',
            lineHeight: 1.8,
            fontSize: '1.05rem',
            marginBottom: '2rem',
          }}>
            My focus right now is on <strong style={{ color: 'white' }}>consistently strengthening
            my core fundamentals</strong> through mini-projects, not just consuming tutorials.
            I'm driven by problem-solving, a love for clean UIs, and the kind of curiosity
            that makes me stay up to figure out <em>why</em> something works the way it does.
            Looking for my first frontend role where I can grow alongside great engineers and
            contribute from day one.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['Self-Taught', 'Always Building', 'Detail-Oriented', 'Fast Learner'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                  background: 'var(--color-surface)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Learning Journey timeline ── */}
        <div ref={timelineRef}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '2.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            My Learning Journey
          </h3>

          {experience.map((item) => {
            const Icon = typeIcons[item.type] || Rocket
            const color = typeColors[item.type] || '#7C3AED'

            return (
              <div
                key={item.id}
                className="timeline-item"
                style={{ opacity: 0 }}
              >
                {/* Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Icon size={12} color={color} />
                  <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color,
                    fontWeight: 600,
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Milestone title */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '0.25rem',
                }}>
                  {item.role}
                </div>

                {/* Duration */}
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  marginBottom: '0.75rem',
                }}>
                  {item.duration}
                </div>

                {/* Highlights */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '0.88rem',
                        color: 'rgba(240,240,255,0.6)',
                        lineHeight: 1.65,
                        paddingLeft: '1rem',
                        position: 'relative',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.55rem',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: color,
                        opacity: 0.7,
                      }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
