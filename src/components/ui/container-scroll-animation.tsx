import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

interface ContainerScrollProps {
  children: React.ReactNode
  titleComponent?: React.ReactNode
}

export function ContainerScroll({ children, titleComponent }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.05, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.3], [60, 0])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: '1200px' }}
    >
      {titleComponent && <div className="mb-8">{titleComponent}</div>}
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          translateY,
          transformOrigin: 'center top',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
