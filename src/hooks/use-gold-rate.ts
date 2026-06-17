import { useQuery } from '@tanstack/react-query'
import { fetchGoldRate } from '@/lib/api/gold-rate'

export const GOLD_RATE_QUERY_KEY = ['gold-rate'] as const

/**
 * Reads the live gold rate from the admin-managed backend.
 * Components should fall back to a sensible default while loading or if the
 * API is unavailable, so the UI never breaks when the backend is offline.
 */
export function useGoldRate() {
  return useQuery({
    queryKey: GOLD_RATE_QUERY_KEY,
    queryFn: fetchGoldRate,
  })
}

/** Formats a rupee amount with Indian digit grouping, e.g. 9500 → "9,500". */
export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount)
}
