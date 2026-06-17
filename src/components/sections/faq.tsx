import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FAQS } from '@/data/site'
import { easeLux, fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

export function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          description={t.faq.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 space-y-4"
        >
          {FAQS.map((faq, index) => {
            const isOpen = open === index
            const tr = t.faq.items[index] ?? faq
            return (
              <motion.div
                key={faq.question}
                variants={fadeInUp}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-gold/40 bg-cream/60' : 'bg-cream/30 border-black/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-ink font-serif text-lg font-semibold">{tr.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: easeLux }}
                    className="bg-gold/15 text-gold-dark flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeLux }}
                    >
                      <p className="text-ash px-6 pb-6 text-sm leading-relaxed">{tr.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
