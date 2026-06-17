import { useEffect, type PropsWithChildren } from 'react'
import Lenis from 'lenis'

/**
 * Global buttery-smooth scrolling via Lenis.
 *
 * Lenis drives the real window scroll position, so native `scroll` events still
 * fire — components that read `window.scrollY` (e.g. the services ScrollStack)
 * keep working, but now receive eased, interpolated scroll input.
 *
 * Respects `prefers-reduced-motion` by skipping smoothing entirely.
 */
export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      // easeOutExpo — long, calm glide that matches the brand easing.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
