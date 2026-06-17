import { motion } from 'framer-motion'
import { Award, CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

const COLORS = {
  bg: '#F9F6EE',
  gold: '#D4A017',
  text: '#1A1A1A',
  muted: '#5F6675',
}

const STATS = [
  { icon: Users, value: '10K+', label: 'Happy Customers' },
  { icon: ShieldCheck, value: '15+', label: 'Years of Experience' },
  { icon: Award, value: '100%', label: 'Transparency' },
  { icon: CheckCircle2, value: '100%', label: 'Customer Satisfaction' },
]

/* Subtle gold wave pattern for the bottom-left corner */
function GoldWaves() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 220"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 z-0 w-[60%] max-w-[600px]"
    >
      {[0, 16, 32, 48, 64].map((off) => (
        <path
          key={off}
          d={`M -40 ${170 + off * 0.3} C 120 ${110 + off}, 300 ${210 - off}, 640 ${150 + off}`}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="1"
          strokeOpacity={0.32 - off * 0.004}
        />
      ))}
    </svg>
  )
}

export function About() {
  const { t } = useLanguage()
  return (
    <section
      id="about"
      className="relative flex flex-col lg:min-h-screen lg:flex-row"
      style={{ background: COLORS.bg }}
    >
      {/* ── LEFT — content ───────────────────────────────────────────────── */}
      <div className="relative order-2 flex w-full items-center lg:order-1 lg:w-1/2">
        {/* Soft lighting glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(60% 50% at 30% 25%, rgba(212,160,23,0.10), transparent 70%)',
          }}
        />
        <GoldWaves />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative z-10 mx-auto w-full max-w-2xl px-8 py-16 sm:px-12 lg:px-16 lg:py-0"
        >
          {/* Top label */}
          <motion.div variants={fadeInUp} className="mb-7 flex items-center gap-4">
            <span
              className="eyebrow-label text-xs font-semibold uppercase"
              style={{ color: COLORS.gold, letterSpacing: '4px' }}
            >
              {t.about.eyebrow}
            </span>
            <span
              aria-hidden
              className="h-px w-12"
              style={{ background: `${COLORS.gold}99` }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="display-about"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: COLORS.text,
              margin: 0,
            }}
          >
            {t.about.titleLine1}
            <br />
            {t.about.titleLine2}
          </motion.h2>

          {/* Divider with diamond */}
          <motion.div
            variants={fadeInUp}
            className="my-8 flex items-center"
            style={{ maxWidth: 360 }}
          >
            <span className="h-px flex-1" style={{ background: `${COLORS.gold}66` }} />
            <span
              aria-hidden
              className="mx-3 inline-block h-2 w-2 rotate-45"
              style={{ background: COLORS.gold }}
            />
            <span className="h-px flex-1" style={{ background: `${COLORS.gold}66` }} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-[15px] leading-[1.9]"
            style={{ color: COLORS.muted, maxWidth: 550 }}
          >
            {t.about.description}
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-2 gap-y-8 sm:flex">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex min-w-0 flex-col items-center px-2 text-center sm:flex-1 sm:px-3 ${
                  i > 0 ? 'sm:border-l sm:border-[rgba(212,160,23,0.25)]' : ''
                }`}
              >
                <stat.icon
                  className="mb-3 h-7 w-7"
                  style={{ color: COLORS.gold }}
                  strokeWidth={1.8}
                />
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                    lineHeight: 1.1,
                    color: COLORS.text,
                  }}
                >
                  {t.about.stats[i]?.value ?? stat.value}
                </span>
                <span
                  className="mt-1 text-[11px] leading-snug font-medium break-words hyphens-none sm:text-xs"
                  style={{ color: COLORS.muted }}
                >
                  {t.about.stats[i]?.label ?? stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT — image ────────────────────────────────────────────────── */}
      <div className="order-1 w-full lg:order-2 lg:h-auto lg:w-1/2">
        <img
          src="/images/about-eastgold.png"
          alt="EastGold gold exchange office with precision weighing scale"
          className="h-64 w-full object-cover object-center sm:h-80 lg:h-full"
        />
      </div>
    </section>
  )
}
