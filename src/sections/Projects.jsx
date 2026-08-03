import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@data/projects'
import useStore from '@store/useStore'
import { useReducedMotion } from '@hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const headerRef = useRef(null)
  const { setHoveredProject, setCursorVariant } = useStore()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced) return

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const rows = listRef.current?.querySelectorAll('.project-row')
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const handleProjectEnter = (project) => {
    setHoveredProject(project)
    setCursorVariant('view')
  }

  const handleProjectLeave = () => {
    setHoveredProject(null)
    setCursorVariant('default')
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: '8rem 2.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}
    >
      {/* Section header */}
      <div ref={headerRef} style={{ opacity: 0, marginBottom: '2rem' }}>
        <div className="section-label">04 / Projects</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title">
            Selected Work
          </h2>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            {projects.length} projects total
          </span>
        </div>
      </div>

      {/* Top border */}
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Project list */}
      <div ref={listRef}>
        {projects.map((project, idx) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className="project-row"
            data-cursor="view"
            onMouseEnter={() => handleProjectEnter(project)}
            onMouseLeave={handleProjectLeave}
            onClick={handleProjectLeave}
            style={{ opacity: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label={`View ${project.title} project details`}
          >
            <div className="project-row-bg" />

            {/* Index */}
            <span className="project-index" style={{ position: 'relative', zIndex: 1 }}>
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Title */}
            <span className="project-title-text" style={{ position: 'relative', zIndex: 1 }}>
              {project.title}
            </span>

            {/* Tags */}
            <div className="project-tags" style={{ position: 'relative', zIndex: 1, marginRight: '1rem' }}>
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            {/* Arrow */}
            <ArrowUpRight
              size={20}
              color="var(--color-muted)"
              style={{ flexShrink: 0, position: 'relative', zIndex: 1, transition: 'color 0.3s ease, transform 0.3s ease' }}
              className="project-arrow"
            />
          </Link>
        ))}
      </div>

    </section>
  )
}
