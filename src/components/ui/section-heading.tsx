import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <motion.span
        variants={fadeInUp}
        className="eyebrow-label text-gold-dark inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase"
      >
        <span className="bg-gold h-px w-8" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeInUp}
        className="text-ink font-serif text-4xl leading-tight font-medium sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeInUp} className="text-ash text-base leading-relaxed">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
