import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { useMagnetic } from '@hooks/useMagnetic'
import { useReducedMotion } from '@hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { href: 'mailto:[EMAIL_ADDRESS]', label: 'Email', Icon: Mail, color: '#7C3AED' },
  { href: 'https://github.com/sahil739785', label: 'GitHub', Icon: FiGithub, color: '#FFFFFF' },
  { href: 'https://linkedin.com/in/sahildherange', label: 'LinkedIn', Icon: FiLinkedin, color: '#0A66C2' },
  { href: 'https://instagram.com/sahilll.2504', label: 'Instagram', Icon: FiInstagram, color: '#E4405F' },
]

function MagneticIcon({ href, label, Icon, color }) {
  const ref = useMagnetic(0.4)
  return (
    <div ref={ref} className="magnetic-wrap">
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'white',
          transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          cursor: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color
          e.currentTarget.style.boxShadow = `0 0 20px ${color}40`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Icon size={20} color={color} />
      </a>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const socialsRef = useRef(null)
  const footerRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced) return

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )

      const icons = socialsRef.current?.querySelectorAll('.magnetic-wrap')
      if (icons?.length) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: socialsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email'
    if (!formData.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)

    // Placeholder submit — wire up real backend/email later
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2.5rem 4rem' }}>
        <div className="section-label">05 / Contact</div>

        {/* Large animated heading */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '4rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'white',
              marginBottom: '0.5rem',
            }}
          >
            Let's Build
          </h2>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Something.
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '500px' }}>
            I'm actively looking for frontend opportunities. Drop me a message, and I'll get back within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid #10B981',
                  borderRadius: '16px',
                  padding: '3rem',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={48} color="#10B981" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                  style={{ marginTop: '1.5rem', cursor: 'pointer' }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-label="Your name"
                    style={{ borderColor: errors.name ? '#EF4444' : undefined }}
                  />
                  <label htmlFor="name" className="floating-label">Your Name</label>
                  {errors.name && (
                    <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-label="Your email"
                    style={{ borderColor: errors.email ? '#EF4444' : undefined }}
                  />
                  <label htmlFor="email" className="floating-label">Email Address</label>
                  {errors.email && (
                    <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    aria-label="Your message"
                    style={{ resize: 'vertical', borderColor: errors.message ? '#EF4444' : undefined }}
                  />
                  <label htmlFor="message" className="floating-label">Your Message</label>
                  {errors.message && (
                    <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'wait' : 'none',
                    marginTop: '0.5rem',
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '1.5rem',
            }}>
              Find Me Online
            </h3>

            <div
              ref={socialsRef}
              style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}
            >
              {socials.map(({ href, label, Icon, color }) => (
                <MagneticIcon key={label} href={href} label={label} Icon={Icon} color={color} />
              ))}
            </div>

            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Current Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 500 }}>
                  Open to Opportunities
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                Actively seeking full-time frontend roles. Open to remote, hybrid, or on-site (Pune/Mumbai).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with marquee */}
      <footer style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 0',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: '4rem', animation: prefersReduced ? 'none' : 'marquee 20s linear infinite', width: 'max-content' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexShrink: 0 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.2)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                Sahil Dherange
              </span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✦</span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap',
              }}>
                Frontend Developer
              </span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✦</span>
            </div>
          ))}
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '1.5rem auto 0',
          padding: '0 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            © 2024 Sahil Dherange. Designed &amp; built with ❤️
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            React · Framer Motion · GSAP
          </span>
        </div>
      </footer>
    </section>
  )
}
