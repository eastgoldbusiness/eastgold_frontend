import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

// ─── Service Data ──────────────────────────────────────────────────────────────
interface ServiceCard {
  number: string
  title: string
  description: string
  image: string
  bg: string
  textDark: boolean
  btnBorder: string
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    number: '01',
    title: 'Sell Old Gold',
    description: 'Convert your old jewellery into instant cash with transparent valuation and the best market rates.',
    image: '/images/services/sell-old-gold.png',
    bg: '#E3C04D',
    textDark: true,
    btnBorder: 'rgba(26, 26, 26, 0.2)',
  },
  {
    number: '02',
    title: 'Gold Exchange',
    description: 'Exchange old gold for maximum value through our trusted and transparent process.',
    image: '/images/services/gold-exchange.png',
    bg: '#D9D5CC',
    textDark: true,
    btnBorder: 'rgba(26, 26, 26, 0.2)',
  },
  {
    number: '03',
    title: 'Gold Valuation',
    description: 'Accurate XRF testing and expert valuation performed within minutes.',
    image: '/images/services/gold-valuation.png',
    bg: '#E9C856',
    textDark: true,
    btnBorder: 'rgba(26, 26, 26, 0.2)',
  },
  {
    number: '04',
    title: 'Release Pledged Gold',
    description: 'We help release pledged jewellery from banks and lenders quickly and securely.',
    image: '/images/services/release-pledged-gold.png',
    bg: '#D8D2C7',
    textDark: true,
    btnBorder: 'rgba(26, 26, 26, 0.2)',
  },
  {
    number: '05',
    title: 'Gold Loan Settlement',
    description: 'Settle outstanding gold loans smoothly with expert support and lender coordination.',
    image: '/images/services/gold-loan-settlement.png',
    bg: '#B3171D',
    textDark: false,
    btnBorder: 'rgba(255,255,255,0.3)',
  },
  {
    number: '06',
    title: 'Instant Cash Transfer',
    description: 'Receive immediate payment directly to your bank account after approval.',
    image: '/images/services/instant-cash-transfer.png',
    bg: '#C05A05',
    textDark: false,
    btnBorder: 'rgba(255,255,255,0.3)',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export function Services() {
  const { t } = useLanguage()
  // NOTE: the <section> must NOT use `overflow-hidden` — it would break the
  // cards' position:sticky stacking.
  return (
    <section id="services" className="relative bg-[#F9F6F0]">
      {/* Sizing + sticky-stack tokens */}
      <style>{`
        :root {
          --card-height: 340px;
          --stack-top: 13vh;   /* offset from viewport top (clears the fixed navbar) */
          --stack-peek: 74px;  /* peek strip — tall enough to reveal each card's title */
        }
        @media (max-width: 1024px) {
          :root {
            --card-height: 310px;
            --stack-peek: 66px;
          }
        }
        @media (max-width: 768px) {
          :root {
            --card-height: 430px;
            --stack-top: 9vh;
            --stack-peek: 58px;
          }
          /* Stack the content full-width above the image on small screens. */
          .service-content {
            width: 100% !important;
            padding: 22px 24px 168px !important;
          }
          .service-desc {
            font-size: 15px !important;
            line-height: 1.55 !important;
          }
          .service-cta-btn {
            padding: 14px 26px !important;
          }
        }
        @media (max-width: 420px) {
          :root {
            --card-height: 460px;
          }
        }

        /* Tamil text runs longer/taller — give the fixed-height cards more
           room so titles and descriptions don't clip or overlap the image. */
        :root:lang(ta) { --card-height: 400px; }
        @media (max-width: 1024px) { :root:lang(ta) { --card-height: 380px; } }
        @media (max-width: 768px)  { :root:lang(ta) { --card-height: 520px; } }
        @media (max-width: 420px)  { :root:lang(ta) { --card-height: 560px; } }
      `}</style>

      {/* ── Section Intro ────────────────────────────────────────────────── */}
      <div className="relative pt-24 pb-16 sm:pt-24 sm:pb-16 px-4">
        <motion.div
          className="mx-auto max-w-[800px] text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="inline-flex items-center gap-3 mb-6" variants={fadeInUp}>
            <span className="h-px w-10 bg-[#D4AF37]" />
            <span
              className="eyebrow-label text-[#D4AF37] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
            >
              {t.services.eyebrow}
            </span>
            <span className="h-px w-10 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#111111] tracking-tight leading-[1.08]"
            variants={fadeInUp}
          >
            {t.services.titleLine1}
            <br />
            <span className="italic font-light text-[#B8860B]">{t.services.titleLine2}</span>
          </motion.h2>
        </motion.div>
      </div>

      {/* ── Sticky-stack cards (CSS position:sticky — cards pin & stack on scroll) ── */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-16">
        {SERVICE_CARDS.map((card, i) => (
          <div
            key={card.number}
            style={{
              position: 'sticky',
              // Each card pins one `--stack-peek` lower than the one before it,
              // so the previous cards' top strips stay visible underneath.
              top: `calc(var(--stack-top) + ${i} * var(--stack-peek))`,
              zIndex: i + 1,
              // A little breathing room between cards while they're still in flow.
              marginBottom: i < SERVICE_CARDS.length - 1 ? '24px' : 0,
            }}
          >
            <ServicePanel card={card} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Service Panel ────────────────────────────────────────────────────────────
function ServicePanel({ card, index }: { card: ServiceCard; index: number }) {
  const { t } = useLanguage()
  const textColor = card.textDark ? '#1A1A1A' : '#FFFFFF'
  const title = t.services.cards[index]?.title ?? card.title
  const description = t.services.cards[index]?.description ?? card.description

  return (
    <div
      className="service-panel group relative overflow-hidden"
      style={{
        height: 'var(--card-height)',
        width: '100%',
        borderRadius: '24px',
        backgroundColor: card.bg,
        // Upward-biased shadow so each stacked card casts onto the peeking strip
        // of the card above it — the signature "stacking deck" look.
        boxShadow: '0 -14px 40px rgba(0,0,0,0.10), 0 10px 28px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          '0 -22px 56px rgba(0,0,0,0.16), 0 14px 36px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          '0 -14px 40px rgba(0,0,0,0.10), 0 10px 28px rgba(0,0,0,0.05)'
      }}
    >
      {/* ── Top accent bar (wipes in on hover) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-20 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{
          background: 'linear-gradient(90deg, #F6CD54, #CBB5FF)',
          borderRadius: '24px 24px 0 0',
        }}
        aria-hidden="true"
      />

      {/* ── Subtle texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* ── LEFT: Content ─────────────────────────────────────── */}
      <div
        className="service-content absolute inset-y-0 left-0 flex flex-col justify-start z-10"
        style={{
          width: '65%',
          // Tighter top padding so the title lands inside the peeking strip and
          // stays readable when the card is stacked.
          padding: 'clamp(18px, 2vw, 28px) clamp(40px, 4vw, 64px) clamp(32px, 3vw, 56px)',
        }}
      >
        {/* Title — sits in the peek strip, so it shows even when stacked */}
        <h3
          className="font-serif m-0"
          style={{
            fontSize: 'clamp(30px, 3vw, 44px)',
            fontWeight: 500,
            lineHeight: 1.1,
            color: textColor,
          }}
        >
          {title}
        </h3>

        {/* Description + CTA — grouped just below the title */}
        <div className="flex flex-col gap-6" style={{ marginTop: 'clamp(20px, 3vh, 36px)' }}>
          {/* Description */}
          <p
            className="service-desc"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 22px)',
              fontWeight: 400,
              lineHeight: 1.7,
              color: textColor,
              maxWidth: '550px',
              fontFamily: 'var(--font-sans, sans-serif)',
              margin: 0,
            }}
          >
            {description}
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="#contact"
              className="service-cta-btn inline-flex items-center gap-3 font-semibold uppercase transition-all duration-300 no-underline"
              style={{
                padding: '18px 36px',
                borderRadius: '999px',
                background: 'transparent',
                border: `1px solid ${card.btnBorder}`,
                color: textColor,
                fontSize: '13px',
                letterSpacing: '2px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.background = card.textDark ? '#1A1A1A' : '#FFFFFF'
                btn.style.color = card.textDark ? '#FFFFFF' : '#1A1A1A'
                btn.style.borderColor = card.textDark ? '#1A1A1A' : '#FFFFFF'
                const arrow = btn.querySelector('.cta-arrow') as HTMLElement
                if (arrow) arrow.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.background = 'transparent'
                btn.style.color = textColor
                btn.style.borderColor = card.btnBorder
                const arrow = btn.querySelector('.cta-arrow') as HTMLElement
                if (arrow) arrow.style.transform = 'translateX(0)'
              }}
            >
              {t.services.learnMore}
              <ArrowRight
                className="cta-arrow h-4 w-4"
                style={{ transition: 'transform 0.3s ease' }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Floating Image ─────────────────────────────── */}
      <div
        className="service-img-wrap absolute hidden lg:block overflow-hidden"
        style={{
          top: '40px',
          right: '40px',
          width: '420px',
          height: '280px',
          borderRadius: '20px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)',
          background: '#fff',
          transform: 'translateZ(0)',
        }}
      >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ── Mobile image (below content on small screens) ──────── */}
      <div
        className="lg:hidden absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{
          height: '140px',
          borderRadius: '16px',
          margin: '0 24px 24px',
        }}
      >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
