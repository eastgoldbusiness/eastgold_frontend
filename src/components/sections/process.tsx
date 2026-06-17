import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { PROCESS_STEPS } from '@/data/site'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

export function Process() {
  const { t } = useLanguage()
  return (
    <section id="process" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16"
        >
          {/* Gold connector line (desktop) — runs from the center of step 1's
              icon to the center of step 4's icon, then stops. Icons are
              centered in 4 equal columns, so each end icon's center sits half a
              column (W/2 = 12.5% − 0.375 × gap) in from its side; symmetric
              left/right insets keep the line perfectly centered. */}
          <div
            className="via-gold from-gold to-gold absolute top-9 hidden h-px bg-gradient-to-r lg:block"
            style={{
              left: 'calc(12.5% - 0.5625rem)',
              right: 'calc(12.5% - 0.5625rem)',
            }}
            aria-hidden
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-18 w-18 items-center justify-center">
                  <span className="bg-gold-gradient text-ink shadow-luxury flex h-16 w-16 items-center justify-center rounded-2xl">
                    <step.icon className="h-7 w-7" />
                  </span>
                  <span className="border-gold/40 text-gold-dark absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border bg-white text-xs font-semibold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-ink mt-6 font-serif text-xl font-semibold">
                  {t.process.steps[i]?.title ?? step.title}
                </h3>
                <p className="text-ash mt-2 max-w-xs text-sm leading-relaxed">
                  {t.process.steps[i]?.description ?? step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
