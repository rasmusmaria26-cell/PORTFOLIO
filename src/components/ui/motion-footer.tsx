import React, { useRef, useState, useEffect } from 'react'
import { useCursor } from '@/context/CursorContext'
import gsap from 'gsap'

function MagneticButton({ children, className = '', href, size = 'lg' }: {
  children: React.ReactNode; className?: string; href?: string; size?: 'lg' | 'sm'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { setVariant } = useCursor()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none)').matches)
  }, [])

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    gsap.to(ref.current, {
      x: (e.clientX - left - width / 2) * 0.4,
      y: (e.clientY - top - height / 2) * 0.4,
      duration: 0.3, ease: 'power2.out',
    })
  }
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' })
    setVariant('default')
  }

  const sizeClasses = size === 'lg'
    ? 'px-6 md:px-8 py-3 md:py-4 text-[13px] md:text-[14px]'
    : 'px-4 md:px-5 py-2.5 md:py-3 text-[11px] md:text-[12px]'

  return (
    <a ref={ref} href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center font-mono tracking-wider border border-line rounded-full
        text-smoke hover:border-teal hover:text-teal transition-colors duration-300
        min-h-[44px] w-full md:w-auto text-center ${sizeClasses} ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onMouseEnter={() => setVariant('hover')}
    >{children}</a>
  )
}

function FooterContent({ scrollTop }: { scrollTop: () => void }) {
  const { setVariant } = useCursor()
  return (
    <div className="relative w-full h-full overflow-hidden bg-surface flex flex-col">
      {/* Grid BG */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      {/* Aurora glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="aurora-glow w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(77,255,210,0.08) 0%, rgba(255,77,255,0.06) 40%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="font-clash font-black uppercase select-none whitespace-nowrap"
          style={{ fontSize: '26vw', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.03)', lineHeight: 1 }}>
          RASMUS
        </span>
      </div>

      {/* Diagonal marquee */}
      <div className="absolute top-[15%] left-[-5%] w-[120%] overflow-hidden pointer-events-none"
        style={{ transform: 'rotate(-2deg)' }} aria-hidden="true">
        <div className="bg-surface-2 border-y border-line py-3">
          <div className="whitespace-nowrap animate-marquee">
            {[0, 1].map(n => (
              <span key={n} className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
                FREELANCE · WEB DEVELOPMENT · REACT · FULL-STACK · AVAILABLE FOR HIRE · CLIENT WORK · OPEN SOURCE · TYPESCRIPT ·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-20">
        <h2 className="font-syne font-extrabold text-center mb-12 md:mb-16 leading-tight text-[40px] md:text-[80px]"
          style={{ background: 'linear-gradient(to bottom, #F0F0F0, rgba(240,240,240,0.4))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Let's build something.
        </h2>

        <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-center gap-4 md:gap-5 w-full md:w-auto max-w-[400px] md:max-w-none mb-4 md:mb-6">
          <MagneticButton href="mailto:rasmusmaria26@gmail.com" size="lg">rasmusmaria26@gmail.com</MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/maria-rasmus" size="lg">LinkedIn ↗</MagneticButton>
          <MagneticButton href="https://github.com/rasmusmaria26-cell" size="lg">GitHub ↗</MagneticButton>
        </div>
        <div className="flex justify-center w-full md:w-auto max-w-[400px] md:max-w-none mb-16 md:mb-20">
          <MagneticButton href="tel:+917010378334" size="sm">+91 7010378334</MagneticButton>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-line px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-muted order-2 md:order-1">© 2026 Maria Rasmus R. All rights reserved.</span>
          <span className="order-1 md:order-2 font-mono text-[10px] text-muted flex items-center gap-1.5">
            Crafted with <span className="heartbeat text-[var(--magenta)]">❤</span> by Maria Rasmus R
          </span>
          <button
            onClick={scrollTop}
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
            className="order-3 w-11 h-11 rounded-full border border-line flex items-center justify-center text-muted hover:border-teal hover:text-teal transition-colors duration-300 min-w-[44px]"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}

export function MotionFooter() {
  const [isMobile, setIsMobile] = useState(false)
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile — plain footer, no fixed positioning
  if (isMobile) {
    return (
      <footer id="footer" className="relative bg-surface overflow-hidden" style={{ minHeight: '80vh' }}>
        <FooterContent scrollTop={scrollTop} />
      </footer>
    )
  }

  // Desktop — curtain reveal: fixed footer + clip-path wrapper in flow
  return (
    <div
      id="footer"
      className="relative"
      style={{
        height: '100vh',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      <footer
        className="fixed bottom-0 left-0 right-0"
        style={{ height: '100vh' }}
      >
        <FooterContent scrollTop={scrollTop} />
      </footer>
    </div>
  )
}
