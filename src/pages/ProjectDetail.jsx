import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { projects } from '@data/projects'
import { useReducedMotion } from '@hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  useEffect(() => {
    if (!project || !galleryRef.current) return

    const ctx = gsap.context(() => {
      if (prefersReduced) return

      const imgs = galleryRef.current?.querySelectorAll('.gallery-img') || []
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Animate features and concepts lists
      const listItems = contentRef.current?.querySelectorAll('.animate-list-item') || []
      if (listItems.length > 0) {
        gsap.fromTo(
          listItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [project, prefersReduced])

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>
          Project Not Found
        </h1>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      ref={sectionRef}
      variants={prefersReduced ? undefined : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ paddingTop: '7rem', paddingBottom: '6rem', minHeight: '100vh' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem' }}>
        {/* Back button */}
        <Link
          to="/"
          onClick={() => setTimeout(() => {
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
          }, 300)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginBottom: '3rem',
            transition: 'color 0.3s ease',
            cursor: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div style={{ marginBottom: '3rem' }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag" style={{ fontSize: '0.75rem' }}>{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'white',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            {project.title}
          </h1>

          {/* Meta row */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            marginBottom: '1.5rem',
          }}>
            {[
              { label: 'Role', value: project.role },
              { label: 'Year', value: project.year },
              { label: 'Stack', value: project.tags.join(', ') },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {label}
                </div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem' }}
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem' }}
              >
                View Code <FiGithub size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Hero Image — uses layoutId to match list thumbnail for shared-element transition */}
        <motion.div
          layoutId={`project-image-${project.slug}`}
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '4rem',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            border: '1px solid var(--color-border)',
          }}
        >
          <img
            /* Placeholder image — swap with real hero screenshot later */
            src={project.thumbnail}
            alt={`${project.title} hero screenshot`}
            loading="eager"
            style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        {/* Description & Features */}
        <div ref={contentRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'white',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              About This Project
            </h2>
            <p style={{ color: 'rgba(240,240,255,0.65)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}>
                  Key Features
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.features.map((item, i) => (
                    <li key={i} className="animate-list-item" style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'rgba(240,240,255,0.65)',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      opacity: prefersReduced ? 1 : 0,
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        marginTop: '0.55rem',
                        flexShrink: 0,
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div>
            {project.conceptsPracticed && project.conceptsPracticed.length > 0 && (
              <>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}>
                  What I Learned
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.conceptsPracticed.map((item, i) => (
                    <li key={i} className="animate-list-item" style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'rgba(240,240,255,0.65)',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      opacity: prefersReduced ? 1 : 0,
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#06B6D4',
                        marginTop: '0.55rem',
                        flexShrink: 0,
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div ref={galleryRef}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'white',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
            }}>
              Gallery
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="gallery-img"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    opacity: prefersReduced ? 1 : 0,
                  }}
                >
                  <img
                    /* Placeholder gallery image — swap with real screenshots later */
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next/Prev Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '5rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--color-border)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {(() => {
            const idx = projects.findIndex((p) => p.slug === slug)
            const prev = projects[idx - 1]
            const next = projects[idx + 1]
            return (
              <>
                {prev ? (
                  <Link
                    to={`/projects/${prev.slug}`}
                    style={{ textDecoration: 'none', color: 'var(--color-muted)', transition: 'color 0.3s', cursor: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                  >
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Previous</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>
                      ← {prev.title}
                    </div>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link
                    to={`/projects/${next.slug}`}
                    style={{ textDecoration: 'none', textAlign: 'right', color: 'var(--color-muted)', transition: 'color 0.3s', cursor: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                  >
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Next</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>
                      {next.title} →
                    </div>
                  </Link>
                ) : <div />}
              </>
            )
          })()}
        </div>
      </div>
    </motion.div>
  )
}
