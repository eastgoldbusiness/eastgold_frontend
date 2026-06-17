import { motion } from 'framer-motion'
import { easeLux } from '@/lib/animations'
import { CONTACT } from '@/data/site'

export function Preloader() {
  return (
    <motion.div
      className="bg-cream fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: easeLux } }}
    >
      <motion.div
        className="flex flex-col items-center"
      >
        {/* Logo mark — fades in first */}
        <motion.img
          src="/east-gold-logo.png"
          alt="EastGold Logo"
          initial={{ opacity: 0, scale: 0.82, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeLux }}
          style={{ width: 88, height: 88, objectFit: 'contain', marginBottom: 18 }}
        />

        {/* Brand name — follows logo */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: easeLux }}
          className="text-ink font-serif text-5xl font-medium tracking-[0.32em] sm:text-6xl"
        >
          {CONTACT.brand}
        </motion.span>

        {/* Gold divider line */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.9, ease: easeLux }}
          className="bg-gold-gradient mt-5 h-px w-44 origin-center"
        />

        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="text-ash mt-5 text-[0.7rem] tracking-[0.4em] uppercase"
        >
          {CONTACT.tagline}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
