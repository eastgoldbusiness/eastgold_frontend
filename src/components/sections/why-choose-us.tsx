import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/tilt-card'
import { fadeInUp, slideInLeft, staggerFast, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

/* Palette from the reference design */
const GOLD = {
  50: '#FFFDF5',
  100: '#FFF9E6',
  200: '#FEF3C7',
  300: '#FDE68A',
  400: '#FACC15',
  600: '#D69E2E',
  700: '#A16207',
}

function Star({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M14 5l7 7m0 0l-7 7m7-7H3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

/* ── Compact feature card ──────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  wide = false,
}: {
  icon: ReactNode
  title: string
  description: string
  wide?: boolean
}) {
  return (
    <motion.div variants={fadeInUp} className={wide ? 'lg:col-span-2' : ''}>
      <TiltCard intensity={6} className="h-full rounded-2xl">
      <div
        className={`group relative h-full overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#FDE68A] hover:bg-white hover:shadow-gold-glow ${
          wide ? 'flex items-center gap-5' : ''
        }`}
        style={{ boxShadow: '0 10px 30px -12px rgba(214, 158, 46, 0.2)' }}
      >
        {!wide && (
          <div
            className="absolute top-3.5 right-3.5 opacity-40 transition-all duration-500 group-hover:rotate-[72deg] group-hover:opacity-70"
            style={{ color: GOLD[400] }}
          >
            <Star className="h-4 w-4" />
          </div>
        )}
        <div
          className={`flex flex-shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110 ${
            wide ? 'h-12 w-12' : 'mb-3 h-11 w-11'
          }`}
          style={{ background: GOLD[100], color: GOLD[700] }}
        >
          {icon}
        </div>
        <div className={wide ? 'min-w-0' : ''}>
          <h3
            className="mb-1.5 text-base font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {title}
          </h3>
          <p className="mb-2.5 text-[13px] leading-snug text-gray-500">{description}</p>
          <a
            className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
            style={{ color: GOLD[600] }}
            href="#services"
          >
            Learn More <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  )
}

function Stat({
  icon,
  value,
  label,
  divider = false,
}: {
  icon: ReactNode
  value: string
  label: string
  divider?: boolean
}) {
  return (
    <div
      className={`text-center md:text-left ${divider ? 'px-3' : ''}`}
      style={divider ? { borderLeft: '1px solid rgba(254,243,199,0.5)' } : undefined}
    >
      <div
        className="mb-1.5 flex justify-center md:justify-start"
        style={{ color: GOLD[600] }}
      >
        {icon}
      </div>
      <div className="text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
        {value}
      </div>
      <div className="text-xs font-medium text-gray-500">{label}</div>
    </div>
  )
}

export function WhyChooseUs() {
  const { t } = useLanguage()
  return (
    <section
      id="why"
      className="relative overflow-hidden lg:flex lg:min-h-screen lg:items-center"
    >
      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Premium gold bars and jewelry background"
          className="h-full w-full object-cover object-center opacity-90"
          src="/images/why-choose-bg.webp"
        />
        {/* Gradient overlay to improve text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,253,245,1) 0%, rgba(255,253,245,0.8) 40%, rgba(255,253,245,0) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-10 lg:py-10">
        {/* ── Content Left ─────────────────────────────────────────────── */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="mb-4 flex items-center gap-4">
            <span
              className="eyebrow-label text-xs font-bold tracking-widest uppercase"
              style={{ color: GOLD[600] }}
            >
              {t.why.eyebrow}
            </span>
            <div className="h-px w-12" style={{ background: GOLD[400] }} />
          </div>

          <h1
            className="display-why mb-5 text-4xl font-medium lg:text-[2.85rem]"
            style={{
              fontFamily: 'Georgia, serif',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
            }}
          >
            {t.why.titleLine1}
            <br />
            <span className="relative">
              {t.why.titleLine2}
              <Star
                className="absolute -top-5 -right-7 h-8 w-8 opacity-60"
                style={{ color: GOLD[400] }}
              />
            </span>
            <br />
            {t.why.titleLine3}
          </h1>

          <p className="mb-6 max-w-md text-base leading-relaxed text-gray-600">
            {t.why.subtitle}
          </p>

          <div className="mb-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-base font-bold shadow-lg transition-all hover:shadow-xl"
              style={{
                background: `linear-gradient(to right, ${GOLD[400]}, ${GOLD[600]})`,
                color: '#1A1A1A',
              }}
            >
              {t.why.cta}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(254,243,199,0.5)' }}
          >
            <Stat
              value={t.why.stats[0].value}
              label={t.why.stats[0].label}
              icon={
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              }
            />
            <Stat
              divider
              value={t.why.stats[1].value}
              label={t.why.stats[1].label}
              icon={
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  />
                </svg>
              }
            />
          </div>
        </motion.div>

        {/* ── Feature cards — 2×2 grid + wide card, 12px gaps ──────────── */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <FeatureCard
            title={t.why.features[0].title}
            description={t.why.features[0].description}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
          <FeatureCard
            title={t.why.features[1].title}
            description={t.why.features[1].description}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
          <FeatureCard
            title={t.why.features[2].title}
            description={t.why.features[2].description}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
          <FeatureCard
            title={t.why.features[3].title}
            description={t.why.features[3].description}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
          <FeatureCard
            wide
            title={t.why.features[4].title}
            description={t.why.features[4].description}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-64 w-full"
        style={{
          background: `linear-gradient(to top, ${GOLD[100]}80, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-10 -left-10 z-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: GOLD[300] }}
      />
    </section>
  )
}
