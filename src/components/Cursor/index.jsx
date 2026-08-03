import { useEffect, useRef } from 'react'
import useStore from '@store/useStore'
import { useCursor } from '@hooks/useCursor'

/**
 * Cursor — Custom animated dot + trailing ring cursor.
 * - Dot follows mouse instantly
 * - Ring lerps behind with RAF (see useCursor hook)
 * - Scales/morphs on hover states from Zustand cursorVariant
 * - mix-blend-mode: difference for premium look
 * - Disabled on touch devices
 */
export default function Cursor() {
  const { dotRef, ringRef } = useCursor()
  const cursorVariant = useStore((s) => s.cursorVariant)
  const isTouch = useRef(window.matchMedia('(pointer: coarse)').matches)

  useEffect(() => {
    if (isTouch.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Set up hover detection for interactive elements
    const addCursorClass = () => useStore.getState().setCursorVariant('hovered')
    const removeCursorClass = () => useStore.getState().setCursorVariant('default')

    const setViewVariant = () => useStore.getState().setCursorVariant('view')

    const interactiveEls = document.querySelectorAll('a, button, .project-row, [data-cursor="view"]')
    interactiveEls.forEach((el) => {
      const isProjectRow = el.classList.contains('project-row') || el.dataset.cursor === 'view'
      el.addEventListener('mouseenter', isProjectRow ? setViewVariant : addCursorClass)
      el.addEventListener('mouseleave', removeCursorClass)
    })

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', addCursorClass)
        el.removeEventListener('mouseenter', setViewVariant)
        el.removeEventListener('mouseleave', removeCursorClass)
      })
    }
  }, [dotRef, ringRef])

  if (isTouch.current) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${cursorVariant !== 'default' ? 'hovered' : ''}`}
        style={{
          opacity: 0,
          width: cursorVariant === 'view' ? '60px' : cursorVariant === 'hovered' ? '40px' : '10px',
          height: cursorVariant === 'view' ? '60px' : cursorVariant === 'hovered' ? '40px' : '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-display)',
          fontWeight: '600',
          letterSpacing: '0.05em',
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease',
        }}
      >
        {cursorVariant === 'view' && (
          <span style={{ color: '#000', userSelect: 'none', pointerEvents: 'none' }}>VIEW</span>
        )}
      </div>
      <div
        ref={ringRef}
        className={`cursor-ring ${cursorVariant !== 'default' ? 'hovered' : ''}`}
        style={{ opacity: 0 }}
      />
    </>
  )
}
