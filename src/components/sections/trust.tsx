import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { SECURITY_BADGES, STATS } from '@/data/site'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

export function Trust() {
  const { t } = useLanguage()
  return (
    <section id="trust" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.trust.eyebrow}
          title={t.trust.title}
          description={t.trust.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="border-gold/20 bg-cream/60 rounded-3xl border p-8 text-center"
            >
              <p className="text-gradient-gold font-serif text-5xl font-semibold">
                {t.trust.stats[i]?.value ?? stat.value}
              </p>
              <p className="text-ash mt-3 text-sm font-medium">
                {t.trust.stats[i]?.label ?? stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border-gold/20 bg-ink mt-10 rounded-3xl border p-8 sm:p-10"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <p className="font-serif text-2xl font-semibold text-white">{t.trust.bisTitle}</p>
              <p className="mt-2 max-w-md text-sm text-white/60">{t.trust.bisDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {SECURITY_BADGES.map((badge, i) => (
                <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
                  <span className="border-gold/30 text-gold flex h-14 w-14 items-center justify-center rounded-full border bg-white/5">
                    <badge.icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-medium text-white/70">
                    {t.trust.badges[i] ?? badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
