import { useEffect, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'
import { formatRupees, useGoldRate } from '@/hooks/use-gold-rate'

const WORD_INTERVAL = 3000
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Shared typography for the looping headline word — applied to both the
   visible animated span and the hidden sizers so they measure identically. */
const dynamicWordStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, #E7C65B 0%, #D4AF37 40%, #F2D675 70%, #C89B2D 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 600,
  fontSize: 'clamp(2.1rem, 6vw, 4.2rem)',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  display: 'block',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.06))',
}

const wordVariants = {
  enter: { opacity: 0, y: 14, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(2px)',
    transition: { duration: 0.35, ease: EASE },
  },
}

/* ── Ticker separator ──────────────────────────────────────────────────── */
const Sep = () => (
  <span
    aria-hidden
    style={{
      color: '#D4AF37',
      fontSize: 12,
      marginLeft: 28,
      marginRight: 28,
      lineHeight: 1,
      userSelect: 'none',
      flexShrink: 0,
    }}
  >
    ✦
  </span>
)

/* ── RioLabz-style slim scrolling ticker ───────────────────────────────── */
function TickerStrip() {
  const { t } = useLanguage()
  // single duplication → seamless loop (track animates exactly -50%)
  const items = [...t.hero.ticker, ...t.hero.ticker]

  return (
    <div
      className="h-12 sm:h-[70px]"
      style={{
        width: '100%',
        maxWidth: '100vw',
        background: '#FFFFFF',
        borderTop: '1px solid #ECECEC',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          flex-shrink: 0;
          white-space: nowrap;
          animation: hero-marquee 30s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="hero-ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
          >
            <span
              className="text-[15px] sm:text-[20px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: '#111111',
              }}
            >
              {item}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════ */

export function Hero() {
  const { t } = useLanguage()
  const { data: goldRate } = useGoldRate()
  // Falls back to a default so the card renders even if the API is offline.
  const oneGramRate = goldRate?.oneGramRate ?? 9500
  const DYNAMIC_WORDS = t.hero.dynamicWords
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((p) => (p + 1) % DYNAMIC_WORDS.length),
      WORD_INTERVAL,
    )
    return () => clearInterval(timer)
  }, [DYNAMIC_WORDS.length])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <section
      id="home"
      style={{
        position: 'relative',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#F5F5F3',
        overflow: 'hidden',
      }}
    >
      {/* ── Main split container ────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'stretch',
          position: 'relative',
        }}
        className="flex-col lg:flex-row"
      >
        {/* ── LEFT SIDE (45%) ─ Text content ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 2,
          }}
          className="w-full px-6 pt-28 pb-10 sm:px-10 sm:pt-32 sm:pb-12 lg:w-1/2 lg:pt-28 lg:pb-12 lg:pr-12 lg:pl-16 xl:w-[52%]"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* Gold eyebrow label */}
            <motion.span
              variants={fadeInUp}
              className="eyebrow-label"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: 18,
              }}
            >
              {t.hero.eyebrow}
            </motion.span>

            {/* Thin gold divider */}
            <motion.span
              variants={fadeInUp}
              style={{
                display: 'block',
                width: 48,
                height: 2,
                background: 'linear-gradient(90deg, #D4AF37, #F0D67A)',
                borderRadius: 2,
                marginBottom: 28,
              }}
            />

            {/* Main headline */}
            <motion.h1
              variants={fadeInUp}
              className="display-hero"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(2.1rem, 6vw, 4.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#111111',
                margin: 0,
              }}
            >
              {t.hero.headline}
            </motion.h1>

            {/* Dynamic word — invisible sizers reserve space for the largest
                phrase so the container never shifts and text never clips */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'grid',
                width: 'auto',
                maxWidth: '100%',
                minWidth: 0,
                alignItems: 'center',
                overflow: 'visible',
                marginTop: 4,
              }}
            >
              {DYNAMIC_WORDS.map((word) => (
                <span
                  key={word}
                  aria-hidden
                  className="ta-loose-tight display-hero"
                  style={{
                    ...dynamicWordStyle,
                    gridArea: '1 / 1',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  {word}
                </span>
              ))}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={wordIndex}
                  variants={wordVariants}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  className="ta-loose-tight display-hero"
                  style={{
                    ...dynamicWordStyle,
                    gridArea: '1 / 1',
                    alignSelf: 'center',
                  }}
                >
                  {DYNAMIC_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              style={{
                maxWidth: 540,
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                lineHeight: 1.8,
                color: '#5A5A5A',
                marginTop: 28,
                marginBottom: 0,
              }}
            >
              {t.hero.subheading}
            </motion.p>

            {/* Gold Rate Today — minimal premium card */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: 'fit-content',
                marginTop: 24,
                padding: '10px 14px',
                background: '#FFFFFF',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: 10,
                boxShadow: '0 3px 12px rgba(212, 175, 55, 0.07)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginBottom: 4,
                }}
              >
                Gold Rate Today
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#111111',
                  whiteSpace: 'nowrap',
                }}
              >
                1 Gram : ₹{formatRupees(oneGramRate)}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT SIDE (55%) ─ Image ───────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
          className="hidden lg:block lg:w-1/2 xl:w-[48%]"
        >
          {/* Soft white fade from left into image */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '35%',
              zIndex: 2,
              background:
                'linear-gradient(to right, rgba(245,245,243,1) 0%, rgba(245,245,243,0.95) 20%, rgba(245,245,243,0.75) 40%, rgba(245,245,243,0) 100%)',
              pointerEvents: 'none',
            }}
          />

          <img
            src="/images/hero-bg.webp"
            srcSet="/images/hero-bg-sm.webp 480w, /images/hero-bg-md.webp 800w, /images/hero-bg-lg.webp 1200w, /images/hero-bg.webp 1600w"
            sizes="(max-width: 1024px) 100vw, 50vw"
            width={550}
            height={600}
            fetchPriority="high"
            decoding="sync"
            alt="EastGold customer exchange"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              borderRadius: '24px 0 0 24px',
              filter: 'brightness(1.08) contrast(1.02) saturate(1.06)',
              display: 'block',
            }}
          />
        </div>

        {/* Mobile image — shown below text on small screens */}
        <div className="relative overflow-hidden lg:hidden" style={{ maxHeight: '50vh' }}>
          <img
            src="/images/hero-bg.webp"
            srcSet="/images/hero-bg-sm.webp 480w, /images/hero-bg-md.webp 800w, /images/hero-bg-lg.webp 1200w, /images/hero-bg.webp 1600w"
            sizes="(max-width: 1024px) 100vw, 50vw"
            width={400}
            height={250}
            fetchPriority="high"
            decoding="sync"
            alt="EastGold customer exchange"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              borderRadius: 16,
              filter: 'brightness(1.08) contrast(1.02) saturate(1.06)',
              display: 'block',
              margin: '0 24px',
              maxWidth: 'calc(100% - 48px)',
            }}
          />
        </div>
      </div>

      </section>

      {/* ── RioLabz-style scrolling ticker ──────────────────────────────── */}
      <TickerStrip />
    </div>
  )
}
