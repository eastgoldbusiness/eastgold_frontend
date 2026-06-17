import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, viewportOnce } from '@/lib/animations'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Which entrance variant to play. Defaults to a soft fade-up. */
  variants?: Variants
  /** Stagger delay (seconds) for sequencing siblings. */
  delay?: number
  as?: 'div' | 'li' | 'span'
}

/**
 * Drop-in scroll-reveal wrapper. Plays once when the element scrolls into view,
 * riding on the global Lenis smooth scroll for a fluid feel.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
