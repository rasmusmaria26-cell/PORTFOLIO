import React from 'react'
import { motion } from 'framer-motion'

interface PrismaHeroProps {
  eyebrow: string
  name: string
  children?: React.ReactNode
}

export function PrismaHero({ eyebrow, name, children }: PrismaHeroProps) {
  const words = name.split(' ')

  return (
    <div className="relative z-10">
      {/* Eyebrow */}
      <motion.p
        className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-teal mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {eyebrow}
      </motion.p>

      {/* Name — clip mask wipe per word */}
      <h1
        className="font-clash font-extrabold tracking-[-0.04em] text-smoke leading-[0.95]"
        style={{ fontSize: 'clamp(42px, 11vw, 140px)' }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em] md:mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {children && (
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
