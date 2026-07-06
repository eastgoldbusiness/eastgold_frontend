import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/i18n/language-context'
import { easeLux } from '@/lib/animations'

/* Palette from the navbar reference design */
const GOLD = { 500: '#EAB308', 600: '#D69E2E' } as const

/**
 * Fixed "Get Free Valuation" CTA pinned to the bottom-centre of the page.
 * Stays statically in place while the user scrolls, keeping the primary
 * conversion action always within reach. Mirrors the navbar CTA styling.
 */
export function FloatingValuation() {
  const { t } = useLanguage()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
      <motion.a
        href="#contact"
        aria-label={t.nav.getValuation}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeLux, delay: 2.6 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg ring-1 ring-white/30 transition-shadow hover:shadow-xl"
        style={{
          background: `linear-gradient(to right, ${GOLD[500]}, ${GOLD[600]})`,
          color: '#1A1A1A',
        }}
      >
        <Sparkles className="h-4 w-4" />
        {t.nav.getValuation}
      </motion.a>
    </div>
  )
}

export default FloatingValuation
