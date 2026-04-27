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
    offset: ['start 90%', 'start 30%'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: '1400px', perspectiveOrigin: 'center top' }}
    >
      {titleComponent && <div className="mb-8">{titleComponent}</div>}
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          translateY,
          transformOrigin: 'center top',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
