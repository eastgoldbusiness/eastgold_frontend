import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { TESTIMONIALS } from '@/data/site'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

function Avatar({ src, name }: { src: string; name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <span className="bg-gold/15 text-gold-dark ring-gold/30 relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold ring-2">
      {initials}
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </span>
  )
}

export function Testimonials() {
  const { t } = useLanguage()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {TESTIMONIALS.map((item, i) => {
            const tr = t.testimonials.items[i] ?? item
            return (
              <motion.figure
                key={item.name}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="shadow-luxury relative rounded-3xl border border-black/5 bg-white p-8"
              >
                <Quote className="text-gold/30 h-9 w-9" />
                <div className="text-gold mt-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="fill-gold h-4 w-4" />
                  ))}
                </div>
                <blockquote className="text-ink/85 mt-4 text-base leading-relaxed">
                  “{tr.review}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-black/5 pt-6">
                  <Avatar src={item.avatar} name={tr.name} />
                  <div>
                    <p className="text-ink font-semibold">{tr.name}</p>
                    <p className="text-ash text-sm">{tr.profession}</p>
                  </div>
                </figcaption>
              </motion.figure>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
