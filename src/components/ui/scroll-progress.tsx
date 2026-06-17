import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Slim gold progress bar pinned to the top of the viewport that fills as the
 * user scrolls the page. Spring-smoothed so it glides rather than jumps.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gold-gradient fixed inset-x-0 top-0 z-[60] h-[3px] origin-left shadow-[0_1px_6px_rgba(212,175,55,0.5)]"
    />
  )
}
