import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(6rem, 15vw, 12rem)',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.05)',
        lineHeight: 1,
        marginBottom: '1rem',
        letterSpacing: '-0.05em'
      }}>
        404
      </div>
      
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        color: 'white',
        marginBottom: '1.5rem',
        fontWeight: 600
      }}>
        Page Not Found
      </h1>
      
      <p style={{
        color: 'var(--color-muted)',
        maxWidth: '400px',
        marginBottom: '3rem',
        lineHeight: 1.6
      }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="btn-primary"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <Home size={16} />
        Back to Home
      </Link>
    </motion.div>
  )
}
