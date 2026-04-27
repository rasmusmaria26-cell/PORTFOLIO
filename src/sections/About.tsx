import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'

const stats = [
  { value: 5, suffix: '+', label: 'Projects Shipped' },
  { value: 2, suffix: '+', label: 'Happy Clients' },
  { value: 1, suffix: '', label: 'Hackathon Won' },
  { value: 3, suffix: '', label: 'Languages & Frameworks' },
]

const skills = [
  'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Supabase', 'REST APIs',
  'Framer Motion', 'GSAP', 'Vite',
  'Kotlin', 'Jetpack Compose', 'MVVM',
  'TensorFlow.js', 'Mesh Networking', 'Cryptography',
  'Figma', 'Git', 'Android Studio',
]

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useIntersection(ref)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const animate = (now: number) => {
      const p = Math.min((now - start) / 1500, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, target])
  return <span ref={ref} className="font-clash font-bold text-[48px] text-teal leading-none">{count}{suffix}</span>
}

function WordsPullUp({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const visible = useIntersection(ref)
  return (
    <h2 ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={visible ? { y: '0%' } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </h2>
  )
}

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftVis = useIntersection(leftRef)
  const rightVis = useIntersection(rightRef)
  const { setVariant } = useCursor()

  return (
    <section id="about" className="py-20 md:py-[120px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
        {/* Left */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -60 }}
          animate={leftVis ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal mb-6">01 / ABOUT</p>
          <WordsPullUp text="The Builder" className="font-syne font-bold text-[36px] md:text-[56px] text-smoke mb-8 leading-tight" />
          <p className="font-body text-[15px] md:text-[17px] font-light leading-[1.8] text-smoke/85 mb-12 max-w-[540px]">
            I build things — web apps, mobile apps, systems. From encrypted mesh networks to fine dining websites.
            Currently freelancing and open to full-time roles where there's real engineering to figure out.
          </p>

          {/* Stats — 2x2 mobile, row desktop */}
          <div className="grid grid-cols-2 md:flex gap-8 md:gap-12">
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <CountUp target={s.value} suffix={s.suffix} />
                <span className="font-mono text-[10px] md:text-[11px] text-muted tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — skill pills */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60 }}
          animate={rightVis ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-3 content-start pt-0 lg:pt-20"
        >
          {skills.map(skill => (
            <span
              key={skill}
              className="font-mono text-[10px] md:text-[11px] text-smoke/70 border border-line bg-surface
                px-4 py-2.5 rounded-full hover:-translate-y-0.5 hover:border-teal transition-all duration-300"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >{skill}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
