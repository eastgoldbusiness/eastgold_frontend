import { QueryClient } from '@tanstack/react-query'

/**
 * Global TanStack Query client.
 * Adjust defaults here to control caching and retry behavior app-wide.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})
