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
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* CSS star field — zero JS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="stars" />
      </div>

      {/* Pixel art video frame */}
      <div className="flex justify-center pt-[15vh] md:pt-[12vh] pb-8 md:pb-0 md:absolute md:top-[12%] md:left-1/2 md:-translate-x-1/2 z-10 px-6"
        ref={frameRef}
      >
        <div
          className="relative w-[280px] h-[210px] md:w-[420px] md:h-[320px] rounded overflow-hidden"
          style={{
            border: '1px solid rgba(77,255,210,0.2)',
            boxShadow: '0 0 60px rgba(77,255,210,0.06)',
            background: '#0a0a12',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            aria-label="Pixel art coding scene"
          />
        </div>
      </div>

      {/* Caption below video (mobile: visible here, desktop: below absolute frame) */}
      <p className="font-mono text-[11px] text-muted text-center mb-8 md:absolute md:top-[calc(12%+340px)] md:left-1/2 md:-translate-x-1/2 z-10">
        {'// currently: building things'}
      </p>

      {/* Hero text — bottom-left desktop, centered mobile */}
      <div className="max-w-[1200px] w-full mx-auto relative z-20 px-6 md:px-12 text-center md:text-left">
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
