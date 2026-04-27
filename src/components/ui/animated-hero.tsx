import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedHeroProps {
  staticText: string
  words: string[]
  interval?: number
}

export function AnimatedHero({ staticText, words, interval = 2000 }: AnimatedHeroProps) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIdx(p => (p + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <div className="flex items-center gap-2 md:gap-3 font-body text-[20px] md:text-[24px] font-light text-smoke">
      <span>{staticText}</span>
      <div className="relative h-[30px] md:h-[36px] overflow-hidden" style={{ minWidth: '140px' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[idx]}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 12, mass: 0.8 }}
            className="absolute left-0 top-0 text-teal whitespace-nowrap"
          >
            {words[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
