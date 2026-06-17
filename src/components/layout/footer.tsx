import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT, FOOTER_LINKS } from '@/data/site'
import { useLanguage } from '@/i18n/language-context'

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-gold-light text-sm text-white/60 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Zip the original hrefs with the translated labels.
  const quickLinks = FOOTER_LINKS.quickLinks.map((l, i) => ({
    href: l.href,
    label: t.footer.quickLinkItems[i] ?? l.label,
  }))
  const serviceLinks = FOOTER_LINKS.services.map((l, i) => ({
    href: l.href,
    label: t.footer.serviceItems[i] ?? l.label,
  }))
  const legalLinks = FOOTER_LINKS.legal.map((l, i) => ({
    href: l.href,
    label: t.footer.legalItems[i] ?? l.label,
  }))

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="/east-gold-logo.png"
                  alt={`${CONTACT.brand} logo`}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-gold font-serif text-2xl font-semibold tracking-[0.18em]">
                {CONTACT.brand}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{t.footer.about}</p>
            <div className="mt-6 space-y-3 text-sm text-white/60">
              <p className="flex items-start gap-3">
                <MapPin className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                {CONTACT.address}
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="hover:text-gold-light flex items-center gap-3"
              >
                <Phone className="text-gold h-4 w-4 shrink-0" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-gold-light flex items-center gap-3"
              >
                <Mail className="text-gold h-4 w-4 shrink-0" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <FooterColumn title={t.footer.quickLinks} links={quickLinks} />
          <FooterColumn title={t.footer.services} links={serviceLinks} />

          <div>
            <FooterColumn title={t.footer.legal} links={legalLinks} />
            <div className="mt-8">
              <h4 className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
                {t.footer.rateTitle}
              </h4>
              <p className="mt-4 text-sm text-white/55">{t.footer.rateDescription}</p>
              <form onSubmit={onSubscribe} className="mt-4">
                {subscribed ? (
                  <p className="text-gold-light text-sm">{t.footer.subscribed}</p>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 pl-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.footer.emailPlaceholder}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="bg-gold-gradient text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CONTACT.brand} Gold Exchange. {t.footer.rights}
          </p>
          <p>
            {CONTACT.branch} · {CONTACT.hours}
          </p>
        </div>
      </div>
    </footer>
  )
}
