import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Globe, Menu, Phone, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import { CONTACT, NAV_LINKS } from '@/data/site'
import { easeLux } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'

/* Palette from the reference design */
const GOLD = {
  50: '#FFFDF5',
  500: '#EAB308',
  600: '#D69E2E',
}

const SCROLL_THRESHOLD = 50

const PILL_SHADOW =
  '0 1px 2px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)'

function SunIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.884 6.68a1 1 0 10-1.415-1.414l-.707.707a1 1 0 101.414 1.415l.707-.708zm10.212 0l.708.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.415 1.414zm-9.408 5.405L4.512 13.5a1 1 0 101.414 1.414l1.176-1.177a1 1 0 00-1.414-1.414zm8.272 0a1 1 0 00-1.414 1.414l1.176 1.177a1 1 0 001.414-1.414l-1.176-1.177zM10 11a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  )
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-[#D69E2E]"
    >
      {label}
      {/* Gold underline — animates in on hover, stays for active */}
      <span
        className={cn(
          'absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300 ease-out group-hover:w-full',
          active ? 'w-full' : 'w-0',
        )}
        style={{ background: `linear-gradient(to right, ${GOLD[500]}, ${GOLD[600]})` }}
      />
    </a>
  )
}

/* Globe toggle that flips between English and Tamil. */
function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Tamil' : 'Switch to English'}
      title={lang === 'en' ? 'தமிழ்' : 'English'}
      className={cn(
        'flex items-center gap-1.5 rounded-full border bg-white/70 px-3 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#D69E2E] hover:text-[#D69E2E]',
        className,
      )}
      style={{ borderColor: 'rgba(254,243,199,0.8)' }}
    >
      <Globe className="h-4 w-4" />
      {lang === 'en' ? 'EN' : 'த'}
    </button>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(NAV_LINKS[0]?.href ?? '#home')
  const { t } = useLanguage()

  const navLabels: Record<string, string> = {
    '#home': t.nav.home,
    '#about': t.nav.about,
    '#services': t.nav.services,
    '#contact': t.nav.contact,
  }

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD)
  })

  // Track which section is in view to highlight the matching link.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', '')).filter(Boolean)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeLux }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <motion.nav
        initial={false}
        animate={{
          width: scrolled ? '90%' : '100%',
          marginTop: scrolled ? 16 : 0,
          borderRadius: scrolled ? 9999 : 0,
          height: scrolled ? 72 : 88,
          backgroundColor: scrolled ? '#FFFFFF' : 'rgba(255,255,255,0)',
          boxShadow: scrolled ? PILL_SHADOW : '0 0 0 rgba(0,0,0,0)',
          borderColor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.45, ease: easeLux }}
        className="flex max-w-[1600px] items-center justify-between border px-6 sm:px-8"
        style={{ willChange: 'width, height, border-radius' }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3.5">
          <motion.div
            initial={false}
            animate={{ scale: scrolled ? 0.95 : 1 }}
            transition={{ duration: 0.4, ease: easeLux }}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-white shadow-lg"
            style={{ background: GOLD[600] }}
          >
            <img
              alt={`${CONTACT.brand} Logo`}
              className="h-full w-full object-contain"
              src="/east-gold-logo.png"
            />
          </motion.div>
          <span
            className="text-[1.35rem] font-medium tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#111111' }}
          >
            EastGold
          </span>
        </a>

        {/* Centered navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={navLabels[link.href] ?? link.label}
              active={active === link.href}
            />
          ))}
        </div>

        {/* CTA + language + mobile toggle */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="hidden items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-md transition-shadow hover:shadow-lg sm:inline-flex"
            style={{
              background: `linear-gradient(to right, ${GOLD[500]}, ${GOLD[600]})`,
              color: '#1A1A1A',
            }}
          >
            <SunIcon />
            {t.nav.getValuation}
          </motion.a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border bg-white/70 md:hidden"
            style={{ borderColor: 'rgba(254,243,199,0.8)', color: '#1A1A1A' }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeLux }}
            className="border-gold/30 shadow-luxury absolute top-[108px] left-1/2 w-[92%] -translate-x-1/2 overflow-hidden rounded-3xl border bg-white p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-[#FFF9E6] hover:text-[#D69E2E]"
                  >
                    {navLabels[link.href] ?? link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                <Phone className="h-4 w-4" /> {t.nav.call}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: 'sm' }))}
              >
                {t.nav.freeValuation}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
