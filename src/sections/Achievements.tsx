import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'

interface Achievement {
  place: string; title: string; description: string; accent: string
}

const achievements: Achievement[] = [
  {
    place: '1ST PLACE', title: 'ACIC-KIF Hackathon 2026',
    description: 'Shipped OffGrid in 48 hours. Encrypted offline mesh communication. Real hardware, real encryption, zero internet.',
    accent: '#4DFFD2',
  },
  {
    place: '1ST PLACE', title: 'IBM CTF Competition',
    description: 'Solved real-time cybersecurity challenges in cryptography and networking at Kalasalingam University.',
    accent: '#4DFFD2',
  },
  {
    place: '2ND PLACE', title: 'Game Dev Competition',
    description: 'Interactive game prototype recognised for creativity and design at Euphoria 2023, Kalasalingam University.',
    accent: '#FF4DFF',
  },
]

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [ref, threshold])
  return v
}

function WordsPullUp({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const vis = useIntersection(ref)
  return (
    <h2 ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span className="inline-block" initial={{ y: '100%' }}
            animate={vis ? { y: '0%' } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >{w}</motion.span>
        </span>
      ))}
    </h2>
  )
}

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)
  const { setVariant } = useCursor()

  return (
    <section id="achievements" className="py-20 md:py-[120px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.2em] text-teal mb-6">03 / WINS</p>
        <WordsPullUp text="Victories" className="font-syne font-bold text-[36px] md:text-[56px] text-smoke mb-12 md:mb-16 leading-tight" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              animate={vis ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--bg)] border border-line rounded p-6 md:p-8
                md:hover:-translate-y-1.5 transition-all duration-400"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] font-medium mb-2" style={{ color: item.accent }}>{item.place}</p>
              <h3 className="font-syne font-bold text-[18px] md:text-[20px] text-smoke mb-2 leading-tight">{item.title}</h3>
              <p className="font-body text-[13px] md:text-[14px] text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div className="text-center space-y-2">
          <p className="font-mono text-[11px] md:text-[12px] text-muted">
            B.Tech CS · KARE · 2022–Present · CGPA 7.65
          </p>
          <p className="font-mono text-[10px] md:text-[11px] text-muted">
            Cisco Ethical Hacker · Cisco Networking Academy · Oct 2024
          </p>
        </div>
      </div>
    </section>
  )
}
