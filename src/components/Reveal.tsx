import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? 0 : 28
  const x = direction === 'left' ? -offset : direction === 'right' ? offset : 0

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? offset : 0, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
