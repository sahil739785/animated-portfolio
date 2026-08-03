import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import useStore from '@store/useStore'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const navLinks = [
  { href: '/', label: 'Home', num: '01' },
  { href: '#about', label: 'About', num: '02' },
  { href: '#tech', label: 'Tech Stack', num: '03' },
  { href: '#projects', label: 'Projects', num: '04' },
  { href: '#contact', label: 'Contact', num: '05' },
]

const socialLinks = [
  { href: 'https://github.com/sahil739785', label: 'GitHub', Icon: FiGithub },
  { href: 'https://linkedin.com/in/sahildherange', label: 'LinkedIn', Icon: FiLinkedin },
  { href: 'https://twitter.com/sahildherange', label: 'Twitter', Icon: FiTwitter },
]

// Framer Motion variants for staggered nav link entrance
const overlayVariants = {
  closed: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  open: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

const linkContainerVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
  },
}

const linkVariants = {
  closed: { y: '110%', opacity: 0 },
  open: { y: '0%', opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const socialVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.5 } },
}

export default function Navbar() {
  const { menuOpen, setMenuOpen } = useStore()
  const prefersReduced = useReducedMotion()
  const location = useLocation()
  const hamburgerRef = useRef(null)
  const blobRef = useRef(null)
  const line1 = useRef(null)
  const line2 = useRef(null)
  const line3 = useRef(null)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  // Animate hamburger lines → X
  useEffect(() => {
    if (prefersReduced) return
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.to(line1.current, { y: 7, rotation: 45, duration: 0.35, ease: 'power2.inOut' })
        gsap.to(line2.current, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power2.in' })
        gsap.to(line3.current, { y: -7, rotation: -45, duration: 0.35, ease: 'power2.inOut' })
      } else {
        gsap.to(line1.current, { y: 0, rotation: 0, duration: 0.35, ease: 'power2.inOut' })
        gsap.to(line2.current, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out', delay: 0.1 })
        gsap.to(line3.current, { y: 0, rotation: 0, duration: 0.35, ease: 'power2.inOut' })
      }
    }, hamburgerRef)

    return () => ctx.revert()
  }, [menuOpen, prefersReduced])

  // Cursor-reactive blob in overlay background
  const handleOverlayMouseMove = (e) => {
    if (!blobRef.current || prefersReduced) return
    const blob = blobRef.current
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    blob.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(124,58,237,0.12), transparent 60%)`
  }

  const handleNavClick = (e, href) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      e.preventDefault()
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <nav className="navbar" style={{ zIndex: 1001 }}>
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          SD
        </Link>

        <button
          ref={hamburgerRef}
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ cursor: 'none' }}
        >
          <span ref={line1} className="hamburger-line" />
          <span ref={line2} className="hamburger-line" style={{ width: '70%', alignSelf: 'flex-end' }} />
          <span ref={line3} className="hamburger-line" />
        </button>
      </nav>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            variants={prefersReduced ? undefined : overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseMove={handleOverlayMouseMove}
            style={{ zIndex: 999 }}
          >
            {/* Cursor-reactive blob background */}
            <div
              ref={blobRef}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                transition: 'background 0.1s ease',
                zIndex: 0,
              }}
            />

            {/* Close button overlay area */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>SD</span>
            </div>

            {/* Nav Links */}
            <motion.div
              className="nav-links-container"
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {navLinks.map((link) => (
                <div key={link.label} className="nav-link-item">
                  <motion.div variants={linkVariants}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="nav-link-text"
                        onClick={(e) => handleNavClick(e, link.href)}
                      >
                        <span className="nav-link-number">{link.num}</span>
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="nav-link-text"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="nav-link-number">{link.num}</span>
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="nav-social-links"
              variants={socialVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social-link"
                  aria-label={label}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
