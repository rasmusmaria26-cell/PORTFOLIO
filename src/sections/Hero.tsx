import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PrismaHero } from '@/components/ui/prisma-hero'
import { AnimatedHero } from '@/components/ui/animated-hero'
import { Button } from '@/components/ui/button'
import { useCursor } from '@/context/CursorContext'

export default function Hero() {
  const { setVariant } = useCursor()
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to lazy-load video
  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!frame || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = '/pixel-hero.mp4'
          video.load()
          video.play().catch(() => {})
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden pb-16 md:min-h-screen md:justify-end md:pb-24"
    >
      {/* CSS star field — zero JS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="stars" />
      </div>

      {/* Video — top-half on mobile, right-side bleed on desktop */}
      <div
        ref={frameRef}
        className="absolute top-0 left-0 w-full h-[55vh] md:inset-y-0 md:left-auto md:right-0 md:w-[55%] md:h-auto z-0 pointer-events-none"
      >
        {/* Mobile gradient: strong bottom fade so text stays readable */}
        <div
          className="absolute inset-0 z-10 md:hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(6,6,8,0.1) 0%, rgba(6,6,8,0.5) 50%, #060608 90%)',
          }}
        />
        {/* Desktop gradient: left-to-right fade + bottom fade */}
        <div
          className="absolute inset-0 z-10 hidden md:block"
          style={{
            background: 'linear-gradient(to right, #060608 0%, #060608 15%, rgba(6,6,8,0.6) 45%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-10 hidden md:block"
          style={{
            background: 'linear-gradient(to top, #060608 0%, transparent 30%)',
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover object-center md:object-left"
          style={{ opacity: 0.5 }}
          aria-label="Pixel art coding scene"
        />
      </div>

      {/* Hero text — flows right under video on mobile, pinned bottom-left on desktop */}
      <div className="relative z-20 mt-[38vh] md:mt-0 max-w-[1200px] w-full mx-auto px-6 md:px-12 text-center md:text-left">
        <PrismaHero
          eyebrow="[ AVAILABLE FOR HIRE ]"
          name="MARIA RASMUS R"
        >
          <div className="flex justify-center md:justify-start">
            <AnimatedHero
              staticText="I build"
              words={['websites', 'apps', 'systems', 'experiences', 'products']}
              interval={2000}
            />
          </div>

          {/* Location + availability tag — mobile only */}
          <motion.p
            className="md:hidden font-mono text-[11px] text-muted mt-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Tamil Nadu, India &nbsp;·&nbsp; Open to freelance &amp; full-time
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a href="#works" onClick={(e) => { e.preventDefault(); document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Button
                variant="default"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                See My Work ↓
              </Button>
            </a>
            <a href="/Maria_Rasmus.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Download CV
              </Button>
            </a>
          </motion.div>

          {/* Stat row — mobile only, fills remaining space nicely */}
          <motion.div
            className="md:hidden flex justify-center gap-8 mt-10 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {[['4', 'Projects'], ['2', 'Hackathon Wins'], ['3+', 'Years']].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-clash font-bold text-[24px] text-teal leading-none">{num}</span>
                <span className="font-mono text-[9px] text-muted tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </PrismaHero>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-muted tracking-[0.2em]">SCROLL</span>
        <div className="scroll-line-wrapper">
          <div className="scroll-line-highlight" />
        </div>
      </motion.div>
    </section>
  )
}
