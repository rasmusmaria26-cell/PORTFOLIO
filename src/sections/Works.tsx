import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { useCursor } from '@/context/CursorContext'

interface Project {
  id: string; badge: string; title: string; description: string
  tags: string[]; image: string; accent: string; link: string; linkLabel: string
}

const projects: Project[] = [
  {
    id: '01', badge: 'CLIENT · WEB', title: 'Zeyanne Marine Pvt. Ltd.',
    description: 'Corporate web presence for a marine spare parts shipping company. Blueprint canvas hero, pinned scroll reveal, hero video background, WhatsApp integration.',
    tags: ['React', 'GSAP', 'Tailwind', 'Canvas API'], image: '/screenshots/zeyanne.jpg',
    accent: '#4DFFD2', link: '#', linkLabel: 'Live Site ↗',
  },
  {
    id: '02', badge: 'DEMO · RESTAURANT', title: 'Saffron & Sea',
    description: 'Fine dining concept site. Cinematic particle field hero, luxury serif typography, coastal restaurant brand identity.',
    tags: ['HTML', 'CSS', 'GSAP', 'Canvas Particles'], image: '/screenshots/saffron.jpg',
    accent: '#FF4DFF', link: '#', linkLabel: 'View Demo ↗',
  },
  {
    id: '03', badge: 'HACKATHON · ANDROID · 1ST PLACE', title: 'OffGrid — Mesh Messenger',
    description: 'Encrypted offline mesh communication. Bluetooth LE discovery, Wi-Fi Aware delivery, RSA-2048 + AES-256 encryption. Won ACIC-KIF Hackathon 2026. Zero internet. Zero servers.',
    tags: ['Kotlin', 'Jetpack Compose', 'Bluetooth LE', 'Wi-Fi Aware', 'Cryptography'], image: '/screenshots/offgrid.jpg',
    accent: '#4DFFD2', link: '#', linkLabel: 'GitHub ↗',
  },
  {
    id: '04', badge: 'AI · WEB APP', title: 'IronFace — AI Attendance',
    description: 'Face recognition gym kiosk. SSD MobileNetV1 + 128-D descriptor matching, fully on-device via WASM. Real-time admin dashboard with CSV export. No cloud.',
    tags: ['Node.js', 'TensorFlow.js', 'face-api.js', 'WASM', 'Vanilla JS'], image: '/screenshots/ironface.jpg',
    accent: '#FF4DFF', link: '#', linkLabel: 'GitHub ↗',
  },
  {
    id: '05', badge: 'PRODUCT · ANDROID', title: 'Servify — Service Aggregator',
    description: 'Two-role Android app to compare verified repair vendors by price and rating. Four-step booking flow, real-time status tracking, KYC vendor verification.',
    tags: ['Kotlin', 'Jetpack Compose', 'Supabase', 'Hilt', 'MVVM'], image: '/screenshots/servify.jpg',
    accent: '#4DFFD2', link: '#', linkLabel: 'GitHub ↗',
  },
]

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [ref, threshold])
  return v
}

function ProjectCard({ project }: { project: Project }) {
  const { setVariant } = useCursor()
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
        onMouseEnter={() => setVariant('view')}
        onMouseLeave={() => setVariant('default')}
        aria-label={`View project: ${project.title}`}
      >
        <div className="relative bg-surface border border-line rounded overflow-hidden
          md:hover:-translate-y-1 transition-transform duration-400"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
        >
          {/* Image */}
          <div className="relative h-[200px] md:h-[300px] overflow-hidden bg-surface-2">
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
              width={800} height={400}
              className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.accent}10, ${project.accent}05)` }}
            >
              <span className="font-clash font-bold text-[36px] md:text-[48px] uppercase opacity-10 text-smoke">
                {project.title.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 inline-block"
              style={{ color: project.accent }}>{project.badge}</span>
            <h3 className="font-syne font-bold text-[24px] md:text-[28px] text-smoke mb-3 leading-tight">{project.title}</h3>
            <p className="font-body text-[14px] md:text-[15px] text-smoke/60 mb-5 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map(tag => (
                <span key={tag} className="font-mono text-[10px] text-muted border border-line px-3 py-1 rounded">{tag}</span>
              ))}
            </div>
            <span className="font-mono text-[12px] tracking-wider" style={{ color: project.accent }}>{project.linkLabel}</span>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 md:group-hover:w-full transition-all duration-700"
            style={{ background: project.accent }} />
        </div>
      </a>
    </motion.div>
  )
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

export default function Works() {
  const ghostRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ghostRef, offset: ['start end', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  // Detect mobile for ContainerScroll toggle
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="works" className="py-20 md:py-[120px] px-6 md:px-12 relative" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1200px] mx-auto relative" ref={ghostRef}>
        {/* Ghost text — desktop only */}
        <motion.div className="absolute -top-20 left-0 pointer-events-none select-none z-0 hidden md:block"
          style={{ y: ghostY }} aria-hidden="true">
          <span className="font-clash font-extrabold text-[200px] leading-none ghost-text uppercase">WORK</span>
        </motion.div>

        <div className="relative z-10 mb-12 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.2em] text-teal mb-6">02 / WORKS</p>
          <WordsPullUp text="Selected Work" className="font-clash font-extrabold text-[40px] md:text-[72px] text-smoke leading-tight" />
        </div>

        <div className="relative z-10 flex flex-col gap-12 md:gap-24">
          {projects.map(project => (
            isMobile ? (
              <ProjectCard key={project.id} project={project} />
            ) : (
              <ContainerScroll key={project.id}>
                <ProjectCard project={project} />
              </ContainerScroll>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
