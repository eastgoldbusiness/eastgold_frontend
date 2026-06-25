import { useState } from 'react'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/east-gold-logo.webp'

interface LogoProps {
  className?: string
  imgClassName?: string
  wordmarkClassName?: string
  showWordmark?: boolean
  tone?: 'dark' | 'light'
}

/**
 * Primary brand identity — the EastGold medallion paired with the wordmark.
 * Falls back to an "EG" mark if the logo asset fails to load.
 */
export function Logo({
  className,
  imgClassName,
  wordmarkClassName,
  showWordmark = true,
  tone = 'dark',
}: LogoProps) {
  const [failed, setFailed] = useState(false)

  return (
    <a
      href="#home"
      aria-label="EastGold — home"
      className={cn('group flex items-center gap-3', className)}
    >
      {failed ? (
        <span className="bg-gold-gradient text-ink flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-base font-bold">
          EG
        </span>
      ) : (
        <img
          src={LOGO_SRC}
          alt="EastGold"
          width={56}
          height={56}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            'h-12 w-12 shrink-0 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105',
            imgClassName,
          )}
        />
      )}
      {showWordmark && (
        <span
          className={cn(
            'font-serif text-2xl font-semibold tracking-[0.1em]',
            tone === 'light' ? 'text-white' : 'text-ink',
            wordmarkClassName,
          )}
        >
          East<span className="text-gradient-gold">Gold</span>
        </span>
      )}
    </a>
  )
}
