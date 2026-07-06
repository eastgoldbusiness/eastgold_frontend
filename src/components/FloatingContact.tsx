import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/data/site'
import { easeLux } from '@/lib/animations'

/** Brand WhatsApp glyph — lucide ships no official brand mark. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  )
}

interface FabConfig {
  key: string
  href: string
  external?: boolean
  ariaLabel: string
  icon: ReactNode
  primaryText: string
  secondaryText: string
  /** Tailwind classes for the icon tile background + foreground. */
  tile: string
  /** Tailwind classes for the expanding text panel. */
  panel: string
}

const fabs: FabConfig[] = [
  {
    key: 'call',
    href: `tel:${CONTACT.phoneRaw}`,
    ariaLabel: `Call ${CONTACT.brand} at ${CONTACT.phoneDisplay}`,
    icon: <Phone className="h-6 w-6" strokeWidth={2.2} />,
    primaryText: 'Call Now',
    secondaryText: CONTACT.phoneDisplay,
    tile: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
    panel: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
  },
  {
    key: 'whatsapp',
    href: `https://wa.me/${CONTACT.whatsappRaw}`,
    external: true,
    ariaLabel: `Chat with ${CONTACT.brand} on WhatsApp`,
    icon: <WhatsAppIcon className="h-6 w-6" />,
    primaryText: 'WhatsApp',
    secondaryText: 'Chat with us',
    tile: 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white',
    panel: 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white',
  },
]

/**
 * Premium floating contact widget — fixed to the right edge, vertically
 * centred, always visible. Each button reveals a label panel on hover with a
 * smooth right-to-left expansion, matching the EastGold luxury theme.
 */
export function FloatingContact() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: easeLux, delay: 2.6 }}
      className="fixed top-1/2 right-0 z-[60] flex -translate-y-1/2 flex-col items-end gap-3"
      aria-label="Quick contact"
    >
      {fabs.map((fab) => (
        <motion.a
          key={fab.key}
          href={fab.href}
          {...(fab.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          aria-label={fab.ariaLabel}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: easeLux }}
          className="group flex origin-right items-stretch overflow-hidden rounded-l-2xl shadow-[0_12px_30px_-6px_rgba(17,17,17,0.45)] ring-1 ring-white/20 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {/* Expanding label — collapses to zero width, grows leftward on hover */}
          <span
            className={cn(
              'flex max-w-0 items-center overflow-hidden transition-[max-width] duration-300 ease-out group-hover:max-w-[220px] group-focus-visible:max-w-[220px]',
              fab.panel,
            )}
          >
            <span className="flex flex-col justify-center gap-0.5 py-2 pr-4 pl-5 text-right whitespace-nowrap">
              <span className="font-sans text-sm leading-tight font-semibold">
                {fab.primaryText}
              </span>
              <span className="font-sans text-xs leading-tight opacity-80">
                {fab.secondaryText}
              </span>
            </span>
          </span>

          {/* Icon tile — fixed size, always visible, anchored to screen edge */}
          <span
            className={cn(
              'flex h-[74px] w-[64px] shrink-0 items-center justify-center',
              fab.tile,
            )}
          >
            <span className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110">
              {fab.icon}
            </span>
          </span>
        </motion.a>
      ))}
    </motion.aside>
  )
}

export default FloatingContact
