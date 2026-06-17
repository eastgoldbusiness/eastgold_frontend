import { apiClient } from '@/lib/axios'

/** A single gold-rate record, mirroring the backend `GoldRate` model. */
export interface GoldRate {
  id: number
  oneGramRate: number
  updatedAt: string
}

export interface GoldRateInput {
  oneGramRate: number
}

/** Public — read the current gold rate. */
export async function fetchGoldRate(): Promise<GoldRate> {
  const { data } = await apiClient.get<GoldRate>('/gold-rate')
  return data
}

/** Admin-only — update the gold rate (requires a valid Bearer token). */
export async function updateGoldRate(input: GoldRateInput): Promise<GoldRate> {
  const { data } = await apiClient.put<GoldRate>('/gold-rate', input)
  return data
}

/** Authenticate the admin and receive a session token. */
export async function adminLogin(credentials: {
  username: string
  password: string
}): Promise<{ token: string }> {
  const { data } = await apiClient.post<{ token: string }>('/admin/login', credentials)
  return data
}
