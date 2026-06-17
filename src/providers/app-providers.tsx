import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { SmoothScroll } from '@/providers/smooth-scroll'
import { LanguageProvider } from '@/i18n/language-context'

/**
 * Wraps the app with global providers (data fetching, smooth scrolling, etc.).
 * Add ThemeProvider, AuthProvider, and others here as the app grows.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
