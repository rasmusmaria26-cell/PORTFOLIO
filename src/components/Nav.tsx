import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCursor } from '@/context/CursorContext'

const navLinks = [
  { label: 'WORK', href: '#works' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WINS', href: '#achievements' },
  { label: 'CONTACT', href: '#footer' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { setVariant } = useCursor()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(6,6,8,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: scrolled ? '14px 0' : '20px 0',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="font-clash font-bold text-[18px] text-teal"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
            aria-label="Scroll to top"
          >
            MR
          </a>

          {/* Desktop center links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="font-mono text-[12px] tracking-[0.15em] text-muted hover:text-teal transition-colors duration-300"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop HIRE ME pill */}
          <a
            href="#footer"
            onClick={(e) => { e.preventDefault(); scrollTo('#footer') }}
            className="hidden md:inline-flex font-mono text-[12px] tracking-wider text-teal border border-teal
              px-5 py-2 rounded-full hover:bg-teal hover:text-[var(--bg)] transition-all duration-300"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
          >
            HIRE ME
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-teal p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: 'var(--bg)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-teal p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={28} />
            </button>

            {/* Links with staggered reveal */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="font-clash font-bold text-[48px] text-smoke hover:text-teal transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
