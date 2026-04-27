import React, { useEffect, useRef } from 'react'
import { useCursor } from '@/context/CursorContext'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { variant } = useCursor()
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  // Only render on devices with hover (desktop)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  useEffect(() => {
    if (isTouch) return
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  useEffect(() => {
    if (isTouch) return
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px)`
      }
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [isTouch])

  if (isTouch) return null

  // State-dependent styles
  const dotSize = variant === 'default' ? 10 : variant === 'hover' ? 6 : 4
  const dotColor = variant === 'default' ? 'var(--teal)' : 'var(--magenta)'
  const ringSize = variant === 'default' ? 36 : variant === 'hover' ? 54 : 80
  const ringColor = variant === 'default'
    ? 'rgba(77,255,210,0.5)'
    : 'rgba(255,77,255,0.5)'

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: dotSize, height: dotSize,
          marginLeft: -dotSize / 2, marginTop: -dotSize / 2,
          backgroundColor: dotColor,
          mixBlendMode: 'screen',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, margin 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          width: ringSize, height: ringSize,
          marginLeft: -ringSize / 2, marginTop: -ringSize / 2,
          border: `1.5px solid ${ringColor}`,
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border 0.2s, margin 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {variant === 'view' && (
          <span className="font-mono text-[10px] text-teal tracking-wider select-none">VIEW</span>
        )}
      </div>
    </>
  )
}
