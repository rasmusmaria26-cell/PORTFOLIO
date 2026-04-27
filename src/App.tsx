import React, { useEffect, useRef, lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CursorProvider } from '@/context/CursorContext'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import Background from '@/components/Background'
import { GlassDock, DockItem } from '@/components/ui/liquid-glass'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Lazy load sections below the fold
const Marquee = lazy(() => import('@/sections/Marquee'))
const About = lazy(() => import('@/sections/About'))
const Works = lazy(() => import('@/sections/Works'))
const Achievements = lazy(() => import('@/sections/Achievements'))
const Footer = lazy(() => import('@/sections/Footer'))

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Init Lenis after DOM is ready
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(st => st.kill())
      gsap.ticker.remove(() => {})
      lenisRef.current = null
    }
  }, [])

  const dockItems: DockItem[] = [
    { icon: <Github size={24} />, label: 'GitHub', href: 'https://github.com/rasmusmaria26-cell' },
    { icon: <Linkedin size={24} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/maria-rasmus' },
    { icon: <Mail size={24} />, label: 'Email', href: 'mailto:rasmusmaria26@gmail.com' },
    { icon: <FileText size={24} />, label: 'Resume', href: '/Maria_Rasmus.pdf' },
  ]

  return (
    <LazyMotion features={domAnimation}>
      <CursorProvider>
        <CustomCursor />
        <Nav />

        {/* Floating Bottom Dock */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block pointer-events-auto">
          <GlassDock items={dockItems} />
        </div>

        {/* Main content — z-10 for footer curtain reveal on desktop */}
        <main id="main-content" className="relative z-10 bg-transparent">
          <Background />
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <Marquee />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Works />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Achievements />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </CursorProvider>
    </LazyMotion>
  )
}
